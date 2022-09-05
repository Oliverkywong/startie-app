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
                skill_id: 2,
                point: 8
            },
            {
                user_id: 1,
                skill_id: 3,
                point: 6
            },
            {
                user_id: 1,
                skill_id: 4,
                point: 8
            },
            {
                user_id: 1,
                skill_id: 5,
                point: 6
            },
            {
                user_id: 1,
                skill_id: 6,
                point: 5
            },
            {
                user_id: 1,
                skill_id: 7,
                point: 8
            },
            {
                user_id: 1,
                skill_id: 8,
                point: 6
            },
            {
                user_id: 1,
                skill_id: 9,
                point: 8
            },
            {
                user_id: 1,
                skill_id: 10,
                point: 6
            },
            {
                user_id: 1,
                skill_id: 11,
                point: 5
            },
            {
                user_id: 1,
                skill_id: 12,
                point: 8
            },
            {
                user_id: 1,
                skill_id: 13,
                point: 6
            },
            {
                user_id: 1,
                skill_id: 14,
                point: 8
            },
            {
                user_id: 1,
                skill_id: 15,
                point: 6
            },
    ])
    .into("user_skill");

}