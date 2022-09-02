import { Knex } from "knex";

export class TeamService {
    constructor(private knex: Knex) {}

    async getAllTeams() {
        let result = await this.knex.raw(
            `select id, name from team`,
          );
      
          return result.rows;
    }

    async getTeam(teamname: string) {
        return;
      }
    
    async createTeam(teamname: string) {
        return;
    }

    async updateTeam(teamname: string, team:any) {
        return;
    }

    async deleteTeam(teamname: string) {
        return;
    }
}