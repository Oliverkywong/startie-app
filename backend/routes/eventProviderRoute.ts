import express from "express";
import { EventProviderController } from "../controllers/eventProviderController";

export function eventProviderRoutes(eventProviderController: EventProviderController) {
  const router = express.Router();
//router.get("/app/eventProvider", eventProviderController.getAllEventProviders);
  // ----------------------------Admin Routes-------------------------------------------------------------------------------
  router.get("/event_provider/:id", eventProviderController.getEventProvider);
  router.post("/event_provider", eventProviderController.createEventProvider);
  router.get("/event_provider", eventProviderController.getAllEventProvidersForAdmin); // need isAdmin
  router.put("/event_provider/:id", eventProviderController.updateEventProvidersForAdmin); // need isAdmin
  return router;
}
