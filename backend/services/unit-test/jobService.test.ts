import Knex from "knex";
import { Job } from "../../utils/model";
import { JobService } from "../jobService";
import dotenv from "dotenv";
dotenv.config();
const knexfile = require("../../knexfile");
const knex = Knex(knexfile["test"]);

describe("JobService", () => {
  let jobService = new JobService(knex);
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
    const createJob = await jobService.createJob("jobtest", "jobtest");
    expect(createJob[0].name).toBe("jobtest");
    expect(createJob[0].description).toBe("jobtest");
  });

  it("function getAllJobs test", async () => {
    const getAllJobs = await jobService.getAllJobs();
    expect(getAllJobs.length).toBeGreaterThan(0);
  });

  it("function getJob test", async () => {
    const getJob = await jobService.getJob("jobtest");
    expect(getJob[0].name).toBe("jobtest");
  });

  it("function updateJob test", async () => {
    const updateJob = await jobService.updateJob(4, "jobtest2", "jobtest2");
    expect(updateJob![0].name).toBe("jobtest2");
    expect(updateJob![0].description).toBe("jobtest2");
  });

  it("function deleteJob test", async () => {
    await jobService.deleteJob(4);
    const result = knex<Job>("job").select("*").where("id", 4).returning("*");
    expect((await result).length).toBe(0);
  });
});
