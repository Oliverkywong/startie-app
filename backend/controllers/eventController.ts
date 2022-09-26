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
        shortDescription,
        event_provider_id
      } = req.body;

      const event = await this.eventService.createEvent(
        name,
        description,
        maxteammember,
        profilepic,
        starttime,
        shortDescription,
        category_id,
        event_provider_id
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

      res.set("x-total-count", String(json.count));
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
}
