import { Knex } from "knex";


export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("user_job").del();

        await knex
        .insert([

        {
            user_id: 1,
            job_id: 1,
            isfollow: true
        },
        {
            user_id: 1,
            job_id: 2,
            isfollow: true
        },
        {
            user_id: 1,
            job_id: 3,
            isfollow: false
        },
        {
            user_id: 2,
            job_id: 1,
            isfollow: true
        },
        {
            user_id: 2,
            job_id: 2,
            isfollow: true
        },
        {
            user_id: 3,
            job_id: 1,
            isfollow: false
        },
        {
            user_id: 4,
            job_id: 1,
            isfollow: true
        },
    ])
    .into("user_job");

}