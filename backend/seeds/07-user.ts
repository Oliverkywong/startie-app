import { Knex } from "knex";


export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("user").del();

    let a = "$2a$10$HhCxInVGPMLAQdOGt8/qmuEz4kfjjmsTvltcjeqNjctgzCreh7sce" //await hashPassword('admin');
    let b = "$2a$10$2gKOYijOs8sl/Gt27mXXo.eL1DrLpeFFoYvEbqHsgReToP.xWBqdK" //await hashPassword('user');
    let c = "$2a$10$Jrjugzolh7gDkMdIbqjGf.KVX1LG3N7FgMTli.jemY7mh3hUcB.WW" //await hashPassword('vip');
    // let d = "$2a$10$Tqgwr4gqyk8ZJVLCX2Vw3eeW7m4ic91ahsmHGIfYDmUfDBOhAKw5W" //await hashPassword('inactiveuser');

        await knex
        .insert([

        {
            username: "Oliver",
            password: a,
            email: "oliverwong@gmail.com",
            phonenumber: "95804970",
            status_id: 1,
            profilepic: "oliver.jpg",
            description: "testing",
            clickrate: 0,
        },
        {
            username: "Michael",
            password: b,
            email: "ml@gmail.com",
            phonenumber: "23450000",
            status_id: 1,
            profilepic: "michael.jpg",
            description: "testing",
            clickrate: 0,
        },
        {
            username: "Yeung",
            password: c,
            email: "yeung@gmail.com",
            phonenumber: "54129917",
            status_id: 1,
            profilepic: "yeung.jpg",
            description: "testing",
            clickrate: 0,
        },
    ])
    .into("user");

}