import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable("user_team"))) {
    await knex.schema.createTable("user_team", (table) => {
      table.increments();
      table.integer("user_id").unsigned().notNullable();
      table.foreign("user_id").references("user.id");
      table.integer("team_id").unsigned().notNullable();
      table.foreign("team_id").references("team.id");
      table.boolean("isboard").notNullable();
      table.boolean("iswaiting").notNullable();
      table.timestamp("applytime");
      table.timestamp("quittime");
      table.boolean("isfollow").notNullable();
      table.unique(["user_id", "team_id"]);
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("user_team");
}
