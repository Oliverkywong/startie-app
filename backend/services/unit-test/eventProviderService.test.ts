import Knex from "knex";
import dotenv from "dotenv";
import { EventProviderService } from "../eventProviderService";
import { Event_Provider } from "../../utils/model";
import { EventProviderListInput } from "../../utils/api-types";
import { DuplicatenameError } from "../eventService";
dotenv.config();
const knexfile = require("../../knexfile");
const knex = Knex(knexfile["test"]);

describe("EventProviderService CRUD", () => {

  let eventProviderService = new EventProviderService(knex);
  const eventProvider: Event_Provider = {
    id: 1,
    name: "eventProvider",
    profile_pic: "eventProviderProfilepic"
  }

  const newEventProvider: Event_Provider = {
    id: 1,
    name: "newEventProviderName",
    profile_pic: "newEventProviderProfilepic"
  };

  const eventProviderInput: EventProviderListInput = {
    name: "newEventProviderName",
    q: "string",
    _order: "asc",
    _sort: "id",
    _start: 1,
    _end: 1,
    profile_pic: "newEventProviderProfilepic"
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
  it("function createEventProvider positive test", async () => {
    const createEvent = await eventProviderService.createEventProvider(
      eventProvider.name,
      eventProvider.profile_pic
    );
    expect(createEvent[0].name).toBe(eventProvider.name);
    expect(createEvent[0].profile_pic).toBe(eventProvider.profile_pic);
  });

  it("function getAllEventProviders positive test", async () => {

    const getAllEventProviders = await eventProviderService.getAllEventProvidersForAdmin();

    expect(getAllEventProviders.count).toBeGreaterThan(0);
  });

  it("function getEventProvider positive test", async () => {
    const getEventProvider = await eventProviderService.getEventProvider(eventProvider.id);
    expect(getEventProvider.length).toBeGreaterThan(0);
    expect(getEventProvider[0].id).toBe(eventProvider.id);
  });

  it("function updateEventProvidersForAdmin positive test", async () => {
    const getEventProvider = await eventProviderService.getEventProvider(eventProvider.id);
    expect(getEventProvider[0].id).toBe(eventProvider.id);

    const updateEventProvider = await eventProviderService.updateEventProvidersForAdmin(
      eventProvider.id,
      eventProviderInput);
    expect(updateEventProvider[0].name).toBe(newEventProvider.name);
    expect(updateEventProvider[0].profile_pic).toBe(newEventProvider.profile_pic);
  });

  it("function createEventProvider negative test", async () => {
    try {
      await eventProviderService.createEventProvider(
        eventProvider.name,
        eventProvider.profile_pic
      );
    } catch (err) {
      expect(err).toBeInstanceOf(DuplicatenameError);
    }
  });

  it("function getAllEventProviders negative test", async () => {
    const input = { q: 'zzzzz' }
    const getAllEventProviders = await eventProviderService.getAllEventProvidersForAdmin(
      input);

    expect(getAllEventProviders.count).toBe(0);
  });

  it("function getEventProvider negative test", async () => {
    const getEventProvider = await eventProviderService.getEventProvider(200);
    expect(getEventProvider[0]).toBeUndefined();
  });

  it("function updateEventProvidersForAdmin negative test", async () => {
    const getEventProvider = await eventProviderService.getEventProvider(0);
    expect(getEventProvider[0]).toBeUndefined();

    const updateEventProvider = await eventProviderService.updateEventProvidersForAdmin(
      200,
      eventProviderInput);
    expect(updateEventProvider[0]).toBeUndefined();
  });
});