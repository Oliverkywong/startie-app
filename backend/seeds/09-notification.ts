import { Knex } from "knex";


export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("notification").del();

    // Inserts seed entries
    await knex
    
    .insert([
    { user_id: 1 ,
      content: "You have new follower",
      isread: false
    },
    { user_id: 2 ,
        content: "The event you followed is about to end",
        isread: false
      },
    { user_id: 3 ,
        content: "The event you followed is about to end",
        isread: false
      },
    { user_id: 1 ,
        content: "Project is done",
        isread: true
      },
    
    ])
        .into("notification")


}