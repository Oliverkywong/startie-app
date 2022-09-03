import { Knex } from "knex";


export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("team_job").del();

        await knex
        .insert([

        {
            team_id: 1,
            job_id: 1,
            iswaiting: false
        },
        {
            team_id: 1,
            job_id: 2,
            iswaiting: true
        }
    ])
    .into("team_job");

}