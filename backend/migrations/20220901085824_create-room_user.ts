import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    if (!(await knex.schema.hasTable("room_user"))) {
        await knex.schema.createTable("room_user", (table) => {
            table.increments();
            table.integer("user_id").unsigned();
            table.foreign("user_id").references("user.id");
            table.integer("room_id").unsigned().notNullable();
            table.foreign("room_id").references("room.id");
        });
    }
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("room_user");
}