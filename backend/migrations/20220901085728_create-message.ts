import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    if (!(await knex.schema.hasTable("message"))) {
        await knex.schema.createTable("message", (table) => {
            table.increments();
            table.text("message");
            table.integer("receiver_id").unsigned();
            table.foreign("receiver_id").references("user.id");
            table.integer("sender_id").unsigned().notNullable();
            table.foreign("sender_id").references("user.id");
            table.boolean("isread");
            table.integer("team_id").unsigned();
            table.foreign("team_id").references("team.id");
            table.integer("room_id").unsigned().notNullable();
            table.foreign("room_id").references("room.id");
            table.timestamps(false, true);
        });
    }
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("message");
}