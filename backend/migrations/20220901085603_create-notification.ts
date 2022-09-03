import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    if (!(await knex.schema.hasTable("notification"))) {
        await knex.schema.createTable("notification", (table) => {
            table.increments();
            table.integer("user_id").unsigned().notNullable();
            table.foreign("user_id").references("user.id");
            table.text("content").notNullable();
            table.boolean("isread").notNullable();
            table.timestamps(false, true);
        });
    }
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("notification");
}

