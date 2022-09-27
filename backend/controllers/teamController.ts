import { TeamService } from "../services/teamService";
import { Request, Response } from "express";
import { logger } from "../utils/logger";
import express from "express";
import { TeamListInput } from "../utils/api-types";

export class TeamController {
  constructor(private teamService: TeamService) {}

  // -------------------------------------------------------------------------------------------------------------------
  // create team
  // -------------------------------------------------------------------------------------------------------------------
  createTeam = async (req: express.Request, res: express.Response) => {
    try {
      const userId = req.user!.userId;
      const searchcategory = parseInt(req.body.data.teamcategory);
      const name = req.body.data.teamName;
      const shortDescription = req.body.data.teamshortDescription;
      const description = req.body.data.teamDescription;
      const profilepic = req.body.img ? req.body.img : "tonystarkicon.png"
      const looking = parseInt(req.body.data.teamlooking ? req.body.data.teamlooking : 1);

      const team = await this.teamService.createTeam(
        userId,
        name,
        searchcategory,
        shortDescription,
        looking,
        description,
        profilepic,
        
      );
      res.status(200).json(team.teamInfo);
    } catch (err) {
      logger.error(err);
      res.status(400).json({ result: false, msg: "create team fail" });
    }
  };
  // -------------------------------------------------------------------------------------------------------------------
  // create team for Admin
  // -------------------------------------------------------------------------------------------------------------------
  createTeamForAdmin = async (req: express.Request, res: express.Response) => {
    try {
      const userId = req.body.user_id;

      let { name, category_id, description, shortDescription } = req.body;

      const team = await this.teamService.createTeam(
        userId,
        name,
        category_id,
        shortDescription,
        description
      );
      res.status(200).json(team.teamInfo);
    } catch (err) {
      logger.error(err);
      res.status(400).json({ result: false, msg: "create team fail" });
    }
  };
  // -------------------------------------------------------------------------------------------------------------------
  // get all teams for react admin
  // -------------------------------------------------------------------------------------------------------------------
  getAllTeamsForAdmin = async (req: Request, res: Response) => {
    try {
      let input: TeamListInput = req.query;
      let show = true;
      let json = await this.teamService.getAllTeams(input, show);

      res.set("x-total-count", String(json.count));
      res.status(200).json(json.teams);
    } catch (err) {
      logger.error(err);
      res.status(500).json({ error: String(err) });
    }
  };
  // -------------------------------------------------------------------------------------------------------------------
  // get all teams for app
  // -------------------------------------------------------------------------------------------------------------------
  getAllTeams = async (req: Request, res: Response) => {
    try {
      let input: TeamListInput = req.query;
      let show = false;
      let json = await this.teamService.getAllTeams(input, show);

      res.status(200).json(json);
    } catch (err) {
      logger.error(err);
      res.status(500).json({ error: String(err) });
    }
  };
  // -------------------------------------------------------------------------------------------------------------------
  // get one team for app
  // -------------------------------------------------------------------------------------------------------------------
  getTeam = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const team = await this.teamService.getTeam(id);

      res.status(200).json(team);
    } catch (err) {
      logger.error(err);
      res.status(500).json({ result: false, msg: "getTeam fail" });
    }
  };
  // -------------------------------------------------------------------------------------------------------------------
  // get one team for Admin
  // -------------------------------------------------------------------------------------------------------------------
  getTeamForAdmin = async (req: Request, res: Response) => {
    try {
      const teamId = parseInt(req.params.id);
      const team = await this.teamService.getTeamForAdmin(teamId);

      res.status(200).json(team.team[0]);
    } catch (err) {
      logger.error(err);
      res.status(500).json({ result: false, msg: "getTeam fail" });
    }
  };
  // -------------------------------------------------------------------------------------------------------------------
  // edit team for admin
  // -------------------------------------------------------------------------------------------------------------------
  updateTeamForAdmin = async (req: express.Request, res: express.Response) => {
    try {
      const teamId = parseInt(req.params.id);

      const input: TeamListInput = req.body;

      const team = await this.teamService.updateTeam(teamId, input);
      res.status(200).json({
        data: team,
        id: team[0].id,
      });
    } catch (err) {
      logger.error(err);
      res.status(500).json({ result: false, msg: "update team fail" });
    }
  };
  // -------------------------------------------------------------------------------------------------------------------
  // get tags of team
  // -------------------------------------------------------------------------------------------------------------------
  teamTag = async (req: Request, res: Response) => {
    try {
      const teamtag = await this.teamService.teamTag();
      res.status(200).json(teamtag);
    } catch (err) {
      logger.error(err);
      res.status(500).json({ result: false, msg: "get team tag fail" });
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
      res.status(500).json({ result: false, msg: "get all category fail" });
    }
  };

  // -------------------------------------------------------------------------------------------------------------------
  // get all tags
  // -------------------------------------------------------------------------------------------------------------------
  getAllTag = async (req: Request, res: Response) => {
    try {
      const tags = await this.teamService.getAllTag();
      res.status(200).json(tags);
    } catch (err) {
      logger.error(err);
      res.status(500).json({ result: false, msg: "get all tag fail" });
    }
  };
}
