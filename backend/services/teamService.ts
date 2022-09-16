import { Knex } from "knex";
import { logger } from "../utils/logger";
import { Team } from "../utils/model";

export class TeamService {
  constructor(private knex: Knex) {}
// -------------------------------------------------------------------------------------------------------------------
// create team
// -------------------------------------------------------------------------------------------------------------------
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
      logger.error(err);
      throw err;
    }
  }
// -------------------------------------------------------------------------------------------------------------------
// get all teams  
// -------------------------------------------------------------------------------------------------------------------
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
    const team = await this.knex<Team>("team").select("*").where("id", id);
    const teamTag = await this.knex.raw(`select * from team_tag join tag on tag.id=tag_id where team_id = ?`, [id]);
    return { team: team, teamTag: teamTag.rows };
  }
// -------------------------------------------------------------------------------------------------------------------
// edit team
// -------------------------------------------------------------------------------------------------------------------
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
        logger.error(err);
        throw err;
      }
    } else {
      return;
    }
  }
// -------------------------------------------------------------------------------------------------------------------
// delete team
// -------------------------------------------------------------------------------------------------------------------
  async deleteTeam(id: number, status_id: number) {
    return await this.knex<Team>("team").update("status_id", status_id).where({ id: id });
  }

// -------------------------------------------------------------------------------------------------------------------
// get all categories
// -------------------------------------------------------------------------------------------------------------------
  async teamTag() {
    return await this.knex("searchcategory").select("*");
  }
}
