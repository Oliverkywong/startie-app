import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    if (!(await knex.schema.hasTable("searchcategory"))) {
        await knex.schema.createTable("searchcategory", (table) => {
            table.increments();
            table.string("name").unique().notNullable();
            table.text("profilepic");
        });
    }
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("searchcategory");
}