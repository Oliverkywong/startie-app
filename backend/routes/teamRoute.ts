import express from "express";
import { TeamController } from "../controllers/teamController";
import { isLogin } from "../utils/middleware";

export function teamRoutes(teamController: TeamController) {
  const router = express.Router();
  router.get("/app/team", teamController.getAllTeams); // no need isLogin
  router.get("/team", teamController.getAllTeamsForAdmin); // no need isLogin
  router.get("/team/:id", teamController.getTeam);
  router.post("/team", isLogin,teamController.createTeam); // need to add isLogin
  router.put("/team/:id", isLogin, teamController.updateTeam); // need to add isBoard
  router.get("/teamtag", teamController.teamTag); //show team on profile
  router.get("/category", teamController.getCategory); //show team on profile
  return router;
}
