import { Knex } from "knex";


export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("event_tag").del();

        await knex
        .insert([

        {
            event_id: 1,
            tag_id: 9,
        },
        {
            event_id: 1,
            tag_id: 7,
        },
        {
            event_id: 2,
            tag_id: 4,
        },
        {
            event_id: 2,
            tag_id: 6,
        },
        {
            event_id: 3,
            tag_id: 1,
        },
        {
            event_id: 3,
            tag_id: 2,
        }
    ])
    .into("event_tag");

}