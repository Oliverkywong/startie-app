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
        shortDescription: "Programming",
        status_id: 1,
        starttime: new Date(),
        searchcategory_id: 4,
        maxteammember: 3,
        profilepic: "com1.png",
        clickrate: 0,
        event_provider_id: 1,
      },
      {
        name: "Investment Contest",
        description: "Test",
        shortDescription: "shortDescription",
        status_id: 1,
        starttime: new Date(),
        searchcategory_id: 3,
        maxteammember: 5,
        profilepic: "com2.png",
        clickrate: 0,
        event_provider_id: 3,
      },
      {
        name: "Marketing Contest",
        description: "Test",
        shortDescription: "shortDescription",
        status_id: 1,
        starttime: new Date(),
        searchcategory_id: 1,
        maxteammember: 7,
        profilepic: "com3.png",
        clickrate: 0,
        event_provider_id: 2,
      },
    ])
    .into("event");

  for (let i = 0; i < 20; i++) {
    await knex("event").insert({
      name: `${faker.name.jobArea()}${faker.company.bs()}`,
      description: faker.lorem.paragraph(),
      shortDescription: faker.lorem.sentence(),
      status_id: 1,
      starttime: faker.date.between(
        "2022-10-01T00:00:00.000Z",
        "2022-11-01T00:00:00.000Z"
      ),
      maxteammember: Math.floor(Math.random() * 4) + 1,
      searchcategory_id: Math.floor(Math.random() * 5) + 1,
      profilepic: `event${Math.floor(Math.random() * 10) + 1}.jpeg`,
      clickrate: Math.floor(Math.random() * 500) + 1,
      event_provider_id: Math.floor(Math.random() * 20) + 1,
    });
  }
}
