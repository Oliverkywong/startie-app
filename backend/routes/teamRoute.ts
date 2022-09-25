import express from "express";
import { TeamController } from "../controllers/teamController";
import { isAdmin, isLogin } from "../utils/middleware";

export function teamRoutes(teamController: TeamController) {
  const router = express.Router();
  router.get("/app/team", teamController.getAllTeams);

  router.get("/app/team/:id", teamController.getTeam); //error when not logged in
  router.post("/app/team", isLogin,teamController.createTeam); //✅ need to add isLogin
  router.get("/teamtag", teamController.teamTag); 
  router.get("/category", teamController.getCategory); 
  // ----------------------------Admin Routes-------------------------------------------------------------------------------
  router.get("/team", isAdmin, teamController.getAllTeamsForAdmin);
  router.post("/team", isAdmin, teamController.createTeamForAdmin);
  router.get("/team/:id", isAdmin, teamController.getTeamForAdmin);
  router.put("/team/:id", isAdmin, teamController.updateTeamForAdmin);
  return router;
}
