import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    if (!(await knex.schema.hasTable("team_tag"))) {
        await knex.schema.createTable("team_tag", (table) => {
            table.increments();
            table.integer("team_id").unsigned().notNullable();
            table.foreign("team_id").references("team.id");
            table.integer("tag_id").unsigned().notNullable();
            table.foreign("tag_id").references("tag.id");
        });
    }
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("team_tag");
}