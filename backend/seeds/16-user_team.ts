import { Knex } from "knex";


export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("user_team").del();

        await knex
        .insert([

        {
            team_id: 1,
            user_id: 1,
            isboard: true,
            iswaiting: false,
            applytime: new Date(),
            isfollow: true,
        },
        {
            team_id: 1,
            user_id: 2,
            isboard: false,
            iswaiting: false,
            applytime: new Date(),
            isfollow: true,
        },
        {
            team_id: 1,
            user_id: 3,
            isboard: false,
            iswaiting: false,
            applytime: new Date(),
            isfollow: true,
        },
        {
            team_id: 1,
            user_id: 4,
            isboard: false,
            iswaiting: true,
            applytime: new Date(),
            isfollow: true,
        },
        {
            team_id: 2,
            user_id: 4,
            isboard: true,
            iswaiting: false,
            applytime: new Date(),
            isfollow: true,
        },
        {
            team_id: 3,
            user_id: 3,
            isboard: true,
            iswaiting: true,
            applytime: new Date(),
            isfollow: true,
        },
        {
            team_id: 4,
            user_id: 1,
            isboard: true,
            iswaiting: true,
            applytime: new Date(),
            isfollow: true,
        },
    ])
    .into("user_team");

}