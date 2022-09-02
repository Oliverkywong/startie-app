import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    if (!(await knex.schema.hasTable("job_tag"))) {
        await knex.schema.createTable("job_tag", (table) => {
            table.increments();
            table.integer("job_id").unsigned().notNullable();
            table.foreign("job_id").references("job.id");
            table.integer("tag_id").unsigned().notNullable();
            table.foreign("tag_id").references("tag.id");
        });
    }
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("job_tag");
}