import { Knex } from "knex";
import { Team } from "../utils/model";

export class TeamService {
  constructor(private knex: Knex) {}

  async createTeam(name: string, description?: string, profilepic?: string) {
    try {
      const teaminfo = await this.knex<Team>("team")
        .insert({
          name: name,
          description: description,
          profilepic: profilepic,
        })
        .into("team")
        .returning("*");

      return teaminfo;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async getAllTeams() {
    return await this.knex<Team>("team").select("*");
  }

  async getAllTeamTags() {
    const teamTags = await this.knex.raw(
      `select * from team_tag join tag on tag.id=tag_id`
    );
    return teamTags.rows;
  }

  async getTeam(id: string) {
    return await this.knex<Team>("team")
      .select("id", "name")
      .where("id", id)
      .returning("*");
  }

  async updateTeam(
    id: number,
    name?: string,
    description?: string,
    profilepic?: string
  ) {
    if (name !== null || description !== null || profilepic !== null) {
      try {
        const teamInfo = await this.knex<Team>("team")
          .update({
            name: name,
            description: description,
            profilepic: profilepic,
          })
          .where("id", id)
          .returning("*");

        return teamInfo;
      } catch (err) {
        console.error(err);
        throw err;
      }
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
