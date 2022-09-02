import express from "express"
import { TeamController } from "../controllers/teamController"

export function createTeamRoutes(teamController: TeamController) {
    const router = express.Router()
    router.get('/teams', teamController.getAllTeams)
    router.get('/teams/:id', teamController.getTeam)
    router.post('/teams', teamController.createTeam)
    router.put('/teams/:id', teamController.updateTeam)
    router.delete('/teams/:id', teamController.deleteTeam)
    return router
}