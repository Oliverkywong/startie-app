import { TeamService } from "../services/teamService";
import { Request, Response } from "express";
import { logger } from "../utils/logger";

export class TeamController {
  constructor(private teamService: TeamService) {}

  // -------------------------------------------------------------------------------------------------------------------
  // create team
  // -------------------------------------------------------------------------------------------------------------------
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
  // -------------------------------------------------------------------------------------------------------------------
  // get all teams
  // -------------------------------------------------------------------------------------------------------------------
  getAllTeams = async (req: Request, res: Response) => {
    try {
      const team = await this.teamService.getAllTeams();
      res.set("x-total-count", String(team.length));
      res.status(200).json(team);
    } catch (err) {
      logger.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  // -------------------------------------------------------------------------------------------------------------------
  // get one team
  // -------------------------------------------------------------------------------------------------------------------
  getTeam = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const team = await this.teamService.getTeam(id);

      res.status(200).json(team);
    } catch (err) {
      logger.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  // -------------------------------------------------------------------------------------------------------------------
  // edit team
  // -------------------------------------------------------------------------------------------------------------------
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
  // -------------------------------------------------------------------------------------------------------------------
  // delete team
  // -------------------------------------------------------------------------------------------------------------------
  deleteTeam = async (req: Request, res: Response) => {
    try {
      const team = await this.teamService.deleteTeam(
        parseInt(req.params.id),
        2
      );
      res.status(200).json(`team: ${team} has been deleted`);
    } catch (err) {
      logger.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  // -------------------------------------------------------------------------------------------------------------------
  // get all categories
  // -------------------------------------------------------------------------------------------------------------------
  teamTag = async (req: Request, res: Response) => {
    try {
      const teamtag = await this.teamService.teamTag();
      res.status(200).json(teamtag);
    } catch (err) {
      logger.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  // -------------------------------------------------------------------------------------------------------------------
  // get all categories
  // -------------------------------------------------------------------------------------------------------------------
  getCategory = async (req: Request, res: Response) => {
    try {
      const category = await this.teamService.getCategory();
      res.status(200).json(category);
    } catch (err) {
      logger.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  // -------------------------------------------------------------------------------------------------------------------
  // add member to team
  // -------------------------------------------------------------------------------------------------------------------
  addMember = async (req: Request, res: Response) => {
    try {
      const { teamId, userId } = req.body;
      const team = await this.teamService.addMember(teamId, userId);
      res.status(200).json(team);
    } catch (err) {
      logger.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  };
}
