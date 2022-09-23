import express from "express";
import { form } from "../utils/middleware";
import { logger } from "../utils/logger";
import {
  UserDuplicateEmailError,
  UserDuplicateUsernameError,
  UserMissingRegisterInfoError,
  UserNotExistError,
  UserPasswordMissMatchError,
  UserService,
  UserStatusError,
} from "../services/userService";
import { joseKey } from "../jose";
import * as jose from "jose";
import appleSignin from "apple-signin-auth";
import crypto from "crypto";
import { OAuth2Client } from "google-auth-library";
import { UserListInput } from "../utils/api-types";

export class UserController {
  constructor(private userService: UserService) {}
  // -------------------------------------------------------------------------------------------------------------------
  // Google Login
  // -------------------------------------------------------------------------------------------------------------------

  loginGoogle = async (req: express.Request, res: express.Response) => {
    try {
      // console.log(req.body)
      const client = new OAuth2Client(process.env.GOOGLE_IOS_CLIENT_ID);
      const ticket = await client.verifyIdToken({
        idToken: req.body.idToken,
        audience: process.env.GOOGLE_IOS_CLIENT_ID,
      });

      const payload = ticket.getPayload();

      // await this.userService.appleLogin(req.body.displayName, req.body.email);
      await this.userService.register(
        req.body.displayName,
        "google",
        req.body.email,
        1
      );

      const user = {
        username: payload?.["name"],
        email: payload?.["email"],
        profilepic: "tonystarkicon.png",
        phonenumber: "0000000000",
        description: "google user",
      };
      const ecPrivateKey = await joseKey();
      const jwt = await new jose.SignJWT({
        "urn:example:claim": true,
        userId: req.body.user,
        username: req.body.fullName.nickname,
      }) // use private key to sign
        .setProtectedHeader({ alg: "ES256" })
        .setIssuedAt()
        .setExpirationTime("24h")
        .sign(ecPrivateKey);

      res.status(200).json({
        result: true,
        msg: "google login success",
        user: user,
        jwt: jwt,
      });
    } catch (err) {
      res.status(500).json({ result: false, msg: "google login error" });
    }
  };
  // -------------------------------------------------------------------------------------------------------------------
  // Register ✅
  // -------------------------------------------------------------------------------------------------------------------
  register = async (req: express.Request, res: express.Response) => {
    try {
      // console.log(req.body);

      let username: string = req.body.username.trim();
      let password: string = req.body.password.trim();
      let email: string = req.body.email.trim();

      await this.userService.register(username, password, email);
      res.status(200).json({ result: true, msg: "register success" });
    } catch (err) {
      if (err instanceof UserDuplicateUsernameError) {
        res.status(500).json({ result: false, msg: "username already exists" });
      }

      if (err instanceof UserDuplicateEmailError) {
        res.status(500).json({ result: false, msg: "email already exists" });
      }

      if (err instanceof UserMissingRegisterInfoError) {
        res.status(500).json({ result: false, msg: "missing register info" });
      }

      logger.error(err);
      res.status(500).json({ result: false, msg: "register error" });
    }
  };

