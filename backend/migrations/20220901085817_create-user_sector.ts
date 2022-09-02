import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    if (!(await knex.schema.hasTable("user_sector"))) {
        await knex.schema.createTable("user_sector", (table) => {
            table.increments();
            table.integer("user_id").unsigned().notNullable();
            table.foreign("user_id").references("user.id");
            table.integer("sector_id").unsigned().notNullable();
            table.foreign("sector_id").references("sector.id");
            table.integer("point").unsigned().notNullable();
        });
    }
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("user_sector");
}
