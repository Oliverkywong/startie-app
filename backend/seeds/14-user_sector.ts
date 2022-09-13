import { Knex } from "knex";


export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("user_sector").del();

        await knex
        .insert([

        {
            user_id: 1,
            sector_id: 1,
            point: 8
        },
        {
            user_id: 1,
            sector_id: 2,
            point: 6
        },
        {
            user_id: 1,
            sector_id: 3,
            point: 1
        },
        {
            user_id: 2,
            sector_id: 2,
            point: 3
        },
        {
            user_id: 3,
            sector_id: 3,
            point: 1
        },
        {
            user_id: 4,
            sector_id: 2,
            point: 7
        },
        {
            user_id: 4,
            sector_id: 3,
            point: 7
        }
    ])
    .into("user_sector");

}