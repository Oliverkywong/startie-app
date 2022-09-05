// -------------------------------------------------------------------------------------------------------------------
// imports
// -------------------------------------------------------------------------------------------------------------------
import express from "express";
import formidable from "formidable";
import fs from "fs";
import { Bearer } from "permit";
import jwtSimple from "jwt-simple";
// import formidable from 'formidable'


const permit = new Bearer({
	query: "access_token"
})

// -------------------------------------------------------------------------------------------------------------------
// check if the user is login or not
// -------------------------------------------------------------------------------------------------------------------
export const isLogin = (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) => {
	const token = permit.check(req)
	const payload = jwtSimple.decode(token, "1234")
	if (payload['email']) {
		next()
	} else {
		res.redirect('/')
	}
}

// -------------------------------------------------------------------------------------------------------------------
// check if the user is Admin
// -------------------------------------------------------------------------------------------------------------------
// export const isAdmin = (roleId: number) => {
// 	if (roleId == 1) {
// 		return true
// 	} else {
// 		return false
// 	}
// }
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
	filter: (part) => part.mimetype?.startsWith('image/') || false
})
