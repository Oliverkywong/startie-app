import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    if (!(await knex.schema.hasTable("status"))) {
        await knex.schema.createTable("status", (table) => {
            table.increments();
            table.string("name").unique().notNullable();
        });
    }
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("status");
}