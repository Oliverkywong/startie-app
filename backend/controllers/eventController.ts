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
      res.status(500).json({ message: "Internal server error" });
    }
  };
  // -------------------------------------------------------------------------------------------------------------------
  // get all events ✅
  // -------------------------------------------------------------------------------------------------------------------

  getAllEvents = async (req: Request, res: Response) => {
    try {
      const event = await this.eventService.getAllEvents();
      res.set("x-total-count", String(event.length));
      res.status(200).json(event);
    } catch (err) {
      logger.error(err);
      res.status(500).json({ message: "Internal server error" });
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
      res.status(500).json({ message: "Internal server error" });
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

      const newStatusId = req.body.status_id != null? req.body.status_id : 1;


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
      res.status(500).json({ message: "Internal server error" });
    }
  };
}
