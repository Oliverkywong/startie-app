import { JobService } from "../services/jobService";
import { Request, Response } from "express";

export class JobController {
  constructor(private jobService: JobService) {}

  createJob = async (req: Request, res: Response) => {
    try {
      const { jobName, description } = req.body;
      const job = await this.jobService.createJob(jobName, description);
      res.status(200).json(job);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  getJob = async (req: Request, res: Response) => {
    try {
      const { jobName } = req.params;
      const job = await this.jobService.getJob(jobName);
      res.json(job);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  getAllJobs = async (req: Request, res: Response) => {
    try {
      const job = await this.jobService.getAllJobs();
      res.json(job);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  updateJob = async (req: Request, res: Response) => {
    try {
      const { jobId } = req.params;
      const { jobName, description } = req.body;
      const job = await this.jobService.updateJob(
        parseInt(jobId),
        jobName,
        description
      );
      res.json(job);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  deleteJob = async (req: Request, res: Response) => {
    try {
      const { jobId } = req.params;
      const job = await this.jobService.deleteJob(parseInt(jobId));
      res.json(`Job: ${job} has been deleted`);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  };
}
