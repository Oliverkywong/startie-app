import express from "express";
import { UserController } from "../controllers/userController";
import { isLogin } from "../utils/middleware";

export function userRoutes(userController: UserController) {
  const userRoutes = express.Router();

  userRoutes.post("/login/google", userController.loginGoogle);
  userRoutes.post("/login/apple", userController.loginApple);
  userRoutes.post("/user", userController.register);
  userRoutes.post("/login", userController.login);
  userRoutes.get("/app/user/:id", userController.userInfoById);
  userRoutes.get("/app/user/me", userController.userInfo);
  userRoutes.get("/app/user", userController.getAllUser);
  userRoutes.get("/user/team/:id", userController.otheruserTeam);
  userRoutes.post("/logout", isLogin, userController.logout);
  userRoutes.put("/app/user/:id", isLogin, userController.editUser); //need to add isLogin
  // -----------------------------------------------------------------------------------------------------------------------
  userRoutes.get("/user/me/team", isLogin, userController.checkTeam); /// user/team/checkteam?user"
  userRoutes.post("/user/me/team/:teamid", isLogin, userController.joinTeam); //user join team
  userRoutes.delete("/user/me/:teamid", isLogin, userController.quitTeam); //user quit team
  userRoutes.post("/user/me/event/:id", isLogin, userController.joinEvent); //user join event
  userRoutes.get("/user/me/note", isLogin, userController.getNotification);
  // ----------------------------Admin Routes-------------------------------------------------------------------------------
  userRoutes.get("/user/:id", userController.userInfoForAdmin);
  userRoutes.put("/user/:id", userController.editUserForAdmin);
  userRoutes.get("/user", userController.getAllUserForAdmin); //need to add isLogin
  return userRoutes;
}
