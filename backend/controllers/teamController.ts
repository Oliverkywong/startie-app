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
      const { teamName, description, profilepic, team_tag } = req.body; //must include tags when create
      const team = await this.teamService.createTeam(
        teamName,
        team_tag,
        description,
        profilepic
      );
      res.status(200).json(team);
    } catch (err) {
      logger.error(err);
      res.status(400).json({ result: false, msg: "create team fail" });
    }
  };
  // -------------------------------------------------------------------------------------------------------------------
  // get all teams
  // -------------------------------------------------------------------------------------------------------------------
  getAllTeams = async (req: Request, res: Response) => {
    try {
      const domain = req.get('origin')

      let show;
      const name = req.query.name as string != undefined ? req.query.name as string : req.query.q as string;
      const description = req.query.description as string;
      const status = req.query.status as string;
      const tags = req.query.tags as string;

      let allTeamInfo:any

      switch (domain) {
        case 'http://localhost:3000': // !!!!! remember to change to react admin domain when deploy
          show = false
          allTeamInfo = await this.teamService.getAllTeams(name, description, status, tags, show)
          break; 
        case 'http://localhost:3001': // !!!!! remember to change to frontend domain when deploy
          show = true
          allTeamInfo = await this.teamService.getAllTeams(name, description, status, tags, show)
          break;
      }
      
      res.set("x-total-count", String(allTeamInfo.length));
      res.status(200).json(allTeamInfo);
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
