import Knex from "knex";
import { checkPassword } from "../../utils/hash";
import {
  UserDuplicateEmailError,
  UserDuplicateUsernameError,
  UserMissingRegisterInfoError,
  UserNotExistError,
  UserPasswordMissMatchError,
  UserService,
} from "../userService";

const knexfile = require("../../knexfile"); // Assuming you test case is inside `services/ folder`
const knex = Knex(knexfile["test"]); // Now the connection is a testing connection.

describe("Integration test of userService", () => {
  let userService: UserService = new UserService(knex);

  beforeAll(async () => {
    return knex.migrate.rollback()
      .then(function () {
        return knex.migrate.latest();
      })
      .then(function () {
        return knex.seed.run();
      });
  });

  afterAll(async () => {
    await knex.destroy();
  });

// -------------------------------------------------------------------------------------------------------------------
//  Login success ✅
// -------------------------------------------------------------------------------------------------------------------
  it("can login", async () => {
    //Act
    const userRecord = await userService.login("Oliver", "oliver");

    //Assert
    expect(userRecord[0].username).toBe("Oliver");
    expect(await checkPassword("oliver", userRecord[0].password)).toBe(true);
  });
// -------------------------------------------------------------------------------------------------------------------
//  Login error (user not exist) ✅
// -------------------------------------------------------------------------------------------------------------------
it("cannot login (UserNotExistError)", async () => {
    //Act
    try {
      await userService.login("Jason", "admin");
      fail("should throw UserNotExistError");
    } catch (err) {
      //Assert
      expect(err).toBeInstanceOf(UserNotExistError);
    }
  });
// -------------------------------------------------------------------------------------------------------------------
//  Login error (password missmatch) ✅
// -------------------------------------------------------------------------------------------------------------------
it("cannot login (UserPasswordMissMatchError)", async () => {
    //Act
    try {
      await userService.login("Oliver", "admim");
      fail("should throw UserPasswordMissMatchError");
    } catch (err) {
      //Assert
      expect(err).toBeInstanceOf(UserPasswordMissMatchError);
    }
  });
// -------------------------------------------------------------------------------------------------------------------
//  Register success ✅
// -------------------------------------------------------------------------------------------------------------------
it("can register", async () => {
    //Act
    const registerRecord = await userService.register(
      "Alex",
      "alex",
      "alex@gmail.com"
    );

    //Assert
    expect(registerRecord.result).toBeTruthy();
    expect(registerRecord.user[0].username).toBe("Alex");
    expect(await checkPassword('alex', registerRecord[0].password)).toBe(true)
    expect(registerRecord.user[0].email).toBe("alex@gmail.com");
    expect(registerRecord.user_tag[0].user_id).toBe(1);
    expect(registerRecord.user_tag[0].tag_id).toBe(1);
  });
// -------------------------------------------------------------------------------------------------------------------
//  Register error (Duplicate username) ✅
// -------------------------------------------------------------------------------------------------------------------
it("cannot register (UserDuplicateUsernameError)", async () => {
    //Act
    try {
      await userService.register("Oliver", "whatever", "ken@gmail.com");
      fail("should throw UserDuplicateUsernameError");
    } catch (err) {
      //Assert
      expect(err).toBeInstanceOf(UserDuplicateUsernameError);
    }
  });
// -------------------------------------------------------------------------------------------------------------------
//  Register error (Duplicate Email) ✅
// -------------------------------------------------------------------------------------------------------------------
it("cannot register (UserDuplicateEmailError)", async () => {
    //Act
    try {
      await userService.register(
        "Jason",
        "whatever",
        "oliverwong@gmail.com"
      );
      fail("should throw UserDuplicateEmailError");
    } catch (err) {
      //Assert
      expect(err).toBeInstanceOf(UserDuplicateEmailError);
    }
  });
// -------------------------------------------------------------------------------------------------------------------
//  Register error (Missing Email) ✅
// -------------------------------------------------------------------------------------------------------------------
it("cannot register (User Missing username)", async () => {
    //Act
    try {
      await userService.register("", "whatever", "ken@gmail.com");
      fail("should throw UserMissingRegisterInfoError");
    } catch (err) {
      //Assert
      expect(err).toBeInstanceOf(UserMissingRegisterInfoError);
    }
  });
// -------------------------------------------------------------------------------------------------------------------
//  Register error (Missing password) ✅
// -------------------------------------------------------------------------------------------------------------------
it("cannot register (User Missing password)", async () => {
    //Act
    try {
      await userService.register("Jason", "", "jason@gmail.com");
      fail("should throw UserMissingRegisterInfoError");
    } catch (err) {
      //Assert
      expect(err).toBeInstanceOf(UserMissingRegisterInfoError);
    }
  });
// -------------------------------------------------------------------------------------------------------------------
//  Register error (Missing Email) ✅
// -------------------------------------------------------------------------------------------------------------------
it("cannot register (User Missing email)", async () => {
    //Act
    try {
      await userService.register("Jason", "jason", "");
      fail("should throw UserMissingRegisterInfoError");
    } catch (err) {
      //Assert
      expect(err).toBeInstanceOf(UserMissingRegisterInfoError);
    }
  });
// -------------------------------------------------------------------------------------------------------------------
//  get user information ✅
// -------------------------------------------------------------------------------------------------------------------
it("gets user information", async () => {
    //Act
    const userRecord = await userService.userInfo(1);

    //Assert
    expect(userRecord[0].id).toBe(1);
    expect(userRecord[0].username).toBe("Oliver");
    expect(userRecord[0].email).toBe("oliverwong@gmail.com");
    expect(userRecord[0].phonenumber).toBe("95804970");
    expect(userRecord[0].profilepic).toBe("tonystarkicon.png");
    expect(userRecord[0].description).toBe("testing");
    expect(userRecord[0].shortDescription).toBe("One sentence description");
  });
// -------------------------------------------------------------------------------------------------------------------
//  edit user information ✅
// -------------------------------------------------------------------------------------------------------------------
it("can edit user information", async () => {
    const phoneNumber = "95804971";
    const description = "I am Oliver Wong";
    const shortDescription = "This is short description";
    const profilepic = "oliverwong.jpg";
    const name = "Oliver Wong"
    const goodAt = 1
    //Act
    const userRecord = await userService.editUser(
    1,
    name,
    phoneNumber,
    shortDescription,
    description,
    profilepic,
    goodAt
    );

    //Assert
    expect(userRecord[0].id).toBe(1);
    expect(userRecord[0].username).toBe("Oliver Wong");
    expect(userRecord[0].phonenumber).toBe("95804971");
    expect(userRecord[0].profilepic).toBe("oliverwong.jpg");
    expect(userRecord[0].description).toBe("I am Oliver Wong");
    expect(userRecord[0].shortDescription).toBe("This is short description");
  });
// -------------------------------------------------------------------------------------------------------------------
//  Error edit user information (UserNameAlreadyExistError)
// -------------------------------------------------------------------------------------------------------------------
it("can edit user information", async () => {
  const phoneNumber = "95804971";
  const description = "I am Oliver Wong";
  const shortDescription = "This is short description";
  const profilepic = "oliverwong.jpg";
  const name = "Oliver Wong"
  const goodAt = 1
  //Act
  const userRecord = await userService.editUser(
  1,
  name,
  phoneNumber,
  shortDescription,
  description,
  profilepic,
  goodAt
  );

  //Assert
  expect(userRecord[0].id).toBe(1);
  expect(userRecord[0].username).toBe("Oliver Wong");
  expect(userRecord[0].phonenumber).toBe("95804971");
  expect(userRecord[0].profilepic).toBe("oliverwong.jpg");
  expect(userRecord[0].description).toBe("I am Oliver Wong");
  expect(userRecord[0].shortDescription).toBe("This is short description");
});
});
