import express from "express";
import { UserController } from "../controllers/userController";
import { isLogin } from "../utils/middleware";
// import { isLogin } from '../utils/middleware'

export function userRoutes(userController: UserController) {
  const userRoutes = express.Router();

  userRoutes.post("/login/google", userController.loginGoogle);
  userRoutes.post("/login/apple", userController.loginApple);
  userRoutes.post("/register", userController.register);
  userRoutes.post("/login", userController.login);
  userRoutes.get("/user/:id", isLogin, userController.userInfo); //need to add isLogin
  userRoutes.get("/user/me", userController.userInfo);
  userRoutes.get("/user", userController.getAllUser);
  userRoutes.put("/editUser", isLogin, userController.editUser); //need to add isLogin
  userRoutes.get("/user/me/team", isLogin, userController.checkTeam);
  userRoutes.put("/user/me/team/:id", isLogin, userController.joinTeam); //user join team
  userRoutes.delete("/user/me/team/:id", isLogin, userController.quitTeam); //user quit team
  userRoutes.put("/user/me/event/:id", isLogin, userController.joinEvent); //user join event
  return userRoutes;
}
