import express from "express";
import { TeamController } from "../controllers/teamController";
// import { isBoard, isLogin } from "../utils/middleware";

export function teamRoutes(teamController: TeamController) {
  const router = express.Router();
  router.get("/team", teamController.getAllTeams);
  router.get("/team/:id", teamController.getTeam);
  router.post("/team", teamController.createTeam); // need to add isLogin
  router.put("/team/:id", teamController.updateTeam); // need to add isBoard
  // router.delete("/team/:id", isBoard, teamController.deleteTeam);
  router.get("/teamtag", teamController.teamTag); //show team on profile
  router.get("/category", teamController.getCategory); //show team on profile
  router.put("/team/:id/user/:id", teamController.addMember); //add member to team
  return router;
}
