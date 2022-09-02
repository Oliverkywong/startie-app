import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    if (!(await knex.schema.hasTable("event"))) {
        await knex.schema.createTable("event", (table) => {
            table.increments();
            table.string("name").unique().notNullable();
            table.text("description");
            table.integer("status_id").unsigned().notNullable();
            table.integer("status_id").references("status.id");
            table.timestamp("starttime");
            table.text("profilepic");
            table.integer("clickrate").unsigned;
            table.timestamps(false, true);
        });
    }
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("event");
}