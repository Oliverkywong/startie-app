import express from 'express'
import { UserController } from '../controllers/userController'
import { isLogin } from '../utils/middleware'

export function userRoutes(userController: UserController) {
  const userRoutes = express.Router()

	// userRoutes.get('/login/google', userController.loginGoogle)
	userRoutes.post('/login/apple', userController.loginApple)
	userRoutes.post('/register', userController.register)
	userRoutes.post('/login', userController.login)
	userRoutes.get('/userInfo',isLogin, userController.userInfo)
	userRoutes.patch('/editUser',isLogin, userController.editUser)
	userRoutes.get('/user', userController.getAllUsers)
	// userRoutes.post('/logout', userController.logout)

	return userRoutes;
}