import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable("job"))) {
    await knex.schema.createTable("job", (table) => {
      table.increments();
      table.string("name").unique().notNullable();
      table.text("description");
      table.integer("status_id").unsigned().notNullable();
      table.foreign("status_id").references("status.id");
      table.integer("clickrate").defaultTo(0).unsigned();
      table.timestamps(false, true);
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("job");
}
