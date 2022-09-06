import { EventService } from "../services/eventService";
import { Request, Response } from "express";

export class EventController {
  constructor(private eventService: EventService) {}

  createEvent = async (req: Request, res: Response) => {
    const fetchData = req.body;
    const event = await this.eventService.createEvent(
      fetchData.name,
      fetchData.description,
      fetchData.profilepic,
      fetchData.starttime
    );
    res.json({ event });
  };

  getAllEvents = async (req: Request, res: Response) => {
    const event = await this.eventService.getAllEvents();
    res.json({ event });
  };

  getEvent = async (req: Request, res: Response) => {
    const event = await this.eventService.getEvent(req.body);
    res.json({ event });
  };

  updateEvent = async (req: Request, res: Response) => {
    const fetchData = req.body;
    const event = await this.eventService.updateEvent(
      parseInt(req.params.id),
      fetchData.name,
      fetchData.description,
      fetchData.profilepic,
      fetchData.starttime
    );
    res.json({ event });
  };
}
