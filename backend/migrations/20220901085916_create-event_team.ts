import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    if (!(await knex.schema.hasTable("event_team"))) {
        await knex.schema.createTable("event_team", (table) => {
            table.increments();
            table.integer("event_id").unsigned().notNullable();
            table.foreign("event_id").references("event.id");
            table.integer("team_id").unsigned().notNullable();
            table.foreign("team_id").references("team.id");
        });
    }
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("event_team");
}