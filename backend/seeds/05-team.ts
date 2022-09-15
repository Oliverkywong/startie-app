import { Knex } from "knex";


export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("team").del();

        await knex
        .insert([

        {
            name: "蘋果隊",
            room_id: 2,
            description: "Test",
            status_id: 1,
            profilepic: "team1.png",
            clickrate: 0,
        },
        {
            name: "橙隊",
            room_id: 3,
            description: "Leo only",
            status_id: 1,
            profilepic: "team2.png",
            clickrate: 0,
        },
        {
            name: "芒果隊",
            room_id: 4,
            description: "Yeung only",
            status_id: 1,
            profilepic: "com5.png",
            clickrate: 0,
        },
        {
            name: "Leo隊",
            room_id: 5,
            description: "Leo again",
            status_id: 1,
            profilepic: "com4.png",
            clickrate: 0,
        }
    ])
    .into("team");

}