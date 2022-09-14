import { EventService } from "../services/eventService";
import { Request, Response } from "express";

export class EventController {
  constructor(private eventService: EventService) {}

  // -------------------------------------------------------------------------------------------------------------------
  // create event ✅
  // -------------------------------------------------------------------------------------------------------------------
  createEvent = async (req: Request, res: Response) => {
    try {
      const { eventName, description, maxteammember, profilepic, starttime } =
        req.body;
      const event = await this.eventService.createEvent(
        eventName,
        description,
        maxteammember,
        profilepic,
        starttime
      );
      res.status(200).json(event);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  // -------------------------------------------------------------------------------------------------------------------
  // get all events ✅
  // -------------------------------------------------------------------------------------------------------------------

  getAllEvents = async (req: Request, res: Response) => {
    try {
      const event = await this.eventService.getAllEvents();
      res.status(200).json(event);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  // -------------------------------------------------------------------------------------------------------------------
  // get one event ✅
  // -------------------------------------------------------------------------------------------------------------------

  getEvent = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const event = await this.eventService.getEvent(id);
      res.status(200).json(event);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  // -------------------------------------------------------------------------------------------------------------------
  // update event ✅
  // -------------------------------------------------------------------------------------------------------------------
  updateEvent = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { eventName, description, maxteammember, profilepic, starttime } =
        req.body;
      const event = await this.eventService.updateEvent(
        parseInt(id),
        eventName,
        description,
        maxteammember,
        profilepic,
        starttime
      );
      res.status(200).json(event);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  };
}
