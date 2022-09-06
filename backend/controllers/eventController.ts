import { EventService } from "../services/eventService";
import { Request, Response } from "express";

export class EventController {
  constructor(private eventService: EventService) {}

  getAllEvents = async (req: Request, res: Response) => {
    const event = await this.eventService.getAllEvents();
    res.json({ event });
  };

  createEvent = async (req: Request, res: Response) => {
    const event = await this.eventService.createEvent(req.body);
    res.json({ event });
  };

  getEvent = async (req: Request, res: Response) => {
    const event = await this.eventService.getEvent(req.body);
    res.json({ event });
  };

  updateEvent = async (req: Request, res: Response) => {
    const event = await this.eventService.updateEvent(
      parseInt(req.params.id),
      req.body
    );
    res.json({ event });
  };
}
