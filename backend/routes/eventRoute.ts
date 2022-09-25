import express from "express";
import { EventController } from "../controllers/eventController";
import { isAdmin, isLogin } from "../utils/middleware";

export function eventRoutes(eventController: EventController) {
  const router = express.Router();
  router.get("/app/event", eventController.getAllEvents);
  // router.get("/app/event/?searchcategory_id", eventController.getAllEvents);
  router.get("/event/:id", eventController.getEvent);
  router.post("/event", isLogin, eventController.createEvent);
  // router.put("/app/event/:id", isLogin, eventController.updateEvent); // need to add isLogin + isBoard
  // ----------------------------Admin Routes-------------------------------------------------------------------------------
  router.get("/event", isAdmin, eventController.getAllEventsForAdmin); // need isAdmin
  router.put("/event/:id", isAdmin, eventController.updateEventForAdmin); // need isAdmin
  return router;
}
