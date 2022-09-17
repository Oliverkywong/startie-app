import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable("user_event"))) {
    await knex.schema.createTable("user_event", (table) => {
      table.increments();
      table.integer("event_id").unsigned().notNullable();
      table.foreign("event_id").references("event.id");
      table.integer("user_id").unsigned().notNullable();
      table.foreign("user_id").references("user.id");
      table.boolean("isfollow").notNullable();
      table.unique(["user_id", "event_id"]);
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("user_event");
}
