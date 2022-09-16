import { Knex } from "knex";
import { logger } from "../utils/logger";
import { Job } from "../utils/model";

export class JobService {
  constructor(private knex: Knex) {}

  async createJob(jobName: string, description?: string) {
    try {
      const jobInfo = await this.knex<Job>("job")
        .insert({
          name: jobName,
          description: description,
          status_id: 1,
        })
        .into("job")
        .returning("*");

      return jobInfo;
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }

  async getJob(jobName: string) {
    return await this.knex<Job>("job")
      .select("id", "name", "description")
      .where("name", jobName)
      .returning("*");
  }

  async getAllJobs() {
    return await this.knex<Job>("job")
      .select("id", "name", "description")
      .returning("*");
  }

  async updateJob(jobId: number, jobName?: string, description?: string) {
    if (jobName !== null || description !== null) {
      try {
        const jobInfo = await this.knex<Job>("job")
          .update({ name: jobName, description: description })
          .where("id", jobId)
          .returning("*");

        return jobInfo;
      } catch (err) {
        logger.error(err);
        throw err;
      }
    } else {
      return;
    }
  }

  async deleteJob(jobId: number) {
    return await this.knex<Job>("job").where({ id: jobId }).del();
  }
}
