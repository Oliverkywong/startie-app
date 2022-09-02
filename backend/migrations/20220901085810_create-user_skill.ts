import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    if (!(await knex.schema.hasTable("user_skill"))) {
        await knex.schema.createTable("user_skill", (table) => {
            table.increments();
            table.integer("user_id").unsigned().notNullable();
            table.foreign("user_id").references("user.id");
            table.integer("skill_id").unsigned().notNullable();
            table.foreign("skill_id").references("skill.id");
            table.integer("point").unsigned().notNullable();
        });
    }
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("user_skill");
}
