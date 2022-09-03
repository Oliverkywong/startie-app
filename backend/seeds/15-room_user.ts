import { Knex } from "knex";


export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("room_user").del();

        await knex
        .insert([

        {
            user_id: 1,
            room_id: 1,
        },
        {
            user_id: 2,
            room_id: 1,
        },
        {
            user_id: 1,
            room_id: 2,
        },
        {
            user_id: 2,
            room_id: 2,
        },
        {
            user_id: 3,
            room_id: 2,
        },
    ])
    .into("room_user");

}