  // -------------------------------------------------------------------------------------------------------------------
  // LOGIN ✅
  // -------------------------------------------------------------------------------------------------------------------
  login = async (req: express.Request, res: express.Response) => {
    try {
      let username = req.body.username.trim();
      let password = req.body.password.trim();
      let user = await this.userService.login(username, password);
      console.log("user:", user);

      const ecPrivateKey = await joseKey();

      const jwt = await new jose.SignJWT({
        "urn:example:claim": true,
        userId: user[0].id,
        username: user[0].username,
      }) // use private key to sign
        .setProtectedHeader({ alg: "ES256" })
        .setIssuedAt()
        .setExpirationTime("2h")
        .sign(ecPrivateKey);

      logger.info(`${username} logged in`);
      // res.header('token', jwt)
      // res.headers.set("token", jwt);
      return res.status(200).header("token", jwt).json({
        result: true,
        msg: "login success",
        user: user[0],
        jwt: jwt,
      });
    } catch (err) {
      if (err instanceof UserNotExistError) {
        return res
          .status(500)
          .json({ result: false, msg: "username not exist" });
      }

      if (err instanceof UserPasswordMissMatchError) {
        return res
          .status(500)
          .json({ result: false, msg: "password miss match" });
      }

      if (err instanceof UserStatusError) {
        return res
          .status(500)
          .json({ result: false, msg: "The user is not active" });
      }

      logger.error(err);
      return res.status(500).json({ result: false, msg: "login fail" });
    }
  };
  // -------------------------------------------------------------------------------------------------------------------
  // Logout
  // -------------------------------------------------------------------------------------------------------------------
  logout = async (req: express.Request, res: express.Response) => {
    try {
      logger.info(`${req.session["username"]} logging out`);

      // req.session.destroy( () => {
      //   res.status(500).json({ result: true, msg: "logout successful" });
      // })
    } catch (err) {
      logger.error(err);
      res.status(500).json({ result: false, msg: "logout error" });
    }
  };
  // -------------------------------------------------------------------------------------------------------------------
  // get self user Info
  // -------------------------------------------------------------------------------------------------------------------
  userInfo = async (req: express.Request, res: express.Response) => {
    try {
      let userId = req.user!.userId; // get userId from JWT

      const userInfo = await this.userService.userInfo(userId);
      res.json(userInfo[0]);
    } catch (err) {
      logger.error(err);
      res.json({ result: false, msg: "Get user profile fail" });
    }
  };
  // -------------------------------------------------------------------------------------------------------------------
  // get user Info by userId
  // -------------------------------------------------------------------------------------------------------------------
  userInfoById = async (req: express.Request, res: express.Response) => {
    try {
      let userId = parseInt(req.params.id);
      const userInfo = await this.userService.userInfo(userId);
      res.json(userInfo[0]);
    } catch (err) {
      logger.error(err);
      res.json({ error: String(err) });
    }
  };
  // -------------------------------------------------------------------------------------------------------------------
  // get user Info by Admin
  // -------------------------------------------------------------------------------------------------------------------
  userInfoForAdmin = async (req: express.Request, res: express.Response) => {
    try {
      let userId = parseInt(req.params.id); // get userId from params

      console.log("userId", userId);

      const userInfo = await this.userService.userInfo(userId);
      res.json(userInfo[0]);
    } catch (err) {
      logger.error(err);
      res.json({ result: false, msg: "Get user profile fail" });
    }
  };
  // -------------------------------------------------------------------------------------------------------------------
  // get all userInfo (this should be only for admin)
  // -------------------------------------------------------------------------------------------------------------------
  getAllUser = async (req: express.Request, res: express.Response) => {
    try {
      let input: UserListInput = req.query;
      let show = false;
      let json = await this.userService.getAllUser(input, show);

      res.status(200).json(json);
    } catch (err) {
      logger.error(err);
      res.status(500).json({ error: String(err) });
    }
  };

  // -------------------------------------------------------------------------------------------------------------------
  // get all user
  // -------------------------------------------------------------------------------------------------------------------
  getAllUserList = async (req: express.Request, res: express.Response) => {
    try {
      let json = await this.userService.getAllUserList();

      res.status(200).json(json);
    } catch (err) {
      logger.error(err);
      res.status(500).json({ error: String(err) });
    }
  };
  // -------------------------------------------------------------------------------------------------------------------
  // get all userInfo for react admin
  // -------------------------------------------------------------------------------------------------------------------
  getAllUserForAdmin = async (req: express.Request, res: express.Response) => {
    try {
      let input: UserListInput = req.query;

      let show = true;
      let json = await this.userService.getAllUser(input, show);

      res.set("x-total-count", String(json.user?.length));
      res.status(200).json(json.user);
    } catch (err) {
      logger.error(err);
      res.status(500).json({ error: String(err) });
    }
  };

