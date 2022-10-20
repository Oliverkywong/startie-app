import { Knex } from "knex";
import { faker } from "@faker-js/faker";

export async function seed(knex: Knex): Promise<void> {
  faker.seed(123);
  // Deletes ALL existing entries
  await knex("event").del();

  await knex
    .insert([
      {
        name: "HK Tech 300 城大創新創業計劃",
        description: "參加者能以城大開發的知識產權或技術，應用到科技產品或服務中，踏上初創路，並為社會作出貢獻。 計劃開展以來已有超過1000人參與創業培訓，超過300隊初創團隊獲頒發10萬港元種子基金。",
        shortDescription: "踏上初創路，並為社會作出貢獻",
        status_id: 1,
        starttime: new Date(),
        searchcategory_id: 3,
        maxteammember: 5,
        profilepic: "realevent2.jpg",
        clickrate: 0,
        event_provider_id: 1,
      },
      {
        name: "香港大學生創新及創業大賽",
        description: "對於很多初次創業，但又缺乏資金和人脈的人士來說，創業比賽是很好的跳板。今日商瞰為大家整理香港2022年的創業比賽。",
        shortDescription: "今日商瞰為大家整理香港2022年的創業比賽",
        status_id: 1,
        starttime: new Date(),
        searchcategory_id: 3,
        maxteammember: 5,
        profilepic: "realevent1.jpg",
        clickrate: 0,
        event_provider_id: 2,
      },
      {
        name: "Programming Contest",
        description: "Programming Contest",
        shortDescription: "Programming",
        status_id: 1,
        starttime: new Date(),
        searchcategory_id: 4,
        maxteammember: 3,
        profilepic: "com1.png",
        clickrate: 0,
        event_provider_id: 3,
      },
      {
        name: "Investment Contest",
        description: "Test",
        shortDescription: "shortDescription",
        status_id: 1,
        starttime: new Date(),
        searchcategory_id: 3,
        maxteammember: 5,
        profilepic: "com2.png",
        clickrate: 0,
        event_provider_id: 4,
      },
      {
        name: "Marketing Contest",
        description: "Test",
        shortDescription: "shortDescription",
        status_id: 1,
        starttime: new Date(),
        searchcategory_id: 1,
        maxteammember: 7,
        profilepic: "com3.png",
        clickrate: 0,
        event_provider_id: 5,
      },
    ])
    .into("event");

  for (let i = 0; i < 20; i++) {
    await knex("event").insert({
      name: `${faker.name.jobArea()}${faker.company.bs()}`,
      description: faker.lorem.paragraph(),
      shortDescription: faker.lorem.sentence(),
      status_id: 1,
      starttime: faker.date.between(
        "2022-10-01T00:00:00.000Z",
        "2022-11-01T00:00:00.000Z"
      ),
      maxteammember: Math.floor(Math.random() * 4) + 1,
      searchcategory_id: Math.floor(Math.random() * 5) + 1,
      profilepic: `event${Math.floor(Math.random() * 10) + 1}.jpeg`,
      clickrate: Math.floor(Math.random() * 500) + 1,
      event_provider_id: Math.floor(Math.random() * 20) + 1,
    });
  }
}
