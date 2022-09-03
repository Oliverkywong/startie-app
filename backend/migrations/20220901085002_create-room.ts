import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    if (!(await knex.schema.hasTable("room"))) {
        await knex.schema.createTable("room", (table) => {
            table.increments();
            table.timestamps(false, true);
        });
    }
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("room");
}

