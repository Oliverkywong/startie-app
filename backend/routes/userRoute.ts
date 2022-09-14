import express from 'express'
import { UserController } from '../controllers/userController'
// import { isLogin } from '../utils/middleware'

export function userRoutes(userController: UserController) {
  const userRoutes = express.Router()

	// userRoutes.get('/login/google', userController.loginGoogle)
	userRoutes.post('/register', userController.register)
	userRoutes.post('/login', userController.login)
	userRoutes.get('/user/:id', userController.userInfo)  //need to add isLogin
	userRoutes.get('/user', userController.getAlluser)
	userRoutes.put('/editUser', userController.editUser) //need to add isLogin
	// userRoutes.post('/logout', userController.logout)

	return userRoutes;
}