import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    if (!(await knex.schema.hasTable("user_job"))) {
        await knex.schema.createTable("user_job", (table) => {
            table.increments();
            table.integer("job_id").unsigned().notNullable();
            table.foreign("job_id").references("job.id");
            table.integer("user_id").unsigned().notNullable();
            table.foreign("user_id").references("user.id");
            table.boolean("isfollow").notNullable();
        });
    }
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("user_job");
}
