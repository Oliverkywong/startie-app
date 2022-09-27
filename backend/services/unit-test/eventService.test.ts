import { EventService } from "../eventService";
import Knex from "knex";
import dotenv from "dotenv";
import { Event } from "../../utils/model"
import { EventListInput } from "../../utils/api-types";
dotenv.config();
const knexfile = require("../../knexfile");
const knex = Knex(knexfile["test"]);

describe("EventService CRUD positive", () => {
  let eventService = new EventService(knex);
  const eventInfo: Event = {
    id: 1,
    name: "eventInfoName",
    description: "eventInfoDescription",
    shortDescription: "eventInfoshortDescription",
    event_provider_id: 1,
    provider_name: "providername",
    profilepic: "eventInfoProfilepic",
    maxteammember: 4,
    starttime: new Date(),
    status_id: 1,
    clickrate: 0,
    searchcategory_id: 1
  };

  const newEventInfo:Event = {
    id: 1,
    name: "newEventInfoName",
    description: "newEventInfoDescription",
    shortDescription: "newEventInfoshortDescription",
    event_provider_id: 1,
    provider_name: "providername",
    profilepic: "newEventInfoProfilepic",
    maxteammember: 4,
    starttime: new Date(),
    status_id: 1,
    clickrate: 0,
    searchcategory_id: 1
  };

  const eventListInput: EventListInput = {
    name: "newEventInfoName",
    q: "string",
    _order: "asc",
    _sort: "id",
    _start: 1,
    _end: 1,
    event_name: "string",
    event_provider_id: 1,
    provider_name: "string",
    profilepic: "newEventInfoProfilepic",
    searchcategory_id: 1,
    description: "newEventInfoDescription",
    shortDescription: "newEventInfoshortDescription",
    maxteammember: 1,
    status_id: 1
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
    const createEvent = await eventService.createEvent(
      eventInfo.name,
      eventInfo.description,
      eventInfo.maxteammember,
      eventInfo.profilepic,
      eventInfo.starttime,
      eventInfo.shortDescription,
      eventInfo.searchcategory_id,
      eventInfo.event_provider_id,
    );
    expect(createEvent[0].name).toBe(eventInfo.name);
    expect(createEvent[0].description).toBe(eventInfo.description);
    expect(createEvent[0].profilepic).toBe(eventInfo.profilepic);
    expect(createEvent[0].starttime).toStrictEqual(eventInfo.starttime);
  });

  it("function getAllEvents test", async () => {
    const show = true
    const getAllEvents = await eventService.getAllEvents(
      show);
      
    expect(getAllEvents.count).toBeGreaterThan(0);
  });

  it("function getEvent test", async () => {
    const getEvent = await eventService.getEvent(eventInfo.id);
    expect(getEvent.length).toBeGreaterThan(0);
    expect(getEvent[0].id).toBe(eventInfo.id);
  });

  it("function updateEvent test", async () => {
    const getEvent = await eventService.getEvent(eventInfo.id);
    expect(getEvent[0].id).toBe(eventInfo.id);

    const updateEvent = await eventService.updateEventForAdmin(
      eventInfo.id,
      eventListInput);
    expect(updateEvent[0].name).toBe(newEventInfo.name);
    expect(updateEvent[0].description).toBe(newEventInfo.description);
    expect(updateEvent[0].profilepic).toBe(newEventInfo.profilepic);
  });
});

describe("EventService CRUD negative", () => {
  let eventService = new EventService(knex);
  const eventInfo: Event = {
    id: 1,
    name: "eventInfoName",
    description: "eventInfoDescription",
    shortDescription: "eventInfoshortDescription",
    event_provider_id: 1,
    provider_name: "providername",
    profilepic: "eventInfoProfilepic",
    maxteammember: 4,
    starttime: new Date(),
    status_id: 1,
    clickrate: 0,
    searchcategory_id: 1
  };

  const newEventInfo:Event = {
    id: 1,
    name: "newEventInfoName",
    description: "newEventInfoDescription",
    shortDescription: "newEventInfoshortDescription",
    event_provider_id: 1,
    provider_name: "providername",
    profilepic: "newEventInfoProfilepic",
    maxteammember: 4,
    starttime: new Date(),
    status_id: 1,
    clickrate: 0,
    searchcategory_id: 1
  };

  const eventListInput: EventListInput = {
    name: "newEventInfoName",
    q: "string",
    _order: "asc",
    _sort: "id",
    _start: 1,
    _end: 1,
    event_name: "string",
    event_provider_id: 1,
    provider_name: "string",
    profilepic: "newEventInfoProfilepic",
    searchcategory_id: 1,
    description: "newEventInfoDescription",
    shortDescription: "newEventInfoshortDescription",
    maxteammember: 1,
    status_id: 1
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
    const createEvent = await eventService.createEvent(
      eventInfo.name,
      eventInfo.description,
      eventInfo.maxteammember,
      eventInfo.profilepic,
      eventInfo.starttime,
      eventInfo.shortDescription,
      eventInfo.searchcategory_id,
      eventInfo.event_provider_id,
    );
    expect(createEvent[0].name).toBe(eventInfo.name);
    expect(createEvent[0].description).toBe(eventInfo.description);
    expect(createEvent[0].profilepic).toBe(eventInfo.profilepic);
    expect(createEvent[0].starttime).toStrictEqual(eventInfo.starttime);
  });

  it("function getAllEvents test", async () => {
    const show = true
    const getAllEvents = await eventService.getAllEvents(
      show);
      
    expect(getAllEvents.count).toBeGreaterThan(0);
  });

  it("function getEvent test", async () => {
    const getEvent = await eventService.getEvent(eventInfo.id);
    expect(getEvent.length).toBeGreaterThan(0);
    expect(getEvent[0].id).toBe(eventInfo.id);
  });

  it("function updateEvent test", async () => {
    const getEvent = await eventService.getEvent(eventInfo.id);
    expect(getEvent[0].id).toBe(eventInfo.id);

    const updateEvent = await eventService.updateEventForAdmin(
      eventInfo.id,
      eventListInput);
    expect(updateEvent[0].name).toBe(newEventInfo.name);
    expect(updateEvent[0].description).toBe(newEventInfo.description);
    expect(updateEvent[0].profilepic).toBe(newEventInfo.profilepic);
  });
});
