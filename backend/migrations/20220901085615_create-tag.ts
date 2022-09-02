import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    if (!(await knex.schema.hasTable("tag"))) {
        await knex.schema.createTable("tag", (table) => {
            table.increments();
            table.string("name").notNullable();
            table.integer("searchcategory_id").unsigned().notNullable();
            table.foreign("searchcategory_id").references("searchcategory.id");
        });
    }
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("tag");
}
