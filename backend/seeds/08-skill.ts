import { Knex } from "knex";


export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("skill").del();

    // Inserts seed entries
    await knex
    
    .insert([
    { name: "Frontend Development" ,
      sector_id: 1    
    },
    { name: "Data Analysis" ,
      sector_id: 1    
    },
    { name: "Backend Development" ,
      sector_id: 1    
    },
    { name: "Communication" ,
      sector_id: 2  
    },
    { name: "Leadership" ,
      sector_id: 2    
    },
    { name: "Management" ,
      sector_id: 2   
    },
    { name: "Time Management" ,
      sector_id: 3    
    },
    { name: "Creativity" ,
      sector_id: 3    
    },
    { name: "Teamwork" ,
      sector_id: 3    
    },
    ])
        .into("skill")


}