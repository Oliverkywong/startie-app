import { TeamService } from "../services/teamService";
import { Request, Response } from "express";
import { logger } from "../utils/logger";
import express from "express";
import { form } from "../utils/middleware";

export class TeamController {
  constructor(private teamService: TeamService) {}

  // -------------------------------------------------------------------------------------------------------------------
  // create team
  // -------------------------------------------------------------------------------------------------------------------
  createTeam = async (req: express.Request, res: express.Response) => { //need to improve, not ready
    form.parse(req, async (err, fields, files) => {
    try {
       
      const searchcategory = fields.category_id != null && !Array.isArray(fields.category_id)
      ? parseInt(fields.category_id) : 5 //category_id = 5 is "other"

      const name = fields.name != null && !Array.isArray(fields.name)
      ? fields.name : "Team X"

      const description = fields.description != null && !Array.isArray(fields.description)
      ? fields.description : ""

      const profilepic =
      files.profilepic != null && !Array.isArray(files.profilepic)
        ? files.profilepic.newFilename
        : "default.jpg"; //default use default.jpg
        
      
      const team = await this.teamService.createTeam(
        name,
        searchcategory,
        description,
        profilepic
      );
      res.status(200).json(team);
    } catch (err) {
      logger.error(err);
      res.status(400).json({ result: false, msg: "create team fail" });
    }})
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
      const id = parseInt(req.params.id);
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
  updateTeam = async (req: express.Request, res: express.Response) => {
    form.parse(req, async (err, fields, files) => {
    try {

      const teamId = parseInt(req.params.id);

       const oldTeamInfos = await this.teamService.getTeam(teamId);

       let oldProfilepic = oldTeamInfos.team[0].profilepic!;
       let oldCategory = oldTeamInfos.team[0].searchcategory_id;
       let oldDescription = oldTeamInfos.team[0].description!;
       let oldName = oldTeamInfos.team[0].name;
       
      const searchcategory = fields.category_id != null && !Array.isArray(fields.category_id)
      ? parseInt(fields.category_id) : oldCategory

      const name = fields.name != null && !Array.isArray(fields.name)
      ? fields.name : oldName

      const description = fields.description != null && !Array.isArray(fields.description)
      ? fields.description : oldDescription

      const profilepic =
      files.profilepic != null && !Array.isArray(files.profilepic)
        ? files.profilepic.newFilename
        : oldProfilepic;

      const team = await this.teamService.updateTeam(
        teamId,
        searchcategory,
        name,
        description,
        profilepic
      );
      res.status(200).json(team);
    } catch (err) {
      logger.error(err);
      res.status(400).json({ result: false, msg: "updateTeam fail" });
    }})
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
