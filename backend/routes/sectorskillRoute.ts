import express from "express";
import { SectorskillController } from "../controllers/sectorskillController";

export function sectorskillRoutes(
  sectorskillController: SectorskillController
) {
  const sectorskillRoute = express.Router();

  sectorskillRoute.get("/skill", sectorskillController.allSectorskill);

  return sectorskillRoute;
}
