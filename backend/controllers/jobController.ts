import { JobService } from "../services/jobService";
import { Request, Response } from "express";

export class JobController {
  constructor(private jobService: JobService) {}

  getAllJobs = async (req: Request, res: Response) => {
    const job = await this.jobService.getAllJobs();
    res.json({ job });
  };

  createJob = async (req: Request, res: Response) => {
    const job = await this.jobService.createJob(req.body);
    res.json({ job });
  };

  getJob = async (req: Request, res: Response) => {
    const job = await this.jobService.getJob(req.body);
    res.json({ job });
  };

  updateJob = async (req: Request, res: Response) => {
    const job = await this.jobService.updateJob(
      parseInt(req.params.id),
      req.body
    );
    res.json({ job });
  };

  deleteJob = async (req: Request, res: Response) => {
    const job = await this.jobService.deleteJob(parseInt(req.params.id));
    res.json({ job });
  };
}
