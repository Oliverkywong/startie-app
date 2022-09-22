import { Knex } from "knex";
import { faker } from "@faker-js/faker";

export async function seed(knex: Knex): Promise<void> {
  faker.seed(123);
  // Deletes ALL existing entries
  await knex("event_provider").del();

  await knex
    .insert([
      {
        name: "Michael_Company",
        profile_pic: "com1.png",
      },
      {
        name: "Oliver_Company",
        profile_pic: "com1.png",
      },
      {
        name: "Yeung_Company",
        profile_pic: "com1.png",
      },
    ])
    .into("event_provider");

  for (let i = 0; i < 20; i++) {
    await knex("event_provider").insert({
      name: `${faker.company.bs()}`,
      profile_pic: `event_provider${Math.floor(Math.random() * 10) + 1}.jpeg`,
    });
  }
}
