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
      res.status(400).json({ result: false, msg: "crateTeam fail" });
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
      res.status(400).json({ result: false, msg: "getAllTeams fail" });
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
      res.status(400).json({ result: false, msg: "getTeam fail" });
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
      res.status(400).json({ result: false, msg: "updateTeam fail" });
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
      res.status(400).json({ result: false, msg: "deleteTeam fail" });
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
      res.status(400).json({ result: false, msg: "getTeamTag fail" });
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
      res.status(400).json({ result: false, msg: "getCategory fail" });
    }
  };
}
