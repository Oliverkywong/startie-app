import Knex from "knex";
import { Job } from "../../utils/model";
import { JobService } from "../jobService";
import dotenv from "dotenv";
dotenv.config();
const knexfile = require("../../knexfile");
const knex = Knex(knexfile["test"]);

describe("JobService CRUD", () => {
  let jobService = new JobService(knex);

  const jobInfo = {
    name: "jobName",
    description: "jobDescription",
  };

  const newJobInfo = {
    name: "newJobName",
    description: "newJobDescription",
  };

  beforeAll(async () => {
    return knex.migrate
      .rollback()
      .then(function () {
        return knex.migrate.latest();
      })
      .then(function () {
        return knex.seed.run();
      });
  });

  afterAll(async () => {
    await knex.destroy();
  });

  it("function createJob test", async () => {
    const createJob = await jobService.createJob(
      jobInfo.name,
      jobInfo.description
    );
    expect(createJob[0].name).toBe(jobInfo.name);
    expect(createJob[0].description).toBe(jobInfo.description);
  });

  it("function getAllJobs test", async () => {
    const getAllJobs = await jobService.getAllJobs();
    expect(getAllJobs.length).toBeGreaterThan(0);
  });

  it("function getJob, updateJob and deleteJob test", async () => {
    const getJob = await jobService.getJob(jobInfo.name);
    expect(getJob.length).toBeGreaterThan(0);
    expect(getJob[0].name).toBe(jobInfo.name);

    const updateJob = await jobService.updateJob(
      getJob[0].id,
      newJobInfo.name,
      newJobInfo.description
    );
    expect(updateJob![0].name).toBe(newJobInfo.name);
    expect(updateJob![0].description).toBe(newJobInfo.description);

    await jobService.deleteJob(getJob[0].id);
    const result = await knex<Job>("job")
      .select("*")
      .where("id", getJob[0].id)
      .returning("*");
    expect(result.length).toBe(0);
  });
});
