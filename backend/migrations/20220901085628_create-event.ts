import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable("event"))) {
    await knex.schema.createTable("event", (table) => {
      table.increments();
      table.string("name").unique().notNullable();
      table.text("description");
      table.integer("maxteammember").unsigned();
      table.integer("status_id").notNullable();
      table.foreign("status_id").references("status.id");
      table.timestamp("starttime");
      table.integer("searchcategory_id").notNullable();
      table.foreign("searchcategory_id").references("searchcategory.id");
      table.integer("event_provider_id").notNullable();
      table.foreign("event_provider_id").references("event_provider.id");
      table.text("profilepic");
      table.integer("clickrate").unsigned().defaultTo(0);
      table.timestamps(false, true);
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("event");
}
