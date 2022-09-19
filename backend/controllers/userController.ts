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

        // console.log("jwt in login",jwt);

 
      req.session['isLogin'] = true
      req.session['jwt'] = jwt
      req.session['username'] = user[0].username
      req.session['userId'] = user[0].id

      console.log("login",req.session);
      
      
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
  // Logout 
  // -------------------------------------------------------------------------------------------------------------------
  logout = async (req: express.Request, res: express.Response) => {
    try {
      logger.info(`${req.session['username']} logging out`)

      req.session.destroy( () => {
        res.status(500).json({ result: true, msg: "logout successful" });
      })

    } catch (err) {
      logger.error(err);
      res.status(500).json({ result: false, msg: "logout error" });
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
      const domain = req.get('origin')
      console.log("domain", domain);
      
      let show;
      const name = req.query.name as string != undefined ? req.query.name as string : req.query.q as string;
      const email = req.query.email as string;
      const status = req.query.status as string;
      const description = req.query.description as string;
      const phonenumber = parseInt(String(req.query.phonenumber)) as number;
      let allUserInfo:any;

      switch (domain) {
        case 'http://localhost:3000': // !!!!! remember to change to react admin domain when deploy
          show = false
          allUserInfo = await this.userService.getAllUser(name, email, status, description, phonenumber, show)
          break; 
        case 'http://localhost:3001': // !!!!! remember to change to frontend domain when deploy
          show = true
          allUserInfo = await this.userService.getAllUser(name, email, status, description, phonenumber, show)
          break;
        default:
            show = false
            allUserInfo = await this.userService.getAllUser(name, email, status, description, phonenumber, show)
            break;
      }
      
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
 if (req.get('origin')  == 'http://localhost:3001') {
    
 console.log("req.body",req.body)
 res.end()
  } else if (req.get('origin')  == 'http://localhost:3000') {
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
  }

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
      return res.json(team);
    } catch (err) {
      logger.error(err);
      return res.status(400).json({ result: false, msg: "get team fail" });
    }
  };

  // -------------------------------------------------------------------------------------------------------------------
  // user join team
  // -------------------------------------------------------------------------------------------------------------------
  joinTeam = async (req: express.Request, res: express.Response) => {
    try {
      const { teamId, userId } = req.params;
      const NumberTeamId = parseInt(teamId);
      const NumberUserId = parseInt(userId);
      const team = await this.userService.joinTeam(NumberTeamId, NumberUserId);
      res.status(200).json(team);
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
      // const userId =
      //   req.user?.userId != undefined
      //     ? Number(req.user.userId)
      //     : parseInt(req.params.id);
      const { userId, teamId } = req.params;
      const NumberUserId = parseInt(userId);
      const NumberTeamId = parseInt(teamId);
      const team = await this.userService.quitTeam(NumberUserId, NumberTeamId);
      return res.json(team);
    } catch (err) {
      logger.error(err);
      return res.status(400).json({ result: false, msg: "guit team fail" });
    }
  };

  joinEvent = async (req: express.Request, res: express.Response) => {
    try {
      const { eventId, userId } = req.params;
      const NumberEventId = parseInt(eventId);
      const NumberUserId = parseInt(userId);
      // const { NumberEventId, NumberUserId } = req.body;
      const event = await this.userService.joinEvent(
        NumberEventId,
        NumberUserId
      );
      res.status(200).json(event);
    } catch (err) {
      logger.error(err);
      res.status(400).json({ result: false, msg: "join event fail" });
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
          console.log("userId", userId);
      const notification = await this.userService.getNotification(userId);
      return res.json(notification);
    } catch (err) {
      logger.error(err);
      return res.json({ result: false, msg: "Get notification fail" });
    }
  }

}
