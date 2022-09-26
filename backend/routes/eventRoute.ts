import express from "express";
import { EventController } from "../controllers/eventController";
import { isAdmin, isLogin } from "../utils/middleware";

export function eventRoutes(eventController: EventController) {
  const router = express.Router();
  router.get("/app/event", eventController.getAllEvents);
  router.get("/event/:id", eventController.getEvent);
  router.post("/event", isLogin, eventController.createEvent);
  // ----------------------------Admin Routes-------------------------------------------------------------------------------
  router.get("/event", isAdmin, eventController.getAllEventsForAdmin);
  router.put("/event/:id", isAdmin, eventController.updateEventForAdmin);
  return router;
}
