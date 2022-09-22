// -------------------------------------------------------------------------------------------------------------------
// imports
// -------------------------------------------------------------------------------------------------------------------
import express from "express";
import formidable from "formidable";
import fs from "fs";
import { Bearer } from "permit";
import * as jose from "jose";
import { josePublicKey } from "../jose";
import { logger } from "./logger";

// -------------------------------------------------------------------------------------------------------------------
// JWT Bearer
// -------------------------------------------------------------------------------------------------------------------
const permit = new Bearer({
  query: "access_token",
});
// -------------------------------------------------------------------------------------------------------------------
// check if the user is login or not
// -------------------------------------------------------------------------------------------------------------------
export const isLogin = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const jwt = permit.check(req);

    console.log("jwt:", jwt);

    const publicKey = await josePublicKey();
    const { payload } = await jose.jwtVerify(jwt, publicKey); //use the public key to verify the token

    // console.log('payload:',payload);

    if (payload["userId"]) {
      req.user = {
        userId: payload["userId"] as number,
        username: payload["username"] as string,
      };
      next();
    } else {
      res.status(401).json({ result: false, msg: "Unauthorized" });
    }
  } catch (e) {
    if (e.code === "ERR_JWT_EXPIRED") {
      res.status(401).json({ result: false, msg: "Token expired" });
    } else {
      res.status(401).json({ result: false, msg: "Incorrect Token" });
    }
  }
};

// -------------------------------------------------------------------------------------------------------------------
// check if the current user is Admin
// -------------------------------------------------------------------------------------------------------------------
export const isAdmin = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const jwt = permit.check(req);
    const publicKey = await josePublicKey();
    const { payload } = await jose.jwtVerify(jwt, publicKey);

    if (payload["isadmin"]) {
      req.user = {
        userId: payload["userId"] as number,
        username: payload["username"] as string,
        isadmin: true as boolean
      };
      next();
    } else {
      res.status(401).json({ result: false, msg: "The user is not Admin" });
    }
  } catch (e) {
    logger.error(e);
    res.status(500).json({ result: false, msg: "check admin role fail" });
  }
};

// -------------------------------------------------------------------------------------------------------------------
// formidable (upload dir will be opened if it doesn't exist)
// -------------------------------------------------------------------------------------------------------------------

const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync("uploads", { recursive: true });
}

export const form = formidable({
  uploadDir: uploadDir,
  keepExtensions: true,
  multiples: true,
  maxFiles: 10,
  maxFileSize: 20 * 1024 * 1024 ** 2, // 20MB
  filter: (part) => part.mimetype?.startsWith("image/") || false,
});
