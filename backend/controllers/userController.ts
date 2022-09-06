import express from 'express'
import { form } from '../utils/middleware'
import { logger } from '../utils/logger'
import {
	UserDuplicateEmailError,
	UserDuplicateUsernameError,
	UserMissingRegisterInfoError,
	UserNotExistError,
	UserPasswordMissMatchError,
	UserService,
	UserStatusError
} from '../services/userService'
import jwtSimple from "jwt-simple";

export class UserController {
	constructor(
		private userService: UserService
	) {}
// -------------------------------------------------------------------------------------------------------------------
// Google Login
// -------------------------------------------------------------------------------------------------------------------

	// loginGoogle = async (req: express.Request, res: express.Response) => {
	// 	const accessToken = req.session?.['grant'].response.access_token
	// 	const [user, username] = await this.userService.loginGoogle(accessToken)

	// 	if (req.session) {
	// 		req.session['isLogin'] = true
	// 		req.session['user'] = user
	// 		res.json({ result: true, msg: 'google login success' })
	// 		logger.info(`${username} logged in`)
	// 		return
	// 	}
	// 	return res.json({ result: false, msg: 'google login error' })
	// }
// -------------------------------------------------------------------------------------------------------------------
// Register ✅
// -------------------------------------------------------------------------------------------------------------------
	register = async (req: express.Request, res: express.Response) => {
		try {
			let username = req.body.username.trim()
			let password = req.body.password.trim()
			let email = req.body.email.trim()
			const statusId = 1

			await this.userService.register(
				username,
				password,
				email,
				statusId
			)
			return res.status(200).json({ result: true, msg: 'register success' })

		} catch (err) {
			if (err instanceof UserDuplicateUsernameError) {
				return res
					.status(500)
					.json({ result: false, msg: 'username already exists' })
			}

			if (err instanceof UserDuplicateEmailError) {
				return res
					.status(500)
					.json({ result: false, msg: 'email already exists' })
			}

			if (err instanceof UserMissingRegisterInfoError) {
				return res
					.status(500)
					.json({ result: false, msg: 'missing register info' })
			}

			logger.error(err)
			return res.status(500).json({ result: false, msg: 'register error' })			
		}
	}
	
// -------------------------------------------------------------------------------------------------------------------
// LOGIN ✅
// -------------------------------------------------------------------------------------------------------------------
	login = async (req: express.Request, res: express.Response) => {
		try {
			let username = req.body.username.trim()
			let password = req.body.password.trim()
			let user = await this.userService.login(username, password)
			let token = jwtSimple.encode(
				{userId: user[0].id,
				 username: user[0].username}, "key"
			)

			logger.info(`${username} logged in`)
			return res.json({
				result: true,
				msg: 'login success',
				user: user[0],
				token: token
			})

		} catch (err) {

			if (err instanceof UserNotExistError) {
				return res
					.status(500)
					.json({ result: false, msg: 'username not exist' })
			}

			if (err instanceof UserPasswordMissMatchError) {
				return res
					.status(500)
					.json({ result: false, msg: 'password miss match' })
			}

			if (err instanceof UserStatusError) {
				return res
					.status(500)
					.json({ result: false, msg: 'The user is not active' })
			}

			logger.error(err)
			return res.status(500).json({ result: false, msg: 'login error' })
		}
	}
// -------------------------------------------------------------------------------------------------------------------
// get User Info
// -------------------------------------------------------------------------------------------------------------------
	userInfo = async (req: express.Request, res: express.Response) => {
		try {

			const userId =  req.user!.userId   // get userId from JWT
			const userInfo = await this.userService.userInfo(userId)
			return res.json({
				result: true,
				msg: 'Get user profile success',
				userInfo: userInfo
				
			})
		} catch (err) {
			logger.error(err)
			return res.json({ result: false, msg: 'Get user profile fail' })
		}
	}
// -------------------------------------------------------------------------------------------------------------------
// edit User Info
// -------------------------------------------------------------------------------------------------------------------

	editUser = async (req: express.Request, res: express.Response) => {
		form.parse(req, async (err, fields, files) => {
			try {
				const userId = req.user!.userId  // get userId from JWT
				
				const userInfos = await this.userService.userInfo(userId)
				let oldProfilepic = userInfos[0].profilepic
				let oldPhoneNumber = userInfos[0].phonenumber
				let oldDescription = userInfos[0].description
				console.log(userInfos);
				

				const newProfilepic =
					files.profilepic != null && !Array.isArray(files.profilepic)
						? files.profilepic.newFilename
						: oldProfilepic
						
				const newPhoneNumber =
						fields.phonenumber != null && !Array.isArray(fields.phonenumber)
							? fields.phonenumber.trim()
							: oldPhoneNumber

				const newDescription =
							fields.description != null && !Array.isArray(fields.description)
								? fields.description
								: oldDescription

				const userInfo = await this.userService.editUser(
					userId,
					newProfilepic,
					newPhoneNumber,
					newDescription
				)
				return res.json({
					result: true,
					msg: 'Edit user profile success',
					userInfo
				})
			} catch (err) {
				logger.error(err)
				return res.json({
					result: false,
					msg: 'Edit user profile fail'
				})
			}
		})
	}
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
}
