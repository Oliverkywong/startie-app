import { Knex } from "knex";


export async function seed(knex: Knex): Promise<void> {
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
            profilepic: "event.jpg",
            clickrate: 0,
        },
        {
            name: "Investment Contest",
            description: "Test",
            status_id: 1,
            starttime: new Date(),
            maxteammember: 5,
            profilepic: "event.jpg",
            clickrate: 0,
        },
        {
            name: "Marketing Contest",
            description: "Test",
            status_id: 1,
            starttime: new Date(),
            maxteammember: 7,
            profilepic: "event.jpg",
            clickrate: 0,
        },
    ])
    .into("event");

}