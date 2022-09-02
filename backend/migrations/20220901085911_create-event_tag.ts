import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    if (!(await knex.schema.hasTable("event_tag"))) {
        await knex.schema.createTable("event_tag", (table) => {
            table.increments();
            table.integer("event_id").unsigned().notNullable();
            table.foreign("event_id").references("event.id");
            table.integer("tag_id").unsigned().notNullable();
            table.foreign("tag_id").references("tag.id");
        });
    }
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("event_tag");
}