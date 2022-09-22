import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable("event_provider"))) {
    await knex.schema.createTable("event_provider", (table) => {
      table.increments();
      table.text("profile_pic");
      table.text("name");
      table.timestamps(false, true);
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("event_provider");
}
