import { TeamService } from "../services/teamService";
import { Request, Response } from "express";
import { logger } from "../utils/logger";
import express from "express";
import { form } from "../utils/middleware";
import { TeamListInput } from "../utils/api-types";

export class TeamController {
  constructor(private teamService: TeamService) {}

// -------------------------------------------------------------------------------------------------------------------
// create team
// -------------------------------------------------------------------------------------------------------------------
  createTeam = async (req: express.Request, res: express.Response) => {
    //need to improve, not ready
    console.log("req.origin", req.get("origin"));

    if (req.get("origin") === process.env.REACT_APP_API_URL) {
      //react admin
      try {
        const name = req.body.name;
        const searchcategory = req.body.category_id;
        const description = req.body.description;
        const profilepic = req.body.profilepic;

        const event = await this.teamService.createTeam(
          name,
          searchcategory,
          description,
          profilepic
        );
        res.status(200).json(event);
      } catch (err) {
        logger.error(err);
        res.status(400).json({ result: false, msg: "create team fail" });
      }
    } else {
      form.parse(req, async (err, fields, files) => {
        try {
          const searchcategory =
            fields.category_id != null && !Array.isArray(fields.category_id)
              ? parseInt(fields.category_id)
              : 5; //category_id = 5 is "other"

          const name =
            fields.name != null && !Array.isArray(fields.name)
              ? fields.name
              : "Team X";

          const description =
            fields.description != null && !Array.isArray(fields.description)
              ? fields.description
              : "";

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
        }
      });
    }
  };
// -------------------------------------------------------------------------------------------------------------------
// get all teams for react admin
// -------------------------------------------------------------------------------------------------------------------
  getAllTeamsForAdmin = async (req: Request, res: Response) => {
    try {
      let input:TeamListInput = req.query
      let show = true
      let json = await this.teamService.getAllTeams(input, show);

      res.set("x-total-count", String(json.teams?.rows?.length));
      res.status(200).json(json.teams?.rows);

    } catch (err) {
      logger.error(err);
      res.status(500).json({ error: String(err) });
    }
  }
// -------------------------------------------------------------------------------------------------------------------
// get all teams
// -------------------------------------------------------------------------------------------------------------------
  getAllTeams = async (req: Request, res: Response) => {
    try {
      let input:TeamListInput = req.query
      let show = false
      let json = await this.teamService.getAllTeams(input, show);

      res.status(200).json(json);
    } catch (err) {
      logger.error(err);
      res.status(500).json({ error: String(err) });
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
      res.status(500).json({ result: false, msg: "getTeam fail" });
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

        const searchcategory =
          fields.category_id != null && !Array.isArray(fields.category_id)
            ? parseInt(fields.category_id)
            : oldCategory;

        const name =
          fields.name != null && !Array.isArray(fields.name)
            ? fields.name
            : oldName;

        const description =
          fields.description != null && !Array.isArray(fields.description)
            ? fields.description
            : oldDescription;

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
      }
    });
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
