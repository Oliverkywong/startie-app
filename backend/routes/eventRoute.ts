import express from "express";
import { EventController } from "../controllers/eventController";
import { isBoard } from "../utils/middleware";

export function createEventRoutes(eventController: EventController) {
  const router = express.Router();
  router.get("/event", eventController.getAllEvents);
  router.get("/event/:id", eventController.getEvent);
  router.post("/event", eventController.createEvent);
  router.put("/event/:id", isBoard, eventController.updateEvent);
  return router;
}
