import express from "express";
import { EventController } from "../controllers/eventController";
import { isBoard, isLogin } from "../utils/middleware";

export function eventRoutes(eventController: EventController) {
  const router = express.Router();
  router.get("/event", eventController.getAllEvents);
  router.get("/event/:id", eventController.getEvent);
  router.post("/event", isLogin, eventController.createEvent);
  router.put("/event/:id", isLogin, isBoard, eventController.updateEvent);
  return router;
}
