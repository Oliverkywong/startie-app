import { Knex } from "knex";
import { TeamListData, TeamListInput } from "../utils/api-types";
import { Team} from "../utils/model";

export class TeamService {
  constructor(private knex: Knex) {}
  // -------------------------------------------------------------------------------------------------------------------
  // create team
  // -------------------------------------------------------------------------------------------------------------------
  async createTeam(name: string, searchcategory_id: number, description?: string, profilepic?: string) {
    try {
      const teaminfo = await this.knex<Team>("team")
        .insert({
          name: name,
          searchcategory_id: searchcategory_id,
          description: description,
          profilepic: profilepic,
          status_id: 1,
        })
        .returning("*");

      // const teamTags = await this.knex<Team_Tags>("team_tag")
      //   .insert({
      //     team_id: teaminfo[0].id,
      //     tag_id: team_tag,
      //   })
      //   .returning("*");

      return teaminfo;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
  // -------------------------------------------------------------------------------------------------------------------
  // get all teams
  // -------------------------------------------------------------------------------------------------------------------
    async getAllTeams(input:TeamListInput, show: boolean): Promise<TeamListData>  {
    // let binding:any[] = []
    let query = /*SQL*/ 
    `SELECT
    t.id,
    t.name, 
    s.name AS status,
    s2.name AS category,
    array_agg(DISTINCT u.username) AS users,
    t.description, 
    t."shortDescription",
    array_agg(DISTINCT tag.name) AS tags,
    t.clickrate,
    t.profilepic 
    FROM team t LEFT JOIN team_tag on t.id = team_tag.team_id
    LEFT JOIN tag ON tag.id = team_tag.tag_id
    LEFT JOIN status s ON s.id = t.status_id
    INNER JOIN user_team ut ON ut.team_id = t.id
    INNER JOIN "user" u ON u.id = ut.user_id
    INNER JOIN searchcategory s2 on s2.id = t.searchcategory_id
    GROUP BY t.id, s.id, s2.name
    HAVING `;

    if (!show) { // if show is false, only show active teams
      query += /*SQL*/ `s.id = 1 AND `
    }
    if (input.status_id) {
      // let i = binding.length +1 // // method for preventing sql injection
      query += /*SQL*/ `s.name = '${input.status_id}' AND `
    }
    if (input.name) {
      query += /*SQL*/ `t.name ILIKE '%${input.name}%' AND `
   }    
    if (input.description) {
      query += /*SQL*/ `t.description ILIKE '%${input.description}%' AND `
    }
    if (input.shortDescription) {
      query += /*SQL*/ `t.shortDescription ILIKE '%${input.shortDescription}%' AND `
    }
    if (input.tags) {
      query += /*SQL*/ `array_agg(DISTINCT tag.name)::VARCHAR ILIKE '%${input.tags}%'` 
  }

    if (query.endsWith("AND ")) {
      query = query.slice(0, -4); // delete the "AND"
      query += /*SQL*/ ` ORDER BY clickrate DESC, t.id ASC`;
    } else if (query.endsWith("HAVING ")) {
      query = query.slice(0, -7); // delete the "HAVING"
      query += /*SQL*/ ` ORDER BY clickrate DESC, t.id ASC`;
    }
    
     const teams = await this.knex.raw(query)

    return {teams}
  }
// -------------------------------------------------------------------------------------------------------------------
// get team
// -------------------------------------------------------------------------------------------------------------------
  async getTeam(id: number) {
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
    searchcategory: number,
    name: string,
    description: string,
    profilepic: string
  ) {
    const teamInfo = await this.knex<Team>("team")
      .update({
        name: name,
        searchcategory_id: searchcategory,
        description: description,
        profilepic: profilepic,
      })
      .where("id", id)
      .returning("*");

    return teamInfo;
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
      `select team_id as id, array_agg(tag.name) as tags from (team_tag inner join team t on t.id= team_tag.team_id) inner join tag on tag.id=team_tag.tag_id group by team_id,t.name`
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
