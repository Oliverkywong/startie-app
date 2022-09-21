import express from "express";
import { EventController } from "../controllers/eventController";
import { isLogin } from "../utils/middleware";

export function eventRoutes(eventController: EventController) {
  const router = express.Router();
  router.get("/app/event", eventController.getAllEvents); // no need isLogin
  router.get("/event", eventController.getAllEventsForAdmin); // no need isLogin
  router.get("/event/:id", eventController.getEvent);
  router.post("/event", isLogin, eventController.createEvent);
  router.put("/event/:id", isLogin, eventController.updateEvent); // need to add isLogin + isBoard
  return router;
}
