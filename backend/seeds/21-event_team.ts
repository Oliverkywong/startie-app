import { Knex } from "knex";


export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("event_team").del();

        await knex
        .insert([

        {
            event_id: 1,
            team_id: 1,
        },
        {
            event_id: 1,
            team_id: 2,
        },
        {
            event_id: 2,
            team_id: 2,
        },
        {
            event_id: 2,
            team_id: 3,
        },
        {
            event_id: 3,
            team_id: 1,
        },
        {
            event_id: 3,
            team_id: 4,
        }
    ])
    .into("event_team");

}