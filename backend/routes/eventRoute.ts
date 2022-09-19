import express from "express";
import { EventController } from "../controllers/eventController";
import { isLogin } from "../utils/middleware";

export function eventRoutes(eventController: EventController) {
  const router = express.Router();
  router.get("/event", isLogin, eventController.getAllEvents);
  router.get("/event/:id", eventController.getEvent);
  router.post("/event", eventController.createEvent); // need to add isLogin
  router.put("/event/:id", eventController.updateEvent); // need to add isLogin + isBoard
  return router;
}
