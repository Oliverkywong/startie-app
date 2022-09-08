import { EventService } from "../services/eventService";
import { Request, Response } from "express";

export class EventController {
  constructor(private eventService: EventService) {}

  createEvent = async (req: Request, res: Response) => {
    try {
      const { eventName, description, profilepic, starttime } = req.body;
      const event = await this.eventService.createEvent(
        eventName,
        description,
        profilepic,
        starttime
      );
      res.status(200).json(event);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  getAllEvents = async (req: Request, res: Response) => {
    try {
      const event = await this.eventService.getAllEvents();
      res.status(200).json(event);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  getEvent = async (req: Request, res: Response) => {
    try {
      const { eventName } = req.params;
      const event = await this.eventService.getEvent(eventName);
      res.status(200).json(event);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  updateEvent = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { eventName, description, profilepic, starttime } = req.body;
      const event = await this.eventService.updateEvent(
        parseInt(id),
        eventName,
        description,
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
