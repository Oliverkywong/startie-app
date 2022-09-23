import { EventProviderService } from "../services/eventProviderService";
import { Request, Response } from "express";
import { logger } from "../utils/logger";
import express from "express";
import { EventProviderListInput } from "../utils/api-types";

export class EventProviderController {
  constructor(private eventProviderService: EventProviderService) {}

  // -------------------------------------------------------------------------------------------------------------------
  // create event provider
  // -------------------------------------------------------------------------------------------------------------------
  createEventProvider = async (req: Request, res: Response) => {
    try {
      const { name, profile_pic } = req.body;

      const eventProvider = await this.eventProviderService.createEventProvider(
        name,
        profile_pic
      );
      res.status(200).json(eventProvider);
    } catch (err) {
      logger.error(err);
      res.status(500).json({ result: false, msg: "Create event provider fail" });
    }
  };
  // -------------------------------------------------------------------------------------------------------------------
  // get all event provider for react admin
  // -------------------------------------------------------------------------------------------------------------------
  getAllEventProvidersForAdmin = async (req: Request, res: Response) => {
    try {

      let input:EventProviderListInput = req.query
      let json = await this.eventProviderService.getAllEventProvidersForAdmin(input);
      
      res.set("x-total-count", String(json.event_provider?.length));
      res.status(200).json(json.event_provider);
    } catch (err) {
      logger.error(err);
      res.status(500).json({ error: String(err) });
    }
  }
  // -------------------------------------------------------------------------------------------------------------------
  // get all events
  // -------------------------------------------------------------------------------------------------------------------
//   getAllEventProviders = async (req: Request, res: Response) => {
//     try {

//       // let show;
//       // const name = req.query.name as string != undefined ? req.query.name as string : req.query.q as string;
//       // const description = req.query.description as string;
//       // const status:any = req.query.status_id;
//       // const maxTeammember = parseInt(String(req.query.maxteammember));

//       let input:EventListInput = req.query
//       let show = false
//       let json = await this.eventService.getAllEvents(input, show);

//       res.status(200).json(json);
//     } catch (err) {
//       logger.error(err);
//       res.status(500).json({ error: String(err) });
//     }
//   };
// -------------------------------------------------------------------------------------------------------------------
// get an event provider
// -------------------------------------------------------------------------------------------------------------------
  getEventProvider = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const eventProvider = await this.eventProviderService.getEventProvider(id);
      res.status(200).json(eventProvider[0]); //加咗[0] for react admin
    } catch (err) {
      logger.error(err);
      res.status(500).json({ result: false, msg: "get Event provider fail" });
    }
};
  // -------------------------------------------------------------------------------------------------------------------
  // update event for admin
  // -------------------------------------------------------------------------------------------------------------------
  updateEventProvidersForAdmin = async (req: express.Request, res: express.Response) => {
    try {
      const eventProviderId = req.params.id;

      const input:EventProviderListInput = req.body;

      const eventProvider = await this.eventProviderService.updateEventProvidersForAdmin(
        parseInt(eventProviderId),
        input
      );
      res.status(200).json({ //for react admin, otherwise dataProvider will throw error
        id: eventProvider[0].id,
        data:eventProvider[0]
      });
    } catch (err) {
      logger.error(err);
      res.status(500).json({ error: String(err) });
    }
  }
}