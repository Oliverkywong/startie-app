import { Knex } from "knex";


export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("status").del();

    // Inserts seed entries
    await knex
    
    .insert([
        { name: "Active" },
        { name: "Inactive" },
        { name: "Pending" }
    ])
        .into("status")


}
