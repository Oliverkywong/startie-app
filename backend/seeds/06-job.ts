import { Knex } from "knex";


export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("job").del();

        await knex
        .insert([

        {
            name: "砌網頁",
            description: "Test",
            status_id: 1,
            clickrate: 0,
        },
        {
            name: "寫app",
            description: "Test",
            status_id: 1,
            clickrate: 0,
        },
        {
            name: "CICD",
            description: "Test",
            status_id: 1,
            clickrate: 0,
        }
    ])
    .into("job");

}