  // -------------------------------------------------------------------------------------------------------------------
  // edit User Info
  // -------------------------------------------------------------------------------------------------------------------
  editUser = async (req: express.Request, res: express.Response) => {
    try {
      form.parse(req, async (err, fields, files) => {
        const userId = req.user!.userId; //get userId from JWT

        const userInfos = await this.userService.userInfo(userId);
        let oldProfilepic = userInfos[0].profilepic;
        let oldPhoneNumber = userInfos[0].phonenumber;
        let oldDescription = userInfos[0].description;

        const newProfilepic =
          files.profilepic != null && !Array.isArray(files.profilepic)
            ? files.profilepic.newFilename
            : oldProfilepic;

        const newPhoneNumber =
          fields.phonenumber != null && !Array.isArray(fields.phonenumber)
            ? fields.phonenumber.trim()
            : oldPhoneNumber;

        const newDescription =
          fields.description != null && !Array.isArray(fields.description)
            ? fields.description
            : oldDescription;

        const userInfo = await this.userService.editUser(
          userId,
          newProfilepic,
          newPhoneNumber,
          newDescription
        );

        res.json({
          result: true,
          msg: "Edit user profile success",
          userInfo,
        });
      });
    } catch (err) {
      logger.error(err);
      res.status(500).json({ result: false, msg: "edit user fail" });
    }
  };
  // -------------------------------------------------------------------------------------------------------------------
  // Edit User for React Admin
  // -------------------------------------------------------------------------------------------------------------------
  editUserForAdmin = async (req: express.Request, res: express.Response) => {
    try {
      const userId = parseInt(req.params.id);

      console.log("edit User", userId);

      const input: UserListInput = req.body;

      console.log(req.body);

      const userInfo = await this.userService.editUserForAdmin(userId, input);

      res.status(200).json({
        //for react admin, otherwise dataProvider will throw error
        id: userInfo[0].id,
        data: userInfo[0],
      });
    } catch (err) {
      logger.error(err);
      res.status(500).json({ error: String(err) });
    }
  };
  // -------------------------------------------------------------------------------------------------------------------
  // Apple Login
  // -------------------------------------------------------------------------------------------------------------------
  loginApple = async (req: express.Request, res: express.Response) => {
    try {
      const appleuserinfo = await appleSignin.verifyIdToken(
        req.body.identityToken,
        {
          audience: "com.oliverstrat.startie",
          nonce: req.body.nonce
            ? crypto.createHash("sha256").update(req.body.nonce).digest("hex")
            : undefined,
          ignoreExpiration: true,
        }
      );

      const appleUser =
        req.body.fullName.nickname === ""
          ? "Apple User"
          : req.body.fullName.nickname;

      // await this.userService.appleLogin(req.body.fullName.nickname, appleuserinfo.email);
      await this.userService.register(
        appleUser,
        "apple",
        appleuserinfo.email,
        1
      );

      const user = {
        username: req.body.fullName.nickname,
        email: appleuserinfo.email,
        profilepic: "tonystarkicon.png",
        phonenumber: "0000000000",
        description: "apple user",
      };
      const ecPrivateKey = await joseKey();
      const jwt = await new jose.SignJWT({
        "urn:example:claim": true,
        userId: req.body.user,
        username: req.body.fullName.nickname,
      }) // use private key to sign
        .setProtectedHeader({ alg: "ES256" })
        .setIssuedAt()
        .setExpirationTime("24h")
        .sign(ecPrivateKey);

      return res.status(200).json({
        result: true,
        msg: "apple login success",
        user: user,
        jwt: jwt,
      });
    } catch (err) {
      // Token is not verified
      logger.error(err);
      return res.status(400).json({ result: false, msg: "apple login error" });
    }
  };
  // -------------------------------------------------------------------------------------------------------------------
  // check team
  // -------------------------------------------------------------------------------------------------------------------
  checkTeam = async (req: express.Request, res: express.Response) => {
    try {
      const userId =
        req.user?.userId != undefined
          ? Number(req.user.userId)
          : parseInt(req.params.id);
      const team = await this.userService.checkTeam(userId);
      res.json(team);
    } catch (err) {
      logger.error(err);
      res.status(400).json({ result: false, msg: "get team fail" });
    }
  };

  // -------------------------------------------------------------------------------------------------------------------
  // user join team
  // -------------------------------------------------------------------------------------------------------------------
  joinTeam = async (req: express.Request, res: express.Response) => {
    try {
      const userId = req.user!.userId;
      const teamId = req.params.teamid;
      const NumberTeamId = parseInt(teamId);
      const team = await this.userService.joinTeam(NumberTeamId, userId);
      res
        .status(200)
        .json({ result: true, msg: "join team success!!", team: team }); // json must pass result:true, otherwise inform michael
    } catch (err) {
      logger.error(err);
      res.status(400).json({ result: false, msg: "join team fail" });
    }
  };

  // -------------------------------------------------------------------------------------------------------------------
  // user leave team
  // -------------------------------------------------------------------------------------------------------------------
  quitTeam = async (req: express.Request, res: express.Response) => {
    try {
      const { userId, teamId } = req.params;
      const NumberUserId = parseInt(userId);
      const NumberTeamId = parseInt(teamId);
      const team = await this.userService.quitTeam(NumberUserId, NumberTeamId);
      res.json(team);
    } catch (err) {
      logger.error(err);
      res.status(400).json({ result: false, msg: "guit team fail" });
    }
  };

  joinEvent = async (req: express.Request, res: express.Response) => {
    try {
      const userId = req.user!.userId;
      const eventId = req.params.id;
      const NumberEventId = parseInt(eventId);
      const event = await this.userService.joinEvent(NumberEventId, userId);
      res
        .status(200)
        .json({ result: true, msg: "join event success!!", event: event }); //for frontend toast box
      console.log("joinEvent", event);
    } catch (err) {
      logger.error(err);
      res.status(400).json({ result: false, msg: "join event fail!!" });
    }
  };
  // -------------------------------------------------------------------------------------------------------------------
  // get notification
  // -------------------------------------------------------------------------------------------------------------------
  getNotification = async (req: express.Request, res: express.Response) => {
    try {
      const userId =
        req.user?.userId != undefined
          ? Number(req.user.userId)
          : parseInt(req.params.id);
      // console.log("userId", userId);
      const notification = await this.userService.getNotification(userId);
      res.json(notification);
    } catch (err) {
      logger.error(err);
      res.json({ result: false, msg: "Get notification fail" });
    }
  };
}
