import express from "express";
import { EventController } from "../controllers/eventController";
import { isLogin } from "../utils/middleware";

export function eventRoutes(eventController: EventController) {
  const router = express.Router();
  router.get("/app/event", eventController.getAllEvents);
  router.get("/app/event/?=category_id", eventController.getAllEvents);
  router.get("/event/:id", eventController.getEvent);
  router.post("/event", isLogin, eventController.createEvent);
  // router.put("/app/event/:id", isLogin, eventController.updateEvent); // need to add isLogin + isBoard
  // ----------------------------Admin Routes-------------------------------------------------------------------------------
  router.get("/event", eventController.getAllEventsForAdmin); // need isAdmin
  router.put("/event/:id", isLogin, eventController.updateEventForAdmin); // need isAdmin
  return router;
}
