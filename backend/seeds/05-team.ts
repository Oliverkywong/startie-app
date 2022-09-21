import { Knex } from "knex";
import { faker } from "@faker-js/faker";

export async function seed(knex: Knex): Promise<void> {

    faker.seed(123);
    // Deletes ALL existing entries
    await knex("team").del();

        await knex
        .insert([

        {
            name: "蘋果隊",
            room_id: 2,
            description: "Test",
            status_id: 1,
            searchcategory_id: 1,
            profilepic: "team1.png",
            clickrate: 0,
        },
        {
            name: "橙隊",
            room_id: 3,
            description: "Leo only",
            status_id: 1,
            searchcategory_id: 2,
            profilepic: "team2.png",
            clickrate: 0,
        },
        {
            name: "芒果隊",
            room_id: 4,
            description: "Yeung only",
            status_id: 1,
            searchcategory_id: 3,
            profilepic: "com5.png",
            clickrate: 0,
        },
        {
            name: "Leo隊",
            room_id: 5,
            description: "Leo again",
            status_id: 1,
            searchcategory_id: 5,
            profilepic: "com4.png",
            clickrate: 0,
        }
    ])
    .into("team");


    for(let i = 0; i < 100; i++) {
        await knex("team").insert({
            name: faker.company.bs(),
            room_id: i+6,
            description: faker.lorem.paragraph(),
            searchcategory_id: Math.floor(Math.random()* 5)+1,
            status_id: 1,
            profilepic: `team${Math.floor(Math.random()* 50)+1}.jpeg`,
            clickrate: Math.floor(Math.random()* 500)+1,
        });
    }

}