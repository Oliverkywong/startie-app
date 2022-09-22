import { Knex } from "knex";
import { faker } from "@faker-js/faker";

export async function seed(knex: Knex): Promise<void> {

    faker.seed(123);
    // Deletes ALL existing entries
    await knex("user").del();

    let a = "$2a$10$hQbpHOiY8EJIcYH4pSm1juOb.R38W6BEItGHu80FCCTG9m2Pbsnq6" //await hashPassword('oliver');
    let b = "$2a$10$K8aQs67ubUZ0x8.pyAQr8evRHy.LedoqZcgjif/36snstXGHcSC.W" //await hashPassword('michael');
    let c = "$2a$10$BdULP4aElewntJ2QNDT6HO8AeZeb6ZHRKsXrP78WFEOBlTT4wBlPO" //await hashPassword('yeung');
    let d = "$2a$10$F0bFHY0BwPCuQVQcfhQYbusTvRyqeaeF2FZXDFkzaooVWn2fc1Omq" //await hashPassword('leo');

        await knex
        .insert([

        {
            username: "Oliver",
            password: a,
            email: "oliverwong@gmail.com",
            phonenumber: "95804970",
            status_id: 1,
            profilepic: "tonystarkicon.png",
            description: "testing",
            clickrate: 700,
        },
        {
            username: "Michael",
            password: b,
            email: "ml@gmail.com",
            phonenumber: "23450000",
            status_id: 1,
            profilepic: "michaelicon.jpeg",
            description: "testing",
            clickrate: 0,
        },
        {
            username: "Yeung",
            password: c,
            email: "yeung@gmail.com",
            phonenumber: "54129917",
            status_id: 1,
            profilepic: "yeungicon.jpeg",
            description: "testing",
            clickrate: 0,
        },
        {
            username: "Leo",
            password: d,
            email: "leo@gmail.com",
            phonenumber: "64129917",
            status_id: 1,
            profilepic: "leoicon.jpeg",
            description: "testing",
            clickrate: 0,
        },
    ])
    .into("user");

    for(let i = 0; i < 100; i++) {
        await knex("user").insert({
            username: faker.name.fullName(),
            password: faker.internet.password(),
            email: `${faker.name.lastName()}${i.toString()}@gmail.com`,
            phonenumber: faker.finance.account(),
            status_id: 1,
            profilepic: `icon${Math.floor(Math.random()* 30)+1}.jpeg`,
            description: faker.lorem.paragraph(),
            clickrate: Math.floor(Math.random()* 500)+1,
        });
    }

}

