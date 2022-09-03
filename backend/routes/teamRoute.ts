import express from "express";
import { TeamController } from "../controllers/teamController";
import { isBoard } from "../utils/middleware";

export function createTeamRoutes(teamController: TeamController) {
  const router = express.Router();
  router.get("/team", teamController.getAllTeams);
  router.get("/team/:id", teamController.getTeam);
  router.post("/team", teamController.createTeam);
  router.put("/team/:id", isBoard, teamController.updateTeam);
  router.delete("/team/:id", isBoard, teamController.deleteTeam);
  return router;
}
