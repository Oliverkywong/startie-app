import { Knex } from "knex";
import { Team } from "../utils/model";

export class TeamService {
  constructor(private knex: Knex) {}

  async getAllTeams() {
    return await this.knex<Team>("team").select("id", "name").returning("*");
  }

  async createTeam(
    teamname: string,
    description?: string,
    profilepic?: string
  ) {
    return await this.knex<Team>("team")
      .insert({
        name: teamname,
        description: description,
        profilepic: profilepic,
      })
      .into("team")
      .returning("*");
  }

  async getTeam(teamname: string) {
    return await this.knex<Team>("team")
      .select("id", "name")
      .where("name", teamname)
      .returning("*");
  }

  async updateTeam(
    id: number,
    teamname?: string,
    description?: string,
    profilepic?: string
  ) {
    if (teamname !== null || description !== null || profilepic !== null) {
      return await this.knex<Team>("team")
        .update({
          name: teamname,
          description: description,
          profilepic: profilepic,
        })
        .where("id", id)
        .returning("*");
    } else {
      return;
    }
  }

  async deleteTeam(id: number) {
    return await this.knex<Team>("team").where({ id: id }).del();
  }
}
