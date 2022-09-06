import { TeamService } from "../services/teamService";
import { Request, Response } from "express";

export class TeamController {
  constructor(private teamService: TeamService) {}

  createTeam = async (req: Request, res: Response) => {
    const team = await this.teamService.createTeam(req.body);
    res.json({ team });
  };

  getAllTeams = async (req: Request, res: Response) => {
    const team = await this.teamService.getAllTeams();
    res.json({ team });
  };

  getTeam = async (req: Request, res: Response) => {
    const team = await this.teamService.getTeam(req.body);
    res.json({ team });
  };

  updateTeam = async (req: Request, res: Response) => {
    const team = await this.teamService.updateTeam(
      parseInt(req.params.id),
      req.body
    );
    res.json({ team });
  };

  deleteTeam = async (req: Request, res: Response) => {
    const team = await this.teamService.deleteTeam(parseInt(req.params.id));
    res.json({ team });
  };
}
