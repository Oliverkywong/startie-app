import express from "express";
import { TeamController } from "../controllers/teamController";
import { isLogin } from "../utils/middleware";

export function teamRoutes(teamController: TeamController) {
  const router = express.Router();
  router.get("/app/team", teamController.getAllTeams);

  router.get("/app/team/:id", teamController.getTeam);
  router.post("/app/team", isLogin,teamController.createTeam); //✅ need to add isLogin, Admin cannot use, disable create team (formidable)
  router.get("/teamtag", teamController.teamTag); 
  router.get("/category", teamController.getCategory); 
  // ----------------------------Admin Routes-------------------------------------------------------------------------------
  router.get("/team", teamController.getAllTeamsForAdmin);
  router.put("/team/:id", teamController.updateTeamForAdmin); // no need isLogin
  return router;
}
