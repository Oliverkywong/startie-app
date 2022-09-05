import express from "express";
import { JobController } from "../controllers/jobController";
import { isBoard } from "../utils/middleware";

export function createJobRoutes(jobController: JobController) {
  const router = express.Router();
  router.get("/job", jobController.getAllJobs);
  router.get("/job/:id", jobController.getJob);
  router.post("/job", jobController.createJob);
  router.put("/job/:id", isBoard, jobController.updateJob);
  router.delete("/job/:id", isBoard, jobController.deleteJob);
  return router;
}
