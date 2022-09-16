import { Knex } from "knex";
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
    statusId: number
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
      status_id: statusId,
    });

    return true;
  }

  // -------------------------------------------------------------------------------------------------------------------
  // Login Google
  // -------------------------------------------------------------------------------------------------------------------
  // async loginGoogle(accessToken: string) {
  // 	const fetchRes = await fetch(
  // 		'https://www.googleapis.com/oauth2/v2/userinfo',
  // 		{
  // 			method: 'get',
  // 			headers: {
  // 				Authorization: `Bearer ${accessToken}`
  // 			}
  // 		}
  // 	)

  // 	const result = await fetchRes.json()

  // 	// const users = (
  // 	// 	await this.knex.query(
  // 	// 		`SELECT * FROM users WHERE users.username = $1`,
  // 	// 		[result.email]
  // 	// 	)
  // 	// ).rows

  // 	let users = this.knex<User>('user')
  // 		.select('*')
  // 		.where('username', result.email)

  // 	users = await // `SELECT * FROM users WHERE users.username = $1`,
  // 	// [result.email]

  // 	this.knex<User>('user').select('*').where('username', result.email)[0]
  // 		.rows

  // 	let user = users[0]

  // 	let username = result.name || result.email

  // 	if (!user) {
  // 		return user
  // 	} else {
  // 		const userRecord = await this.knex<User>('user')

  // 			.insert({
  // 				username,
  // 				password: await hashPassword(result.email),
  // 				email: result.email,
  // 				role_id: 1,
  // 				status_id: 1
  // 			})
  // 			.returning('*')
  // 		// `INSERT INTO users (username,password,created_at,updated_at) VALUES ($1,$2,NOW(),NOW()) RETURNING *`,
  // 		// 			[username, await hashPassword(username)]
  // 		return userRecord
  // 	}
  // }
  // -------------------------------------------------------------------------------------------------------------------
  // Login ✅
  // -------------------------------------------------------------------------------------------------------------------

  async login(username: string, password: string) {
    let result = this.knex<User>("user")
      .select("*")
      .where("username", username);

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
  // get all UserInfo
  // -------------------------------------------------------------------------------------------------------------------
  async getAllUser(name?:string, email?:string, status?:string, phonenumber?:number) {
    
    // const userRecord = name !==undefined || email !==undefined || status !==undefined || phonenumber !==undefined? 
    // await this.knex.raw(`select *, name as status from "user" u inner join status on status.id = u.status_id WHERE name LIKE '%${name}%' AND email LIKE '%${email}%' AND phonenumber LIKE '%${phonenumber}%' AND status LIKE '%${status}%'`)
    // ("user")
    // .join("status", "status_id", "status.id")
    // .select("*")
    // .where("username", "ilike", `%${query}%`) 

    let query = this.knex<User>("user").select("*", "name as status").join("status", "status_id", "status.id");

    if (name) {
      query = query.where("username", "ilike", `%${name}%`);
    }
    if (email) {
      query = query.where("email", "ilike", `%${email}%`);
    }
    if (status) {
      query = query.where("name", "ilike", `%${status}%`);
    }
    if (phonenumber) {
      query = query.where("phonenumber", "ilike", `%${phonenumber}%`);
    }
    const userRecord = await query;

    return userRecord;
  }
  // -------------------------------------------------------------------------------------------------------------------
  // edit User Info
  // -------------------------------------------------------------------------------------------------------------------
  async editUser(
    userId: number,
    newProfilepic: string,
    newStatusId: number,
    newPhoneNumber: string,
    newDescription: string
  ) {
    const userRecord = await this.knex<User>("user")
      .update({
        profilepic: newProfilepic,
        phonenumber: newPhoneNumber,
        status_id: newStatusId,
        description: newDescription,
      })
      .where("id", userId)
      .returning("*");

    return userRecord;
  }

  // --------------------------------------------------------------------------------------------------------------------------------
  //get all users
  // --------------------------------------------------------------------------------------------------------------------------------
  async getAllUsers() {
    return await this.knex("user").select("*");
  }

  // async appleLogin(username: string, email: string) {
  // 	const userEmailRecord = await this.knex<User>('user')
  // 		.select('*')
  // 		.where('email', email)

  // 	const userRecord = await this.knex<User>('user')
  // 		.select('*')
  // 		.where('username', username)

  // 	if (userRecord.length > 0) {
  // 		throw new UserDuplicateUsernameError()
  // 	}

  // 	if (userEmailRecord.length > 0) {
  // 		throw new UserDuplicateEmailError()
  // 	}
  // 	await this.knex<User>('user').insert({
  // 		username: username,
  // 		password: 'apple',
  // 		email: email,
  // 		status_id: 1
  // 	})

  // 	return true
  // }

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
}
