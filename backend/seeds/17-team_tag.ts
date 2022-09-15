import { Knex } from "knex";


export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("team_tag").del();

        await knex
        .insert([

        {
            team_id: 1,
            tag_id: 7,
        },
        {
            team_id: 1,
            tag_id: 8,
        },
        {
            team_id: 1,
            tag_id: 1,
        },
        {
            team_id: 2,
            tag_id: 1,
        },
        {
            team_id: 3,
            tag_id: 1,
        },
        {
            team_id: 3,
            tag_id: 2,
        },
        {
            team_id: 4,
            tag_id: 4,
        }
    ])
    .into("team_tag");

}