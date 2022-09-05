import { Knex } from "knex";


export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("message").del();

        await knex
        .insert([

        {
            message: "Hi Michael",
            receiver_id: 2,
            sender_id: 1,
            isread: true,
            room_id: 1,
        },
        {
            message: "Hi Oliver",
            receiver_id: 2,
            sender_id: 1,
            isread: false,
            room_id: 1,
        },
        {
            message: "Hi team",
            sender_id: 1,
            team_id: 1,
            room_id: 2,
        },
    ])
    .into("message");

}