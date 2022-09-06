import { Knex } from "knex";
import { Job } from "../utils/model";

export class JobService {
  constructor(private knex: Knex) {}

  async getAllJobs() {
    return await this.knex<Job>("job")
      .select("name, description")
      .returning("*");
  }

  async createJob(jobName: string, description?: string) {
    return await this.knex<Job>("job")
      .insert({
        name: jobName,
        description: description,
      })
      .into("job")
      .returning("*");
  }

  async getJob(jobName: string) {
    return await this.knex<Job>("job")
      .select("id", "name", "description")
      .where("name", jobName)
      .returning("*");
  }

  async updateJob(jobId: number, jobName?: string, description?: string) {
    if (jobName !== null || description !== null) {
      return await this.knex<Job>("job")
        .update({ name: jobName, description: description })
        .where("id", jobId)
        .returning("*");
    } else {
      return;
    }
  }

  async deleteJob(jobId: number) {
    return await this.knex<Job>("job").where({ id: jobId }).del();
  }
}
