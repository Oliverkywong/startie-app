// -------------------------------------------------------------------------------------------------------------------
// imports
// -------------------------------------------------------------------------------------------------------------------
import express from "express";
import formidable from "formidable";
import fs from "fs";
import { Bearer } from "permit";
import * as jose from "jose";
import { josePublicKey } from "../jose";

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
    const jwt = permit.check(req); //receive token from redux

    const publicKey = await josePublicKey();
    const { payload } = await jose.jwtVerify(jwt, publicKey);


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
    // console.log(e);
    if (e.code === "ERR_JWT_EXPIRED") {
      res.status(401).json({ result: false, msg: "Token expired" });
    } else {
      res.status(401).json({ result: false, msg: "Incorrect Token" });
    }
  }
};

// -------------------------------------------------------------------------------------------------------------------
// check if the user is Board of the team
// -------------------------------------------------------------------------------------------------------------------
export const isBoard = (
  //   roleId: number,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  if (true) {
    next();
  } else {
    res.redirect("/");
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
  maxFiles: 1,
  maxFileSize: 20 * 1024 * 1024 ** 2, // 20MB
  filter: (part) => part.mimetype?.startsWith("image/") || false,
});
