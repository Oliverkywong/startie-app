import { Knex } from "knex";
import { UserListData, UserListInput } from "../utils/api-types";
import { checkPassword, hashPassword } from "../utils/hash";
import { User } from "../utils/model";

export class UserDuplicateUsernameError extends Error {
  constructor(msg?: string) {
    super(msg);
    Object.setPrototypeOf(this, UserDuplicateUsernameError.prototype);
  }
}

export class UserDuplicateEmailError extends Error {
  constructor(msg?: string) {
    super(msg);
    Object.setPrototypeOf(this, UserDuplicateEmailError.prototype);
  }
}

export class UserMissingRegisterInfoError extends Error {
  constructor(msg?: string) {
    super(msg);
    Object.setPrototypeOf(this, UserMissingRegisterInfoError.prototype);
  }
}

export class UserNotExistError extends Error {
  constructor(msg?: string) {
    super(msg);
    Object.setPrototypeOf(this, UserNotExistError.prototype);
  }
}

export class UserPasswordMissMatchError extends Error {
  constructor(msg?: string) {
    super(msg); //super is used to call the parent class constructor
    Object.setPrototypeOf(this, UserPasswordMissMatchError.prototype);
  }
}

export class UserStatusError extends Error {
  constructor(msg?: string) {
    super(msg); //super is used to call the parent class constructor
    Object.setPrototypeOf(this, UserStatusError.prototype);
  }
}

export class UserService {
  constructor(private knex: Knex) {}

  //-----------
  //Apple Login
  //------------
  async socialLogin(email: string){
    const userEmailRecord = await this.knex<User>("user")
        .select("*")
        .where("email", email)
        .returning('id')
        if (userEmailRecord.length > 0) {
          return {result:true ,userId:userEmailRecord[0].id}
        }else {
          return {result:false, userId:null}
        }

  }

  // -------------------------------------------------------------------------------------------------------------------
  // Register ✅
  // -------------------------------------------------------------------------------------------------------------------
  async register(
    username: string,
    password: string,
    email: string,
    phonenumber?: string,
    description?: string
  ) {
    {
      const userEmailRecord = await this.knex<User>("user")
        .select("*")
        .where("email", email);

      const userRecord = await this.knex<User>("user")
        .select("*")
        .where("username", username);

      if (userRecord.length > 0) {
        throw new UserDuplicateUsernameError();
      }

      if (userEmailRecord.length > 0) {
        throw new UserDuplicateEmailError();
      }

      if (!username || !password || !email) {
        throw new UserMissingRegisterInfoError();
      }
    }

    // insert user
    await this.knex<User>("user").insert({
      username: username,
      password: await hashPassword(password),
      email: email,
      status_id: 1,
      profilepic: "tonystarkicon.png",
      phonenumber: "0000000000"
    });

    return true;
  }
  // -------------------------------------------------------------------------------------------------------------------
  // Login ✅
  // -------------------------------------------------------------------------------------------------------------------

