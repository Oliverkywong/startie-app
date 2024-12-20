import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable("user"))) {
    await knex.schema.createTable("user", (table) => {
      table.increments();
      table.string("username").unique().notNullable();
      table.string("password").notNullable();
      table.string("email").unique().notNullable();
      table.string("phonenumber");
      table.boolean("isadmin").notNullable().defaultTo(false);
      table.integer("status_id").unsigned().notNullable();
      table.foreign("status_id").references("status.id");
      table.text("profilepic");
      table.text("shortDescription");
      table.text("description");
      table.integer("clickrate").unsigned().defaultTo(0);
      table.timestamps(false, true);
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("user");
}
