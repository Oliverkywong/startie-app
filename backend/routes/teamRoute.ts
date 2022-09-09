import express from "express";
import { TeamController } from "../controllers/teamController";
import { isBoard, isLogin } from "../utils/middleware";

export function teamRoutes(teamController: TeamController) {
  const routes = express.Router();
  routes.get("/team", teamController.getAllTeams);
  routes.get("/team/:id", teamController.getTeam);
  routes.post("/team", isLogin, teamController.createTeam);
  routes.put("/team/:id", isLogin, isBoard, teamController.updateTeam);
  routes.delete("/team/:id", isLogin, isBoard, teamController.deleteTeam);
  return routes;
}
