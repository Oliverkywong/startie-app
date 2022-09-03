import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    if (!(await knex.schema.hasTable("skill"))) {
        await knex.schema.createTable("skill", (table) => {
            table.increments();
            table.string("name").notNullable();
            table.integer("sector_id").unsigned().notNullable();
            table.foreign("sector_id").references("sector.id");
        });
    }
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("skill");
}
