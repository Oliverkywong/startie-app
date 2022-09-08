import express from "express";
import { SectorskillController } from "../controllers/sectorskillController";
import { isLogin } from "../utils/middleware";



export function sectorskillRoutes(sectorskillController:SectorskillController) {
    const sectorskillRoute = express.Router();

    sectorskillRoute.get('/skill', isLogin, sectorskillController.allSectorskill)

    return sectorskillRoute;
}