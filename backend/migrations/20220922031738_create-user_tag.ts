import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable("user_tag"))) {
    await knex.schema.createTable("user_tag", (table) => {
      table.increments();
      table.integer("user_id").unsigned().notNullable();
      table.foreign("user_id").references("user.id");
      table.integer("tag_id").unsigned().notNullable();
      table.foreign("tag_id").references("tag.id");
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("user_tag");
}
