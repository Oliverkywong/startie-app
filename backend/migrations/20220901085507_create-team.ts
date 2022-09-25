import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable("team"))) {
    await knex.schema.createTable("team", (table) => {
      table.increments();
      table.string("name").unique().notNullable();
      table.integer("room_id").unique();
      table.foreign("room_id").references("room.id");
      table.integer("status_id").unsigned().notNullable();
      table.foreign("status_id").references("status.id");
      table.integer("searchcategory_id").unsigned().notNullable();
      table.foreign("searchcategory_id").references("searchcategory.id");
      table.text("shortDescription");
      table.text("description");
      table.text("profilepic");
      table.integer("clickrate").defaultTo(0).unsigned();
      table.timestamps(false, true);
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("team");
}
