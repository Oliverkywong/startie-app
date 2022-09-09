import { Knex } from "knex";
import { Team } from "../utils/model";

export class TeamService {
  constructor(private knex: Knex) {}

  async createTeam(
    teamName: string,
    description?: string,
    profilepic?: string
  ) {
    return await this.knex<Team>("team")
      .insert({
        name: teamName,
        description: description,
        profilepic: profilepic,
      })
      .into("team")
      .returning("*");
  }

  async getAllTeams() {
    return await this.knex<Team>("team")
      .select("name", "description", "profilepic")
      .returning("*");
  }

  async getTeam(teamName: string) {
    return await this.knex<Team>("team")
      .select("id", "name")
      .where("name", teamName)
      .returning("*");
  }

  async updateTeam(
    teamId: number,
    teamName?: string,
    description?: string,
    profilepic?: string
  ) {
    if (teamName !== null || description !== null || profilepic !== null) {
      return await this.knex<Team>("team")
        .update({
          name: teamName,
          description: description,
          profilepic: profilepic,
        })
        .where("id", teamId)
        .returning("*");
    } else {
      return;
    }
  }

  async deleteTeam(id: number) {
    return await this.knex<Team>("team").where({ id: id }).del();
  }

  async teamTag() {
    return await this.knex("searchcategory").select("*");
  }
}
