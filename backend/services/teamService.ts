import { Knex } from "knex";
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
      console.error(err);
      throw err;
    }
  }
// -------------------------------------------------------------------------------------------------------------------
// get all teams  
// -------------------------------------------------------------------------------------------------------------------
  async getAllTeams() {
    return await this.knex<Team>("team")
      .select("name", "description", "profilepic","id")
  }

  async getTeam(teamId: string) { //試一試，改一改sor
    return await this.knex<Team>("team")
      .select("*")
      .where("id", teamId)
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
        console.error(err);
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
