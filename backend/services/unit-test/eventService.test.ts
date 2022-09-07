import { EventService } from "../eventService";
import Knex from "knex";
import dotenv from "dotenv";
dotenv.config();
const knexfile = require("../../knexfile");
const knex = Knex(knexfile["test"]);

describe("EventService CRUD", () => {
  let eventService = new EventService(knex);

  const eventInfo = {
    name: "eventInfoName",
    description: "eventInfoDescription",
    profilepic: "eventInfoProfilepic",
  };

  const newEventInfo = {
    name: "newEventInfoName",
    description: "newEventInfoDescription",
    profilepic: "newEventInfoProfilepic",
  };

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
      eventInfo.name,
      eventInfo.description,
      eventInfo.profilepic,
      time
    );
    expect(createEvent[0].name).toBe(eventInfo.name);
    expect(createEvent[0].description).toBe(eventInfo.description);
    expect(createEvent[0].profilepic).toBe(eventInfo.profilepic);
    expect(createEvent[0].starttime).toStrictEqual(time);
  });

  it("function getAllEvents test", async () => {
    const getAllEvents = await eventService.getAllEvents();
    expect(getAllEvents.length).toBeGreaterThan(0);
  });

  it("function getEvent", async () => {
    const getEvent = await eventService.getEvent(eventInfo.name);
    expect(getEvent.length).toBeGreaterThan(0);
    expect(getEvent[0].name).toBe(eventInfo.name);
  });

  it("function updateEvent test", async () => {
    const getEvent = await eventService.getEvent(eventInfo.name);
    expect(getEvent[0].name).toBe(eventInfo.name);

    const time = new Date();
    const updateEvent = await eventService.updateEvent(
      getEvent[0].id,
      newEventInfo.name,
      newEventInfo.description,
      newEventInfo.profilepic,
      time
    );
    expect(updateEvent![0].name).toBe(newEventInfo.name);
    expect(updateEvent![0].description).toBe(newEventInfo.description);
    expect(updateEvent![0].profilepic).toBe(newEventInfo.profilepic);
    expect(updateEvent![0].starttime).toStrictEqual(time);
  });
});
