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
    return knex.migrate
      .rollback()
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

  // 	afterAll(async () => {
  // 		return knex.migrate.rollback()
  //     .then(function() {
  //       return knex.migrate.latest();
  //     })
  //     .then(function() {
  //       return knex.seed.run();
  //     });
  // });

  // -------------------------------------------------------------------------------------------------------------------
  it("can login", async () => {
    //Act
    const userRecord = await userService.login("Oliver", "oliver");

    //Assert
    expect(userRecord[0].username).toBe("Oliver");
    expect(await checkPassword("oliver", userRecord[0].password)).toBe(true);
  });
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
  it("can register", async () => {
    //Act
    const registerRecord = await userService.register(
      "Alex",
      "alex",
      "alex@gmail.com",
      1
    );

    //Assert
    expect(registerRecord).toBeTruthy();
  });
  // -------------------------------------------------------------------------------------------------------------------
  it("cannot register (UserDuplicateUsernameError)", async () => {
    //Act
    try {
      await userService.register("Oliver", "whatever", "charlie@gmail.com", 1);
      fail("should throw UserDuplicateUsernameError");
    } catch (err) {
      //Assert
      expect(err).toBeInstanceOf(UserDuplicateUsernameError);
    }
  });
  // -------------------------------------------------------------------------------------------------------------------
  it("cannot register (UserDuplicateEmailError)", async () => {
    //Act
    try {
      await userService.register(
        "Jason",
        "whatever",
        "oliverwong@gmail.com",
        1
      );
      fail("should throw UserDuplicateEmailError");
    } catch (err) {
      //Assert
      expect(err).toBeInstanceOf(UserDuplicateEmailError);
    }
  });
  // -------------------------------------------------------------------------------------------------------------------
  it("cannot register (User Missing username)", async () => {
    //Act
    try {
      await userService.register("", "whatever", "ken@gmail.com", 1);
      fail("should throw UserMissingRegisterInfoError");
    } catch (err) {
      //Assert
      expect(err).toBeInstanceOf(UserMissingRegisterInfoError);
    }
  });
  // -------------------------------------------------------------------------------------------------------------------
  it("cannot register (User Missing password)", async () => {
    //Act
    try {
      await userService.register("Jason", "", "jason@gmail.com", 1);
      fail("should throw UserMissingRegisterInfoError");
    } catch (err) {
      //Assert
      expect(err).toBeInstanceOf(UserMissingRegisterInfoError);
    }
  });
  // -------------------------------------------------------------------------------------------------------------------
  it("cannot register (User Missing email)", async () => {
    //Act
    try {
      await userService.register("Jason", "jason", "", 1);
      fail("should throw UserMissingRegisterInfoError");
    } catch (err) {
      //Assert
      expect(err).toBeInstanceOf(UserMissingRegisterInfoError);
    }
  });
  // -------------------------------------------------------------------------------------------------------------------
  it("gets user information", async () => {
    //Act
    const userRecord = await userService.userInfo(1);

    //Assert
    expect(userRecord[0].id).toBe(1);
    expect(userRecord[0].username).toBe("Oliver");
    expect(userRecord[0].email).toBe("oliverwong@gmail.com");
    expect(userRecord[0].phonenumber).toBe("95804970");
    expect(userRecord[0].profilepic).toBe("oliver.jpg");
    expect(userRecord[0].description).toBe("testing");
  });
  // -------------------------------------------------------------------------------------------------------------------
  it("can edit user information", async () => {
    const phoneNumber = "95804971";
    const description = "I am Oliver Wong";
    const profilePic = "oliverwong.jpg";
    //Act
    const userRecord = await userService.editUser(
      1,
      profilePic,
      phoneNumber,
      description
    );

    //Assert
    expect(userRecord[0].id).toBe(1);
    expect(userRecord[0].username).toBe("Oliver");
    expect(userRecord[0].email).toBe("oliverwong@gmail.com");
    expect(userRecord[0].phonenumber).toBe("95804971");
    expect(userRecord[0].profilepic).toBe("oliverwong.jpg");
    expect(userRecord[0].description).toBe("I am Oliver Wong");
  });
});
