import { Knex } from "knex";


export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("searchcategory").del();

    // Inserts seed entries
    await knex
    
    .insert([
        { name: "Business", profilepic: "business.png" },
        { name: "Startup", profilepic: "startup.png" },
        { name: "Investment", profilepic: "investment.png"  },
        { name: "Hackathon", profilepic: "hackathon.png"  },
        { name: "Others", profilepic: "others.png"  }
    ])
        .into("searchcategory")


}