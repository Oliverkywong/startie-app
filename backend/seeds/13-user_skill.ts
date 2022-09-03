import { Knex } from "knex";


export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("user_skill").del();

        await knex
        .insert([

        {
            user_id: 1,
            skill_id: 1,
            point: 5
        },
        {
            user_id: 1,
            skill_id: 1,
            point: 8
        },
        {
            user_id: 1,
            skill_id: 1,
            point: 6
        },
        {
            user_id: 1,
            skill_id: 2,
            point: 3
        },
        {
            user_id: 1,
            skill_id: 2,
            point: 1
        },
        {
            user_id: 1,
            skill_id: 2,
            point: 7
        },
    ])
    .into("user_skill");

}