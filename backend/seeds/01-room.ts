import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("room").del();

    // Inserts seed entries
    await knex
    
    .insert([
        { 
            created_at: new Date(),
            updated_at: new Date(),
        },
        { 
            created_at: new Date(),
            updated_at: new Date(),
        },
        { 
            created_at: new Date(),
            updated_at: new Date(),
        },
        { 
            created_at: new Date(),
            updated_at: new Date(),
        },
        { 
            created_at: new Date(),
            updated_at: new Date(),
        },
        
    ])
        .into("room")


}