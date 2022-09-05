import { Knex } from "knex";


export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("tag").del();

    // Inserts seed entries
    await knex
    
    .insert([
        { name: "Digital Marketing", searchcategory_id: 1 },
        { name: "Public Relation", searchcategory_id: 1 },
        { name: "Customer Service", searchcategory_id: 1 },
        { name: "NFT", searchcategory_id: 3 },
        { name: "Stock", searchcategory_id: 3 },
        { name: "Crypto", searchcategory_id: 3 },
        { name: "Web", searchcategory_id: 4 },
        { name: "App", searchcategory_id: 4 },
        { name: "Data Science", searchcategory_id: 4 },
        { name: "Training", searchcategory_id: 2 },
        { name: "Sense", searchcategory_id: 2 },
        { name: "Regulation", searchcategory_id: 2 },
    ])
        .into("tag")


}