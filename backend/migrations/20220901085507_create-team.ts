import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    if (!(await knex.schema.hasTable("team"))) {
        await knex.schema.createTable("team", (table) => {
            table.increments();
            table.string("name").unique().notNullable();
            table.text("description");
            table.text("profilepic");
            table.integer("clickrate").unsigned;
            table.timestamps(false, true);
        });
    }
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("team");
}