  async login(username: string, password: string) {
    let result = this.knex<User>("user")
      .select("*")
      .where("username", username)
      .where("status_id", 1);

    const userRecord = await result;

    if (userRecord.length === 0) {
      throw new UserNotExistError();
    }

    if (
      !(
        username === userRecord[0].username &&
        (await checkPassword(password, userRecord[0].password))
      )
    ) {
      throw new UserPasswordMissMatchError();
    }
    if (userRecord[0].status_id != 1) {
      throw new UserStatusError();
    }
    return userRecord;
  }
  // -------------------------------------------------------------------------------------------------------------------
  // get self UserInfo by ID
  // -------------------------------------------------------------------------------------------------------------------
  async userInfo(userId: number) {
    const userRecord = await this.knex<User>("user")
      .select("*")
      .where("id", userId);

    return userRecord;
  }
  // -------------------------------------------------------------------------------------------------------------------
  // get all User Info (Admin & search)
  // -------------------------------------------------------------------------------------------------------------------
  async getAllUser(
    input: UserListInput,
    show?: boolean
  ): Promise<UserListData> {
    let query = this.knex<User>("user")
      .select(
        "user.id",
        "username",
        "email",
        "phonenumber",
        "isadmin",
        "s.name as status",
        this.knex.raw("ARRAY_AGG(distinct t.name) as tags"),
        "description",
        "shortDescription",
        "profilepic",
        "clickrate",
        "created_at"
      )
      .join("status as s", "status_id", "s.id")
      .leftJoin("user_tag", "user.id", "user_tag.user_id")
      .join("tag as t", "user_tag.tag_id", "t.id")
      .groupBy("user.id", "s.id");

    if (input.name) {
      query = query.having("username", "ilike", `%${input.name}%`);
    }
    if (input.q) {
      query = query.having("username", "ilike", `%${input.q}%`);
    }
    if (input.email) {
      query = query.having("email", "ilike", `%${input.email}%`);
    }
    if (input.status_id) {
      query = query.having("s.id", "=", `${input.status_id}`);
    }
    if (input.description) {
      query = query.having("description", "ilike", `%${input.description}%`);
    }
    if (input.shortDescription) {
      query = query.having(
        "shortDescription",
        "ilike",
        `%${input.shortDescription}%`
      );
    }
    if (input.phonenumber) {
      query = query.having("phonenumber", "ilike", `%${input.phonenumber}%`);
    }
    if (input.tags) {
      query = query.having(
        this.knex.raw(
          `array_agg(distinct t.name)::VARCHAR ilike '%${input.tags}%'`
        )
      );
    }
    if (show) {
      query = query.orderBy("id", "asc");
    } else {
      query = query.orderBy("id", "asc").where("status_id", 1);
    }
    let user = await query;

    return { user };
  }
  // -------------------------------------------------------------------------------------------------------------------
  // get all User List
  // -------------------------------------------------------------------------------------------------------------------
  async getAllUserList() {
    const userRecord = await this.knex<User>("user")
      .select(
        "user.id",
        "username",
        this.knex.raw("ARRAY_AGG(distinct t.name) as tags"),
        "shortDescription",
        "profilepic",
        "clickrate"
      )
      .join("status as s", "status_id", "s.id")
      .leftJoin("user_tag", "user.id", "user_tag.user_id")
      .join("tag as t", "user_tag.tag_id", "t.id")
      .groupBy("user.id", "s.id");
    return userRecord;
  }
  // -------------------------------------------------------------------------------------------------------------------
  // edit User Info (Admin)
  // -------------------------------------------------------------------------------------------------------------------
  async editUserForAdmin(userId: number, input: UserListInput) {
    const userRecord = await this.knex<User>("user")
      .update({
        profilepic: input.profilepic,
        isadmin: input.isadmin,
        phonenumber: input.phonenumber,
        description: input.description,
        status_id: input.status_id,
      })
      .where("id", userId)
      .returning("*");

    return userRecord;
  }
  // -------------------------------------------------------------------------------------------------------------------
  // edit User Info
  // -------------------------------------------------------------------------------------------------------------------
  async editUser(
    userId: number,
    profilepic: string,
    phonenumber: number | string,
    description: string
  ) {
    const userRecord = await this.knex<User>("user")
      .update({
        profilepic: profilepic,
        phonenumber: phonenumber,
        description: description,
      })
      .where("id", userId)
      .returning("*");

    return userRecord;
  }

  // -------------------------------------------------------------------------------------------------------------------
  // check team
  // -------------------------------------------------------------------------------------------------------------------
  async checkTeam(userId: number) {
    const userRecord = await this.knex<User>("user_team")
      .join("team", "user_id", "team.id")
      .select("*")
      .where("user_id", userId);

    return userRecord;
  }

  // -------------------------------------------------------------------------------------------------------------------
  // user join team
  // -------------------------------------------------------------------------------------------------------------------
  async joinTeam(teamId: number, userId: number) {
    return await this.knex("user_team")
      .insert({
        user_id: userId,
        team_id: teamId,
        isboard: false,
        iswaiting: false,
        isfollow: false,
        applytime: new Date(),
      })
      .returning("*");
  }

  // -------------------------------------------------------------------------------------------------------------------
  // quit team
  // -------------------------------------------------------------------------------------------------------------------
  async quitTeam(userId: number, teamId: number) {
    return await this.knex<User>("user_team")
      .where("user_id", userId)
      .andWhere("team_id", teamId)
      .del();
  }

  // -------------------------------------------------------------------------------------------------------------------
  // user join event
  // -------------------------------------------------------------------------------------------------------------------
  async joinEvent(userId: number, eventId: number) {
    return await this.knex("user_event")
      .insert({
        user_id: userId,
        event_id: eventId,
        isfollow: false,
      })
      .returning("*");
  }
  // -------------------------------------------------------------------------------------------------------------------
  //get notification
  // -------------------------------------------------------------------------------------------------------------------
  async getNotification(userId: number) {
    const notification = await this.knex("notification")
      .select("*")
      .where("user_id", userId);

    return notification;
  }
}
