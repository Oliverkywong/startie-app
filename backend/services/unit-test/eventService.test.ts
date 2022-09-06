import { EventService } from "../eventService";
import Knex from "knex";
import dotenv from "dotenv";
dotenv.config();
const knexfile = require("../../knexfile");
const knex = Knex(knexfile["test"]);

describe("EventService", () => {
  let eventService = new EventService(knex);

  beforeAll(async () => {
    return knex.migrate
      .rollback()
      .then(function () {
        return knex.migrate.latest();
      })
      .then(function () {
        return knex.seed.run();
      });
  });

  afterAll(async () => {
    await knex.destroy();
  });

  it("function createEvent test", async () => {
    const time = new Date();
    const createEvent = await eventService.createEvent(
      "eventtest",
      "eventtest",
      "eventtest",
      time
    );
    expect(createEvent[0].name).toBe("eventtest");
    expect(createEvent[0].description).toBe("eventtest");
    expect(createEvent[0].profilepic).toBe("eventtest");
    expect(createEvent[0].starttime).toStrictEqual(time);
  });

  it("function getAllEvents test", async () => {
    const getAllEvents = await eventService.getAllEvents();
    expect(getAllEvents.length).toBeGreaterThan(0);
  });

  it("function getEvent test", async () => {
    const getEvent = await eventService.getEvent("eventtest");
    expect(getEvent[0].name).toBe("eventtest");
  });

  it("function updateEvent test", async () => {
    const time = new Date();
    const updateEvent = await eventService.updateEvent(
      4,
      "eventtest2",
      "eventtest2",
      "eventtest2",
      time
    );
    expect(updateEvent![0].name).toBe("eventtest2");
    expect(updateEvent![0].description).toBe("eventtest2");
    expect(updateEvent![0].profilepic).toBe("eventtest2");
    expect(updateEvent![0].starttime).toStrictEqual(time);
  });
});
