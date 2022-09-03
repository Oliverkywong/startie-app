import { Knex } from "knex";


export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("job_tag").del();

        await knex
        .insert([

        {
            job_id: 1,
            tag_id: 1,
        },
        {
            job_id: 1,
            tag_id: 7,
        },
        {
            job_id: 2,
            tag_id: 1,
        },
        {
            job_id: 2,
            tag_id: 8,
        },
        {
            job_id: 3,
            tag_id: 8,
        },
        {
            job_id: 3,
            tag_id: 9,
        }
    ])
    .into("job_tag");

}