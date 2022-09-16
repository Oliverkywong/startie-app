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
    const teamTags = await this.knex.raw(`
    select t.profilepic, s.name, t.status_id, t.description,t.name,team_id as id, array_agg(tag.name) as tags from ((team_tag inner join team t on t.id= team_tag.team_id) inner join tag on tag.id=team_tag.tag_id) join status s on s.id=t.status_id group by team_id,t.name,t.description, t.status_id, s.name, t.profilepic`);
    return teamTags.rows;
  }
  // -------------------------------------------------------------------------------------------------------------------
  // get team
  // -------------------------------------------------------------------------------------------------------------------

  async getTeam(id: string) {
    const team = await this.knex<Team>("team").select("*").where("id", id);
    const teamTag = await this.knex.raw(
      `select * from team_tag join tag on tag.id=tag_id where team_id = ?`,
      [id]
    );
    const teammember = await this.knex.raw(
      `select * from user_team ut inner join "user" u on u.id = ut.user_id where team_id = ?`,
      [id]
    );

    return { team: team, teamTag: teamTag.rows, teamMember: teammember.rows };
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
    return await this.knex<Team>("team")
      .update("status_id", status_id)
      .where({ id: id });
  }

  // -------------------------------------------------------------------------------------------------------------------
  // get all teamtag
  // -------------------------------------------------------------------------------------------------------------------
  async teamTag() {
    // return await this.knex("team_tag").select("*");
    const teamTags = await this.knex.raw(
      `select team_id, array_agg(tag.name) as tags from (team_tag inner join team t on t.id= team_tag.team_id) inner join tag on tag.id=team_tag.tag_id group by team_id,t.name`
    );
    return teamTags.rows;
  }

  // -------------------------------------------------------------------------------------------------------------------
  // get all Category
  // -------------------------------------------------------------------------------------------------------------------
  async getCategory() {
    return await this.knex("searchcategory").select("*");
  }
}
