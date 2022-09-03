import { Knex } from "knex";


export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("user_event").del();

        await knex
        .insert([

        {
            user_id: 1,
            event_id: 1,
            isfollow: true
        },
        {
            user_id: 1,
            event_id: 2,
            isfollow: true
        },
        {
            user_id: 1,
            event_id: 3,
            isfollow: false
        },
        {
            user_id: 2,
            event_id: 1,
            isfollow: true
        },
        {
            user_id: 2,
            event_id: 2,
            isfollow: true
        },
        {
            user_id: 3,
            event_id: 1,
            isfollow: false
        },
        {
            user_id: 4,
            event_id: 1,
            isfollow: true
        },
    ])
    .into("user_event");

}