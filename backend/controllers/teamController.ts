import { TeamService } from "../services/teamService";
import { Request, Response } from "express";

export class TeamController {
  constructor(private teamService: TeamService) {}

  createTeam = async (req: Request, res: Response) => {
    try {
      const { teamName, description } = req.body;
      const team = await this.teamService.createTeam(teamName, description);
      res.status(200).json(team);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  getAllTeams = async (req: Request, res: Response) => {
    try {
      const team = await this.teamService.getAllTeams();
      res.status(200).json(team);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  getTeam = async (req: Request, res: Response) => {
    try {
      const { teamName } = req.params;
      const team = await this.teamService.getTeam(teamName);
      res.status(200).json(team);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  updateTeam = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { teamName, description, profilepic } = req.body;
      const team = await this.teamService.updateTeam(
        parseInt(id),
        teamName,
        description,
        profilepic
      );
      res.status(200).json(team);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  deleteTeam = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const team = await this.teamService.deleteTeam(parseInt(id));
      res.status(200).json(`team: ${team} has been deleted`);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  };
}
