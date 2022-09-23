import express from "express";
import { JobController } from "../controllers/jobController";
import { isLogin } from "../utils/middleware";

export function jobRoutes(jobController: JobController) {
  const router = express.Router();
  router.get("/job", jobController.getAllJobs);
  router.get("/job/:id", jobController.getJob);
  router.post("/job", isLogin, jobController.createJob);
  router.put("/job/:id", isLogin, jobController.updateJob);
  router.delete("/job/:id", isLogin, jobController.deleteJob);
  return router;
}
