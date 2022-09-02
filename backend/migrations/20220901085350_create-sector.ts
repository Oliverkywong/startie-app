import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    if (!(await knex.schema.hasTable("sector"))) {
        await knex.schema.createTable("sector", (table) => {
            table.increments();
            table.string("name").unique().notNullable();
        });
    }
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("sector");
}