import { Knex } from "knex";


export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("team").del();

        await knex
        .insert([

        {
            name: "蘋果隊",
            room_id: 1,
            description: "Test",
            profilepic: "13.jpg",
            clickrate: 0,
        },
        {
            name: "橙隊",
            room_id: 2,
            description: "Test",
            profilepic: "14.jpg",
            clickrate: 0,
        },
        {
            name: "芒果隊",
            room_id: 3,
            description: "Test",
            profilepic: "15.jpg",
            clickrate: 0,
        }
    ])
    .into("team");

}