import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    if (!(await knex.schema.hasTable("team_job"))) {
        await knex.schema.createTable("team_job", (table) => {
            table.increments();
            table.integer("job_id").unsigned().notNullable();
            table.foreign("job_id").references("job.id");
            table.integer("team_id").unsigned().notNullable();
            table.foreign("team_id").references("team.id");
            table.boolean("iswaiting").notNullable();
        });
    }
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("team_job");
}