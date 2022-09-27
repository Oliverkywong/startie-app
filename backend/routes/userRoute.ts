import express from "express";
import { UserController } from "../controllers/userController";
import { isAdmin, isLogin } from "../utils/middleware";

export function userRoutes(userController: UserController) {
  const userRoutes = express.Router();

  userRoutes.post("/login/google", userController.loginGoogle);
  userRoutes.post("/login/apple", userController.loginApple);
  userRoutes.post("/user", userController.register);
  userRoutes.post("/login", userController.login);
  userRoutes.get("/app/user", userController.getAllUser);
  userRoutes.get("/app/user/me", isLogin, userController.userInfo);
  userRoutes.get("/app/user/:id", userController.userInfoById);
  userRoutes.put("/app/user/:id", isLogin, userController.editUser);
  // -----------------------------------------------------------------------------------------------------------------------
  userRoutes.get("/user/me/team", isLogin, userController.checkTeam); // user/team/checkteam?user"
  userRoutes.get("/user/me/event", isLogin, userController.checkEvent);
  userRoutes.get("/user/team/:id", userController.otherUserTeam);
  userRoutes.get("/user/event/:id", userController.otherUserEvent);
  userRoutes.post("/user/me/team/:teamId", isLogin, userController.joinTeam); //user join team
  userRoutes.delete("/user/me/team/:teamId", isLogin, userController.quitTeam); //user quit team
  userRoutes.post("/user/me/event/:id", isLogin, userController.joinEvent); //user join event
  userRoutes.delete("/user/me/event/:id", isLogin, userController.quitEvent); //user quit event
  userRoutes.get("/user/me/note", isLogin, userController.getNotification);
  // ----------------------------Admin Routes-------------------------------------------------------------------------------
  userRoutes.get("/user/:id", isAdmin, userController.userInfoForAdmin);
  userRoutes.put("/user/:id", isAdmin, userController.editUserForAdmin);
  userRoutes.get("/user", isAdmin, userController.getAllUserForAdmin);
  return userRoutes;
}
