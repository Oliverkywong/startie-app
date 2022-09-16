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

      return res.status(200).json({
        result: true,
        msg: "google login success",
        user: user,
        jwt: jwt,
      });
    } catch (err) {
      return res.json({ result: false, msg: "google login error" });
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
      const statusId = 1;

      await this.userService.register(username, password, email, statusId);
      return res.status(200).json({ result: true, msg: "register success" });
    } catch (err) {
      if (err instanceof UserDuplicateUsernameError) {
        return res
          .status(500)
          .json({ result: false, msg: "username already exists" });
      }

      if (err instanceof UserDuplicateEmailError) {
        return res
          .status(500)
          .json({ result: false, msg: "email already exists" });
      }

      if (err instanceof UserMissingRegisterInfoError) {
        return res
          .status(500)
          .json({ result: false, msg: "missing register info" });
      }

      logger.error(err);
      return res.status(500).json({ result: false, msg: "register error" });
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
      }) // use private key to sign
        .setProtectedHeader({ alg: "ES256" })
        .setIssuedAt()
        .setExpirationTime("24h")
        .sign(ecPrivateKey);

      logger.info(`${username} logged in`);
      return res.status(200).json({
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
      return res.status(500).json({ result: false, msg: "login error" });
    }
  };
  // -------------------------------------------------------------------------------------------------------------------
  // get one userInfo
  // -------------------------------------------------------------------------------------------------------------------
  userInfo = async (req: express.Request, res: express.Response) => {
    try {
      const userId =
        req.user?.userId != undefined
          ? Number(req.user.userId)
          : parseInt(req.params.id); // get userId from JWT

      const userInfo = await this.userService.userInfo(userId);
      return res.json(userInfo[0]);
    } catch (err) {
      logger.error(err);
      return res.json({ result: false, msg: "Get user profile fail" });
    }
  };
// -------------------------------------------------------------------------------------------------------------------
// get all userInfo
// -------------------------------------------------------------------------------------------------------------------
  getAllUser = async (req: express.Request, res: express.Response) => {
    try {
      const allUserInfo = await this.userService.getAllUser();
      res.set("x-total-count", String(allUserInfo.length));
      res.status(200).json(allUserInfo);
    } catch (err) {
      logger.error(err);
      res.json({ result: false, msg: "Get user profile fail" });
    }
  };

  // -------------------------------------------------------------------------------------------------------------------
  // edit User Info
  // -------------------------------------------------------------------------------------------------------------------

  editUser = async (req: express.Request, res: express.Response) => {
 
    form.parse(req, async (err, fields, files) => {
      try {
        

        const userId = req.user?.userId !=undefined? Number(req.user.userId) : parseInt(req.params.id); // get userId from JWT
        console.log("edit User id", userId);
        

        const userInfos = await this.userService.userInfo(userId);
        let oldProfilepic = userInfos[0].profilepic;
        let oldPhoneNumber = userInfos[0].phonenumber;
        let oldDescription = userInfos[0].description;
        console.log("Old user Info", userInfos);

        const newStatusId = req.body.status_id != null? req.body.status_id : 1;

        // if (isAdmin) {
          // const oldStatusId = userInfos[0].status_id;

          // const newStatusId =
          // fields.status_id != null && !Array.isArray(fields.status_id)
          //   ? parseInt(fields.status_id.trim())
          //   : oldStatusId;
        // }

        const newProfilepic: any =
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
          newStatusId,
          newPhoneNumber,
          newDescription
        );

        console.log("New userInfo", userInfo);
        
        return res.json({
          result: true,
          msg: "Edit user profile success",
          userInfo,
        });
      } catch (err) {
        logger.error(err);
        return res.json({
          result: false,
          msg: "Edit user profile fail",
        });
      }
    });
  };

// -------------------------------------------------------------------------------------------------------------------
// get all user
// -------------------------------------------------------------------------------------------------------------------

  getAllUsers = async (req: express.Request, res: express.Response) => {
    try {
      const users = await this.userService.getAllUsers();
      return res.json(users);
    } catch (err) {
      logger.error(err);
      return res.json({ result: false, msg: "Get all users fail" });
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
  // Log out
  // -------------------------------------------------------------------------------------------------------------------
  // 	logout = async (req: express.Request, res: express.Response) => {
  // 		try {
  // 			req.session['isLogin'] = false
  // 			res.json({ result: true, msg: 'logout success' })
  // 			logger.info(`${req.session['user'].username} logged out`)
  // 		}
  // 		catch (err) {
  // 			logger.error(err)
  // 			return res.status(500).json({ result: false, msg: 'logout Error' })
  // 		}
  // 	}

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
      return res.json(team);
    } catch (err) {
      logger.error(err);
      return res.json({ result: false, msg: "Get team fail" });
    }
  };
}
