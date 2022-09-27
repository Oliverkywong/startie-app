import express from "express";
import { logger } from "../utils/logger";
import {
  UserDuplicateEmailError,
  UserDuplicateUsernameError,
  UserMissingRegisterInfoError,
  UserNotExistError,
  UserPasswordMissMatchError,
  UserService,
  UserStatusError,
  YourHaveJoinedThisEventError,
  YourHaveJoinedThisTeamError,
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
      const client = new OAuth2Client(process.env.GOOGLE_IOS_CLIENT_ID);
      const ticket = await client.verifyIdToken({
        idToken: req.body.idToken,
        audience: process.env.GOOGLE_IOS_CLIENT_ID,
      });

      const payload = ticket.getPayload();

      const googlelogin = await this.userService.socialLogin(req.body.email);
      if (!googlelogin.result) {
        await this.userService.register(
          req.body.displayName,
          "google",
          req.body.email,
          "0000000000",
          "google user"
        );
      }

      const user = {
        id: parseInt(googlelogin.userId),
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
        username: req.body.displayName,
      }) // use private key to sign
        .setProtectedHeader({ alg: "ES256" })
        .setIssuedAt()
        .setExpirationTime("24h")
        .sign(ecPrivateKey);

      logger.info(`${user.username} logged in`);

      return res.status(200).header("token", jwt).json({
        result: true,
        msg: "google login success",
        user: user,
        jwt: jwt,
      });
    } catch (err) {
      return res.status(500).json({ result: false, msg: "google login error" });
    }
  };
  // -------------------------------------------------------------------------------------------------------------------
  // Register ✅
  // -------------------------------------------------------------------------------------------------------------------
  register = async (req: express.Request, res: express.Response) => {
    try {
      let username: string = req.body.username.trim();
      let password: string = req.body.password.trim();
      let email: string = req.body.email.trim();

      const register = await this.userService.register(
        username,
        password,
        email,
        req.body.phonenumber,
        req.body.description
      );

      const ecPrivateKey = await joseKey(); // login after register
      const jwt = await new jose.SignJWT({
        "urn:example:claim": true,
        userId: req.body.user,
        username: req.body.username,
      }) // use private key to sign
        .setProtectedHeader({ alg: "ES256" })
        .setIssuedAt()
        .setExpirationTime("24h")
        .sign(ecPrivateKey);

      logger.info(`${username} logged in`);

      res.status(200).json({
        result: true,
        msg: "register success",
        user: register,
        jwt: jwt,
      });
    } catch (err) {
      if (err instanceof UserDuplicateUsernameError) {
        res.status(500).json({ result: false, msg: "username already exists" });
      } else if (err instanceof UserDuplicateEmailError) {
        res.status(501).json({ result: false, msg: "email already exists" });
      } else if (err instanceof UserMissingRegisterInfoError) {
        res.status(502).json({ result: false, msg: "missing register info" });
      } else {
        logger.error(err);
        res.status(503).json({ result: false, msg: "register error" });
      }
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

      const ecPrivateKey = await joseKey();

      const jwt = await new jose.SignJWT({
        "urn:example:claim": true,
        userId: user[0].id,
        username: user[0].username,
        isadmin: user[0].isadmin,
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
      } else {
        logger.error(err);
        return res.status(500).json({ result: false, msg: "login fail" });
      }
    }
  };
  // -------------------------------------------------------------------------------------------------------------------
  // get self user Info
  // -------------------------------------------------------------------------------------------------------------------
  userInfo = async (req: express.Request, res: express.Response) => {
    console.log("userId", req.user?.userId);
    try {
      let userId = req.user!.userId; // get userId from JWT

      const userInfo = await this.userService.userInfo(userId);
      res.json(userInfo[0]);
    } catch (err) {
      logger.error(err);
      res.json({ result: false, msg: "Get self user profile fail" });
    }
  };
  // -------------------------------------------------------------------------------------------------------------------
  // get other user Info params id (seems same for admin also, can cut this?)
  // -------------------------------------------------------------------------------------------------------------------
  userInfoById = async (req: express.Request, res: express.Response) => {
    try {
      let userId = parseInt(req.params.id);
      const userInfo = await this.userService.userInfo(userId);
      res.json(userInfo[0]);
    } catch (err) {
      logger.error(err);
      res.json({ result: false, msg: "Get user profile fail" });
    }
  };
  // -------------------------------------------------------------------------------------------------------------------
  // get user Info by Admin
  // -------------------------------------------------------------------------------------------------------------------
  userInfoForAdmin = async (req: express.Request, res: express.Response) => {
    try {
      let userId = parseInt(req.params.id); // get userId from params

      const userInfo = await this.userService.userInfo(userId);
      res.json(userInfo[0]);
    } catch (err) {
      logger.error(err);
      res.json({ result: false, msg: "Get user profile fail" });
    }
  };
  // -------------------------------------------------------------------------------------------------------------------
  // get all userInfo for app
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
  // get all user (this should be redundant)
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

      res.set("x-total-count", String(json.count));
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
      const userId = req.user!.userId; //get userId from JWT
      const name = req.body.data.name;
      const phonenumber = req.body.data.phone;
      const shortDescription = req.body.data.shortDescription;
      const description = req.body.data.Description;
      const profilepic = req.body.img;
      const goodAt = parseInt(req.body.data.goodat);

      const userInfo = await this.userService.editUser(
        userId,
        name,
        phonenumber,
        shortDescription,
        description,
        profilepic,
        goodAt
      );

      res.status(200).json({
        result: true,
        msg: "Edit user profile success",
        userInfo: userInfo,
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
      const input: UserListInput = req.body;
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

      const applelogin = await this.userService.socialLogin(
        appleuserinfo.email
      );
      if (!applelogin.result) {
        await this.userService.register(
          appleUser,
          "apple",
          appleuserinfo.email,
          "0000000000",
          "apple user"
        );
      }

      const user = {
        id: parseInt(applelogin.userId),
        username: appleUser,
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

      logger.info(`${user.username} logged in`);

      return res.status(200).header("token", jwt).json({
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
  // check user other team info
  // -------------------------------------------------------------------------------------------------------------------
  otherUserTeam = async (req: express.Request, res: express.Response) => {
    try {
      const userId = parseInt(req.params.id);
      const team = await this.userService.checkTeam(userId);
      res.json(team);
    } catch (err) {
      logger.error(err);
      res.status(400).json({ result: false, msg: "get other team fail" });
    }
  };

  // -------------------------------------------------------------------------------------------------------------------
  // user join team
  // -------------------------------------------------------------------------------------------------------------------
  joinTeam = async (req: express.Request, res: express.Response) => {
    try {
      const userId = req.user!.userId;
      const teamId = req.params.teamId;
      const NumberTeamId = parseInt(teamId);
      const team = await this.userService.joinTeam(NumberTeamId, userId);
      res
        .status(200)
        .json({ result: true, msg: "join team success!!", team: team }); // json must pass result:true, otherwise inform michael
    } catch (err) {
      logger.error(err);
      if (err instanceof YourHaveJoinedThisTeamError) {
        res.status(400).json({ result: false, msg: "already joined team" });
      } else {
        res.status(400).json({ result: false, msg: "join team fail" });
      }
    }
  };

  // -------------------------------------------------------------------------------------------------------------------
  // user leave team
  // -------------------------------------------------------------------------------------------------------------------
  quitTeam = async (req: express.Request, res: express.Response) => {
    try {
      const userId = req.user!.userId;
      const { teamId } = req.params;
      const NumberTeamId = parseInt(teamId);

      const team = await this.userService.quitTeam(userId, NumberTeamId);
      res
        .status(200)
        .json({ team: team, result: true, msg: "quit team success!!" });
    } catch (err) {
      logger.error(err);
      res.status(400).json({ result: false, msg: "quit team fail" });
    }
  };
  // -------------------------------------------------------------------------------------------------------------------
  // check event
  // -------------------------------------------------------------------------------------------------------------------
  checkEvent = async (req: express.Request, res: express.Response) => {
    try {
      const userId =
        req.user?.userId != undefined
          ? Number(req.user.userId)
          : parseInt(req.params.id);
      const event = await this.userService.checkEvent(userId);
      res.json(event);
    } catch (err) {
      logger.error(err);
      res.status(400).json({ result: false, msg: "get event fail" });
    }
  };
  // -------------------------------------------------------------------------------------------------------------------
  // check user other event info
  // -------------------------------------------------------------------------------------------------------------------
  otherUserEvent = async (req: express.Request, res: express.Response) => {
    try {
      const userId = parseInt(req.params.id);
      const event = await this.userService.checkEvent(userId);
      res.json(event);
    } catch (err) {
      logger.error(err);
      res.status(400).json({ result: false, msg: "get other event fail" });
    }
  };
  // -------------------------------------------------------------------------------------------------------------------
  // user join event
  // -------------------------------------------------------------------------------------------------------------------
  joinEvent = async (req: express.Request, res: express.Response) => {
    try {
      const userId = req.user!.userId;
      const eventId = req.params.id;
      const NumberEventId = parseInt(eventId);
      const event = await this.userService.joinEvent(userId, NumberEventId);
      res
        .status(200)
        .json({ result: true, msg: "join event success!!", event: event }); //for frontend toast box
    } catch (err) {
      logger.error(err);
      if (err instanceof YourHaveJoinedThisEventError) {
        res.status(400).json({ result: false, msg: "already joined event" });
      } else {
        res.status(500).json({ result: false, msg: "join event fail!!" });
      }
    }
  };
  // -------------------------------------------------------------------------------------------------------------------
  // user leave event
  // -------------------------------------------------------------------------------------------------------------------
  quitEvent = async (req: express.Request, res: express.Response) => {
    try {
      const userId = req.user!.userId;
      const { eventId } = req.params;
      const NumberEventId = parseInt(eventId);
      const event = await this.userService.quitEvent(userId, NumberEventId);
      res.json(event);
    } catch (err) {
      logger.error(err);
      res.status(400).json({ result: false, msg: "quit event fail" });
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
      const notification = await this.userService.getNotification(userId);
      res.json(notification);
    } catch (err) {
      logger.error(err);
      res.json({ result: false, msg: "Get notification fail" });
    }
  };
}
