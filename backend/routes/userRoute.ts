import express from 'express'
import { UserController } from '../controllers/userController'
import { isLogin } from '../utils/middleware'
// import { isLogin } from '../utils/middleware'

export function userRoutes(userController: UserController) {
  const userRoutes = express.Router()

	userRoutes.post('/login/google', userController.loginGoogle)
	userRoutes.post('/login/apple', userController.loginApple)
	userRoutes.post('/register', userController.register)
	userRoutes.post('/login', userController.login)
	userRoutes.get('/user/:id', isLogin, userController.userInfo)  //need to add isLogin
	userRoutes.get('/user/me', isLogin, userController.userInfo) 
	userRoutes.get('/user', userController.getAlluser)
	userRoutes.put('/editUser', userController.editUser) //need to add isLogin
	// userRoutes.post('/logout', userController.logout)

	return userRoutes;
}