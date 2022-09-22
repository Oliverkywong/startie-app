import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("user_tag").del();

  await knex
    .insert([
      {
        user_id: 1,
        tag_id: 7,
      },
      {
        user_id: 1,
        tag_id: 8,
      },
      {
        user_id: 1,
        tag_id: 1,
      },
      {
        user_id: 2,
        tag_id: 1,
      },
      {
        user_id: 3,
        tag_id: 1,
      },
      {
        user_id: 3,
        tag_id: 2,
      },
      {
        user_id: 4,
        tag_id: 4,
      },
    ])
    .into("user_tag");

  for (let i = 4; i <= 104; i++) {
    await knex
      .insert({
        user_id: i,
        tag_id: Math.floor(Math.random() * 12) + 1,
      })
      .into("user_tag");
  }
}
