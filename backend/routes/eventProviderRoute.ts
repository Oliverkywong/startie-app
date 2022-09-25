import express from "express";
import { EventProviderController } from "../controllers/eventProviderController";
import { isAdmin } from "../utils/middleware";

export function eventProviderRoutes(eventProviderController: EventProviderController) {
  const router = express.Router();
  //router.get("/app/eventProvider", eventProviderController.getAllEventProviders);
  // ----------------------------Admin Routes-------------------------------------------------------------------------------
  router.get("/event_provider/:id", isAdmin, eventProviderController.getEventProvider);
  router.post("/event_provider", isAdmin, eventProviderController.createEventProvider);
  router.get("/event_provider", isAdmin, eventProviderController.getAllEventProvidersForAdmin); // need isAdmin
  router.put("/event_provider/:id", isAdmin, eventProviderController.updateEventProvidersForAdmin); // need isAdmin
  return router;
}
