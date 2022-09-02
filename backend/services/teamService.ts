import { Knex } from "knex";

export class TeamService {
    constructor(private knex: Knex) {}

    async getAllTeams() {
        return await this.knex.select("id", "name")
        .from("team");
    }

    async getTeam(teamname: string) {
        return await this.knex.select("id", teamname)
        .from("team");
      }
    
    async createTeam(teamname: string, description?:string, profilepic?:string){
        return await this.knex
        .insert({name: teamname, description: description, profilepic: profilepic})
        .into("team")
        .returning("id");
    }

    async updateTeam(teamname?: string, description?:string, profilepic?:string) {
        return await this.knex("team")
        .update({name: teamname});
    }

    async deleteTeam(teamname: string) {
        return await this.knex("team")
        .where({name: teamname})
        .del();
    }
}