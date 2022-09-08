import { JobController } from "../jobController";
import { JobService } from "../../services/jobService";
import { Knex } from "knex";
import type { Request, Response } from "express";

jest.mock("../../services/JobService");

describe("JobController test", () => {
  let controller: JobController;
  let service: JobService;
  let req: Request;
  let res: Response;

  beforeEach(() => {
    service = new JobService({} as Knex);
    service.createJob = jest.fn(() =>
      Promise.resolve([
        {
          id: 0,
          name: "createJobName",
          description: "crateJobDescription",
          clickrate: 0,
          status_id: 1,
        },
      ])
    );
    service.getJob = jest.fn(() =>
      Promise.resolve([
        {
          id: 1,
          name: "getJobName",
          description: "getJobDescription",
          clickrate: 0,
          status_id: 1,
        },
      ])
    );
    service.getAllJobs = jest.fn(() =>
      Promise.resolve([
        {
          id: 2,
          name: "getAllJobsName",
          description: "getAllJobsDescription",
          clickrate: 0,
          status_id: 1,
        },
        {
          id: 3,
          name: "getAllJobsName2",
          description: "getAllJobsDescription2",
          clickrate: 0,
          status_id: 1,
        },
        {
          id: 4,
          name: "getAllJobsName3",
          description: "getAllJobsDescription3",
          clickrate: 0,
          status_id: 1,
        },
      ])
    );

    service.updateJob = jest.fn(() =>
      Promise.resolve([
        {
          id: 2,
          name: "newGetAllJobsName",
          description: "newGetAllJobsDescription",
          clickrate: 0,
          status_id: 0,
        },
      ])
    );

    service.deleteJob = jest.fn(() => Promise.resolve(300));

    req = {
      params: {},
      query: {},
      body: {},
    } as Request;
    res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    } as any as Response;
    controller = new JobController(service);
  });

  it("function createJob test", async () => {
    await controller.createJob(req, res);
    expect(service.createJob).toBeCalled();
    expect(res.json).toBeCalledWith([
      {
        id: 0,
        name: "createJobName",
        description: "crateJobDescription",
        clickrate: 0,
        status_id: 1,
      },
    ]);
    expect(res.json).toBeCalledTimes(1);
  });

  it("function getJob test", async () => {
    await controller.getJob(req, res);
    expect(service.getJob).toBeCalled();
    expect(res.json).toBeCalledWith([
      {
        id: 1,
        name: "getJobName",
        description: "getJobDescription",
        clickrate: 0,
        status_id: 1,
      },
    ]);
    expect(res.json).toBeCalledTimes(1);
  });

  it("function getAllJobs test", async () => {
    await controller.getAllJobs(req, res);
    expect(service.getAllJobs).toBeCalled();
    expect(res.json).toBeCalledWith([
      {
        id: 2,
        name: "getAllJobsName",
        description: "getAllJobsDescription",
        clickrate: 0,
        status_id: 1,
      },
      {
        id: 3,
        name: "getAllJobsName2",
        description: "getAllJobsDescription2",
        clickrate: 0,
        status_id: 1,
      },
      {
        id: 4,
        name: "getAllJobsName3",
        description: "getAllJobsDescription3",
        clickrate: 0,
        status_id: 1,
      },
    ]);
    expect(res.json).toBeCalledTimes(1);
  });

  it("function updateJob test", async () => {
    await controller.updateJob(req, res);
    expect(service.updateJob).toBeCalled();
    expect(res.json).toBeCalledWith([
      {
        id: 2,
        name: "newGetAllJobsName",
        description: "newGetAllJobsDescription",
        clickrate: 0,
        status_id: 0,
      },
    ]);
    expect(res.json).toBeCalledTimes(1);
  });

  it("function deleteJob test", async () => {
    await controller.deleteJob(req, res);
    expect(service.deleteJob).toBeCalled();
    expect(res.json).toBeCalledWith("Job: " + 300 + " has been deleted");
    expect(res.json).toBeCalledTimes(1);
  });
});
