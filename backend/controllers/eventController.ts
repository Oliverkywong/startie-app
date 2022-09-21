import { EventService } from "../services/eventService";
import { Request, Response } from "express";
import { logger } from "../utils/logger";

export class EventController {
  constructor(private eventService: EventService) {}

  // -------------------------------------------------------------------------------------------------------------------
  // create event ✅
  // -------------------------------------------------------------------------------------------------------------------
  createEvent = async (req: Request, res: Response) => {
    try {
      const { name, description, maxteammember, profilepic, starttime } =
        req.body;
      const event = await this.eventService.createEvent(
        name,
        description,
        maxteammember,
        profilepic,
        starttime
      );
      res.status(200).json(event);
    } catch (err) {
      logger.error(err);
      res.status(500).json({ result: false, msg: "creatEvent fail" });
    }
  };
  // -------------------------------------------------------------------------------------------------------------------
  // get all events ✅
  // -------------------------------------------------------------------------------------------------------------------

  getAllEvents = async (req: Request, res: Response) => {
    try {
      const domain = req.get('origin')

      let show;
      const name = req.query.name as string != undefined ? req.query.name as string : req.query.q as string;
      const description = req.query.description as string;
      const status:any = req.query.status_id;
      const maxTeammember = parseInt(String(req.query.maxteammember));

      let allEventInfo:any

      switch (domain) {
        case 'http://localhost:3001': // !!!!! remember to change to react admin domain when deploy
          show = false
          allEventInfo = await this.eventService.getAllEvents(name, description, status, maxTeammember, show)
          break; 
        case 'http://localhost:3000': // !!!!! remember to change to frontend domain when deploy
          show = true
          allEventInfo = await this.eventService.getAllEvents(name, description, status, maxTeammember, show)
          break;
      }
      
      res.set("x-total-count", String(allEventInfo.length));
      res.status(200).json(allEventInfo);
    } catch (err) {
      logger.error(err);
      res.status(500).json({ result: false, msg: "getAllEvents fail" });
    }
  };
  // -------------------------------------------------------------------------------------------------------------------
  // get one event ✅
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
  // update event ✅
  // -------------------------------------------------------------------------------------------------------------------
  updateEvent = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { name, description, maxteammember, profilepic, starttime } =
        req.body;

        console.log(req.body);
        

      const newStatusId = req.body.status_id != null ? req.body.status_id : 1;

      const event = await this.eventService.updateEvent(
        parseInt(id),
        name,
        description,
        maxteammember,
        profilepic,
        starttime,
        newStatusId
      );
      res.status(200).json(event);
    } catch (err) {
      logger.error(err);
      res.status(400).json({ result: false, msg: "updateEvent fail" });
    }
  };
}
