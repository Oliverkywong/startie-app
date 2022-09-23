import { EventService } from "../services/eventService";
import { Request, Response } from "express";
import { logger } from "../utils/logger";
import express from "express";
import { EventListInput } from "../utils/api-types";

export class EventController {
  constructor(private eventService: EventService) {}

  // -------------------------------------------------------------------------------------------------------------------
  // create event ✅
  // -------------------------------------------------------------------------------------------------------------------
  createEvent = async (req: Request, res: Response) => {
    try {
      const {
        name,
        description,
        maxteammember,
        profilepic,
        starttime,
        category_id,
      } = req.body;

      const event = await this.eventService.createEvent(
        name,
        description,
        maxteammember,
        profilepic,
        starttime,
        category_id
      );
      res.status(200).json(event);
    } catch (err) {
      logger.error(err);
      res.status(500).json({ result: false, msg: "create Event fail" });
    }
  };
  // -------------------------------------------------------------------------------------------------------------------
  // get all events for react admin
  // -------------------------------------------------------------------------------------------------------------------
  getAllEventsForAdmin = async (req: Request, res: Response) => {
    try {
      let input: EventListInput = req.query;
      let show = true;
      let json = await this.eventService.getAllEvents(input, show);

      res.set("x-total-count", String(json.events?.length));
      res.status(200).json(json.events);
    } catch (err) {
      logger.error(err);
      res.status(500).json({ error: String(err) });
    }
  };
  // -------------------------------------------------------------------------------------------------------------------
  // get all events
  // -------------------------------------------------------------------------------------------------------------------
  getAllEvents = async (req: Request, res: Response) => {
    try {
      // let show;
      // const name = req.query.name as string != undefined ? req.query.name as string : req.query.q as string;
      // const description = req.query.description as string;
      // const status:any = req.query.status_id;
      // const maxTeammember = parseInt(String(req.query.maxteammember));

      let input: EventListInput = req.query;
      let show = false;
      let json = await this.eventService.getAllEvents(input, show);

      res.status(200).json(json);
    } catch (err) {
      logger.error(err);
      res.status(500).json({ error: String(err) });
    }
  };
  // -------------------------------------------------------------------------------------------------------------------
  // get an event
  // -------------------------------------------------------------------------------------------------------------------
  getEvent = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const event = await this.eventService.getEvent(id);
      res.status(200).json(event[0]); //加咗[0] for react admin
    } catch (err) {
      logger.error(err);
      res.status(500).json({ result: false, msg: "getEvent fail" });
    }
  };
  // -------------------------------------------------------------------------------------------------------------------
  // update event for admin
  // -------------------------------------------------------------------------------------------------------------------
  updateEventForAdmin = async (req: express.Request, res: express.Response) => {
    try {
      const eventId = req.params.id;

      const input: EventListInput = req.body;

      const event = await this.eventService.updateEventForAdmin(
        parseInt(eventId),
        input
      );
      res.status(200).json({
        //for react admin, otherwise dataProvider will throw error
        id: event[0].id,
        data: event[0],
      });
    } catch (err) {
      logger.error(err);
      res.status(500).json({ error: String(err) });
    }
  };
  // // -------------------------------------------------------------------------------------------------------------------
  // // update event (if have time then try to use formidable)
  // // -------------------------------------------------------------------------------------------------------------------
  // updateEvent = async (req: express.Request, res: express.Response) => {
  //   try{
  //   form.parse(req, async (err, fields, files) => {
  //     const id = req.params.id;

  //     const eventInfos = await this.eventService.getEvent(id);
  //         let oldProfilepic = eventInfos[0].profilepic!;
  //         let oldName = eventInfos[0].name!;
  //         let oldDescription = eventInfos[0].description!;
  //         let OldMaxTeamMember = eventInfos[0].maxteammember!;
  //         let oldStarttime = eventInfos[0].starttime!;

  //     const name = fields.name != null && !Array.isArray(fields.name)
  //     ? fields.name
  //     : oldName

  //     const description = fields.description != null && !Array.isArray(fields.description)
  //     ? fields.description
  //     : oldDescription

  //     const maxteammember = fields.maxteammember != null && !Array.isArray(fields.maxteammember)
  //     ? parseInt(fields.maxteammember)
  //     : OldMaxTeamMember

  //     const profilepic = files.profilepic != null && !Array.isArray(files.profilepic)
  //     ? files.profilepic.newFilename
  //     : oldProfilepic;

  //     const starttime = fields.starttime != null && !Array.isArray(fields.starttime)
  //     ? fields.starttime
  //     : oldStarttime;

  //     const newStatusId = req.body.status_id != null ? req.body.status_id : 1;

  //     const event = await this.eventService.updateEvent(
  //       parseInt(id),
  //       name,
  //       description,
  //       maxteammember,
  //       profilepic,
  //       starttime,
  //       newStatusId
  //     );
  //     res.status(200).json(event);
  //   })
  // }
  //   catch (err) {
  //     logger.error(err);
  //     res.status(400).json({ result: false, msg: "updateEvent fail" });
  //   }
  // }
}
