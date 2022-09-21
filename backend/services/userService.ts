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

  // -------------------------------------------------------------------------------------------------------------------
  // Register ✅
  // -------------------------------------------------------------------------------------------------------------------
  async register(
    username: string,
    password: string,
    email: string,
    phonenumber?: number,
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
  // get all User Info
  // -------------------------------------------------------------------------------------------------------------------
  async getAllUser(input:UserListInput, show?: boolean): Promise<UserListData>  {

    let query = this.knex<User>("user").select("user.id", "username", "email", "phonenumber", "profilepic", "description", "clickrate", "created_at", "status_id as sid", "name as status").join("status", "status_id", "status.id");

    if (input.name) {
      query = query.where("username", "ilike", `%${input.name}%`);
    }
    if (input.q) {
      query = query.where("username", "ilike", `%${input.q}%`);
    }
    if (input.email) {
      query = query.where("email", "ilike", `%${input.email}%`);
    }
    if (input.status_id) {
      query = query.where("status.id", "=", `${input.status_id}`);
    }
    if (input.description) {
      query = query.where("description", "ilike", `%${input.description}%`);
    }
    if (input.phonenumber) {
      query = query.where("phonenumber", "ilike", `%${input.phonenumber}%`);
    }
    if (show) {
      query = query.orderBy('id', 'asc')
    } else {
      query = query.orderBy('id', 'asc').where('status_id', 1)
    }
    let user = await query;

    return {user};
  }
  // -------------------------------------------------------------------------------------------------------------------
  // edit User Info (Admin)
  // -------------------------------------------------------------------------------------------------------------------
  async editUserForAdmin(userId: number, input: UserListInput, newStatusId?: number) {
    
    const userRecord = await this.knex<User>("user")
      .update({
        profilepic: input.profilepic,
        phonenumber: input.phonenumber,
        description: input.description,
        status_id: newStatusId
      })
      .where("id", userId)
      .returning("*");

    return userRecord
  }
// -------------------------------------------------------------------------------------------------------------------
// edit User Info
// -------------------------------------------------------------------------------------------------------------------
  async editUser(userId: number, profilepic: string, phonenumber: number | string, description: string) {
    
    const userRecord = await this.knex<User>("user")
      .update({
        profilepic: profilepic,
        phonenumber: phonenumber,
        description: description,
      })
      .where("id", userId)
      .returning("*");

    return userRecord
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
