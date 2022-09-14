import { TeamService } from "../services/teamService";
import { Request, Response } from "express";
import { logger } from "../utils/logger";

export class TeamController {
  constructor(private teamService: TeamService) {}

  createTeam = async (req: Request, res: Response) => {
    try {
      const { teamName, description, profilepic } = req.body;
      const team = await this.teamService.createTeam(
        teamName,
        description,
        profilepic
      );
      res.status(200).json(team);
    } catch (err) {
      logger.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  getAllTeams = async (req: Request, res: Response) => {
    try {
      const team = await this.teamService.getAllTeams();
      const teamTags = await this.teamService.getAllTeamTags();
      res.status(200).json({ team, teamTags });
    } catch (err) {
      logger.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  getTeam = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const team = await this.teamService.getTeam(id);
      res.status(200).json(team);
    } catch (err) {
      logger.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  updateTeam = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { name, description, profilepic } = req.body;
      const team = await this.teamService.updateTeam(
        parseInt(id),
        name,
        description,
        profilepic
      );
      res.status(200).json(team);
    } catch (err) {
      logger.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  deleteTeam = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const team = await this.teamService.deleteTeam(parseInt(id));
      res.status(200).json(`team: ${team} has been deleted`);
    } catch (err) {
      logger.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  teamTag = async (req: Request, res: Response) => {
    try {
      const teamtag = await this.teamService.teamTag();
      res.status(200).json(teamtag);
    } catch (err) {
      logger.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  };
}
