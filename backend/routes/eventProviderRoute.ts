import express from "express";
import { EventProviderController } from "../controllers/eventProviderController";
import { isAdmin } from "../utils/middleware";

export function eventProviderRoutes(eventProviderController: EventProviderController) {
  const router = express.Router();
  // ----------------------------Admin Routes-------------------------------------------------------------------------------
  router.get("/event_provider/:id", isAdmin, eventProviderController.getEventProvider);
  router.post("/event_provider", isAdmin, eventProviderController.createEventProvider);
  router.get("/event_provider", isAdmin, eventProviderController.getAllEventProvidersForAdmin);
  router.put("/event_provider/:id", isAdmin, eventProviderController.updateEventProvidersForAdmin); 
  return router;
}
