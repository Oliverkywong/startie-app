import { Knex } from "knex";
import { faker } from "@faker-js/faker";

export async function seed(knex: Knex): Promise<void> {

    faker.seed(123);
    // Deletes ALL existing entries
    await knex("event").del();

        await knex
        .insert([

        {
            name: "Programming Contest",
            description: "Programming Contest",
            status_id: 1,
            starttime: new Date(),
            maxteammember: 3,
            profilepic: "com1.png",
            clickrate: 0,
        },
        {
            name: "Investment Contest",
            description: "Test",
            status_id: 1,
            starttime: new Date(),
            maxteammember: 5,
            profilepic: "com2.png",
            clickrate: 0,
        },
        {
            name: "Marketing Contest",
            description: "Test",
            status_id: 1,
            starttime: new Date(),
            maxteammember: 7,
            profilepic: "com3.png",
            clickrate: 0,
        },
    ])
    .into("event");


    for(let i = 0; i < 20; i++) {
        await knex("event").insert({
            name: faker.name.jobArea(),
            description: faker.lorem.paragraph(),
            status_id: 1,
            starttime: faker.date.between('2022-10-01T00:00:00.000Z', '202-11-01T00:00:00.000Z'),
            maxteammember: Math.floor(Math.random()* 4)+1,
            profilepic: `event${Math.floor(Math.random()* 10)+1}.jpeg`,
            clickrate: Math.floor(Math.random()* 500),
        });
    }


}