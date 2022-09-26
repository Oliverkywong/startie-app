import { Knex } from "knex";
import { UserListData, UserListInput } from "../utils/api-types";
import { checkPassword, hashPassword } from "../utils/hash";
import { User, User_Tag, User_Team } from "../utils/model";

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
export class YourHaveJoinedThisTeamError extends Error {
  constructor(msg?: string) {
    super(msg);
    Object.setPrototypeOf(this, YourHaveJoinedThisTeamError.prototype);
  }
}
export class YourHaveJoinedThisEventError extends Error {
  constructor(msg?: string) {
    super(msg);
    Object.setPrototypeOf(this, YourHaveJoinedThisEventError.prototype);
  }
}

export class UserService {
  constructor(private knex: Knex) {}

// -------------------------------------------------------------------------------------------------------------------
// Apple login
// -------------------------------------------------------------------------------------------------------------------
  async socialLogin(email: string){
    const userEmailRecord = await this.knex<User>("user")
      .select("*")
      .where("email", email)
      .returning("id");
    if (userEmailRecord.length > 0) {
      return { result: true, userId: userEmailRecord[0].id };
    } else {
      return { result: false, userId: null };
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
    

    // insert user
    const user = await this.knex<User>("user")
      .insert({
        username: username,
        password: await hashPassword(password),
        email: email,
        status_id: 1,
        profilepic: "tonystarkicon.png",
        phonenumber: "0000000000",
        shortDescription: "Short Description",
        description: "Description",
      })
      .returning("*");

    await this.knex<User_Tag>("user_tag")
    .insert({
      user_id: user[0].id,
      tag_id: 1,
    })
    .returning("*");

    return { result: true, user: user };
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
        "user.id as id",
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
      .leftJoin("tag as t", "user_tag.tag_id", "t.id")
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
    if (input.isadmin) {
      query = query.having("isadmin", "=", `${input.isadmin}`);
    }

    let allUserCount = await query

    if (show && input._sort && input._order && input._start && input._end) {
      query = query
      .orderBy(`${input._sort}`, `${input._order}`)
      .limit(input._end - input._start)
      .offset(input._start);
    } else {
      query = query.orderBy("id", "asc").where("status_id", 1);
    }
    let user = await query;

    return { user: user, count: allUserCount.length };
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
        shortDescription: input.shortDescription,
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
    name: string,
    phonenumber: string,
    shortDescription: string,
    description: string,
    profilepic: string,
    goodat: number
  ) {
    const userRecord = await this.knex<User>("user")
      .update({
        username: name,
        phonenumber: phonenumber,
        profilepic: profilepic,
        shortDescription: shortDescription,
        description: description,
      })
      .where("id", userId)
      .returning("*");

    await this.knex<User_Tag>("user_tag")
      .insert({
        user_id: userRecord[0].id,
        tag_id: goodat,
      })
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
    const joinTeamRecord = await this.knex<User_Team>("user_team")
      .select("*")
      .where("user_id", userId)
      .andWhere("team_id", teamId);

    if (joinTeamRecord.length > 0) {
      throw new YourHaveJoinedThisTeamError();
    }

    return await this.knex<User_Team>("user_team")
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
    const joinEventRecord = await this.knex("user_event")
      .select("*")
      .where("user_id", userId)
      .andWhere("event_id", eventId);

    if (joinEventRecord.length > 0) {
      throw new YourHaveJoinedThisEventError();
    }

    return await this.knex("user_event")
      .insert({
        user_id: userId,
        event_id: eventId,
        isfollow: false,
      })
      .returning("*");
  }
  // -------------------------------------------------------------------------------------------------------------------
  // quit event
  // -------------------------------------------------------------------------------------------------------------------
  async quitEvent(userId: number, eventId: number) {
    return await this.knex("user_event")
      .where("user_id", userId)
      .andWhere("event_id", eventId)
      .del();
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
