import { Knex } from "knex";
import { TeamListData, TeamListInput } from "../utils/api-types";
import { Category, Tag, Team, Team_Tag, User_Team} from "../utils/model";

export class TeamService {
  constructor(private knex: Knex) {}
  // -------------------------------------------------------------------------------------------------------------------
  // create team
  // -------------------------------------------------------------------------------------------------------------------
  async createTeam(userId: number, name: string, searchcategory_id: number, shortDescription: string, looking:number, description?: string, profilepic?: string) {
    try {
      const teamInfo = await this.knex<Team>("team")
        .insert({
          name: name,
          searchcategory_id: searchcategory_id,
          shortDescription: shortDescription,
          description: description,
          profilepic: profilepic,
          status_id: 1,
        })
        .returning("*");

        const user_team = await this.knex<User_Team>("user_team")
        .insert({
          user_id: userId,
          team_id: teamInfo[0].id,
          isboard: true,
          iswaiting: false,
          isfollow: true,
          applytime: new Date()
        })
        .returning("*");

        const team_tag = await this.knex<Team_Tag>("team_tag")
        .insert({
          team_id: teamInfo[0].id,
          tag_id: looking
        })
        .returning("*");

      return {teamInfo, user_team, team_tag};
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
    s.id AS status_id,
    s.name AS status,
    s2.name AS category,
    t.searchcategory_id,
    array_agg(DISTINCT u.username) AS users,
    t.description AS shortdescription, 
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

    if (input.status_id) {
      // let i = binding.length +1 // // method for preventing sql injection
      query += /*SQL*/ `s.id = '${input.status_id}' AND `
    }
    if (input.name) {
      query += /*SQL*/ `t.name ILIKE '%${input.name}%' AND `
   }   
   if (input.q) {
    query += /*SQL*/ `t.name ILIKE '%${input.q}%' AND `
 }  
    if (input.description) {
      query += /*SQL*/ `t.description ILIKE '%${input.description}%' AND `
    }
    if (input.category_id) {
      query += /*SQL*/ `t.searchcategory_id = '${input.category_id}' AND `
    }
    if (input.shortDescription) {
      query += /*SQL*/ `t."shortDescription" ILIKE '%${input.shortDescription}%' AND `
    }
    if (input.tags) {
      query += /*SQL*/ `array_agg(DISTINCT tag.name)::VARCHAR ILIKE '%${input.tags}%' AND ` 
  }
  if (input.users) {
    query += /*SQL*/ `array_agg(DISTINCT u.username)::VARCHAR ILIKE '%${input.users}%' AND ` 
}

  if (!show) { // if show is false, only show active teams
    query += /*SQL*/ `s.id = 1 AND `
  }

    if (query.endsWith("AND ")) {
      query = query.slice(0, -4); // delete the "AND"
    } else if (query.endsWith("HAVING ")) {
      query = query.slice(0, -7); // delete the "HAVING"
    }

    const count = await this.knex.raw(query)

    if (input._order && input._sort && input._end && input._start) {
      query += /*SQL*/ 
      ` ORDER BY ${input._sort} ${input._order}
      LIMIT ${input._end - input._start}
      OFFSET ${input._start}`
    } else {
      query += /*SQL*/ ` ORDER BY clickrate, t.id DESC`;
    }
     const teams = await this.knex.raw(query)

    return {teams: teams.rows, count: count.rowCount};
  }
// -------------------------------------------------------------------------------------------------------------------
// get team
// -------------------------------------------------------------------------------------------------------------------
  async getTeam(id: number) {
    const team = await this.knex<Team>("team").select("*").where("id", id);

    const teamTag = await this.knex.raw(
      `select * from team_tag join tag on tag.id = team_tag.tag_id where team_tag.team_id = ?`,
      [id]
    );
    const teammember = await this.knex.raw(
      `select * from user_team ut inner join "user" u on u.id = ut.user_id where team_id = ?`,
      [id]
    );

    return { team: team, teamTag: teamTag.rows, teamMember: teammember.rows };
  }
// -------------------------------------------------------------------------------------------------------------------
// get one team for admin
// -------------------------------------------------------------------------------------------------------------------
async getTeamForAdmin(id: number){
  const team = await this.knex<Team>("team as t")
  .select("t.id as id", "t.name as name", "t.status_id as status_id", "t.searchcategory_id as category_id", "t.description as description", "t.shortDescription as shortDescription", "t.profilepic as profilepic", "s.name as status", "sc.name as category", "t.clickrate as clickrate", this.knex.raw("ARRAY_AGG(distinct u.username) AS users"), this.knex.raw("ARRAY_AGG(distinct tag.name) AS tags"))
  .leftJoin("team_tag as tt", "t.id", "tt.team_id")
  .leftJoin("tag", "tt.tag_id", "tag.id")
  .innerJoin("status as s", "s.id", "t.status_id")
  .innerJoin("searchcategory as sc", "sc.id", "t.searchcategory_id")
  .innerJoin("user_team as ut", "ut.team_id", "t.id")
  .innerJoin('user as u', "u.id", "ut.user_id")
  .groupBy("t.id", "s.id", "sc.name")
  .where("t.id", id);

  return { team };
}
  // -------------------------------------------------------------------------------------------------------------------
  // edit team
  // -------------------------------------------------------------------------------------------------------------------
  async updateTeam(
    id: number,
    input: TeamListInput
  ) {
    
    const teamInfo = await this.knex<Team>("team")
      .update({
        name: input.name,
        searchcategory_id: input.category_id,
        description: input.description,
        shortDescription: input.shortDescription,
        profilepic: input.profile_pic,
        status_id: input.status_id,
      })
      .where("id", id)
      .returning("*");

    return teamInfo;
  }
  // -------------------------------------------------------------------------------------------------------------------
  // get all teamtag
  // -------------------------------------------------------------------------------------------------------------------
  async teamTag() {
    const teamTags = 
    await this.knex.raw( /*SQL*/
      `SELECT team_id AS id, t.name, array_agg(tag.name) AS tags 
      FROM team_tag 
      INNER JOIN team t ON t.id= team_tag.team_id
      INNER JOIN tag ON tag.id=team_tag.tag_id 
      GROUP BY team_id,t.name`
    );
    return teamTags.rows;
  }

  // -------------------------------------------------------------------------------------------------------------------
  // get all Category
  // -------------------------------------------------------------------------------------------------------------------
  async getCategory() {
    return await this.knex<Category>("searchcategory").select("*");
  }

  //---------
  //get all tag 
  //--------
  async getAllTag() {
    return await this.knex<Tag>("tag").select("*");
  }
}
