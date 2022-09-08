import { EventController } from "../eventController";
import { EventService } from "../../services/eventService";
import { Knex } from "knex";
import type { Request, Response } from "express";

jest.mock("../../services/EventService");

describe("EventController test", () => {
  let controller: EventController;
  let service: EventService;
  let req: Request;
  let res: Response;

  beforeEach(() => {
    service = new EventService({} as Knex);
    service.createEvent = jest.fn(() =>
      Promise.resolve([
        {
          id: 0,
          name: "createEventName",
          description: "crateEventDescription",
          profilepic: "createEventProfilepic.jpg",
          clickrate: 0,
          starttime: new Date("2021-05-01 00:00:00"),
          status_id: 1,
        },
      ])
    );
    service.getEvent = jest.fn(() =>
      Promise.resolve([
        {
          id: 1,
          name: "getEventName",
          description: "getEventDescription",
          profilepic: "getEventProfilepic.jpg",
          clickrate: 0,
          starttime: new Date("2021-05-01 00:00:00"),
          status_id: 1,
        },
      ])
    );
    service.getAllEvents = jest.fn(() =>
      Promise.resolve([
        {
          id: 2,
          name: "getAllEventsName",
          description: "getAllEventsDescription",
          profilepic: "getAllEventsProfilepic.jpg",
          clickrate: 0,
          starttime: new Date("2021-05-01 00:00:00"),
          status_id: 1,
        },
        {
          id: 3,
          name: "getAllEventsName2",
          description: "getAllEventsDescription2",
          profilepic: "getAllEventsProfilepic.jpg2",
          clickrate: 0,
          starttime: new Date("2021-05-01 00:00:00"),
          status_id: 1,
        },
        {
          id: 4,
          name: "getAllEventsName3",
          description: "getAllEventsDescription3",
          profilepic: "getAllEventsProfilepic.jpg3",
          clickrate: 0,
          starttime: new Date("2021-05-01 00:00:00"),
          status_id: 1,
        },
      ])
    );

    service.updateEvent = jest.fn(() =>
      Promise.resolve([
        {
          id: 2,
          name: "updateEventName",
          description: "updateEventDescription",
          profilepic: "updateEventProfilepic.jpg",
          clickrate: 0,
          starttime: new Date("2021-05-01 00:00:00"),
          status_id: 0,
        },
      ])
    );

    req = { params: {}, query: {}, body: {} } as Request;
    res = { status: jest.fn(() => res), json: jest.fn() } as any as Response;
    controller = new EventController(service);
  });

  it("createEvent", async () => {
    await controller.createEvent(req, res);
    expect(service.createEvent).toBeCalled();
    expect(res.json).toBeCalledWith([
      {
        id: 0,
        name: "createEventName",
        description: "crateEventDescription",
        profilepic: "createEventProfilepic.jpg",
        starttime: new Date("2021-05-01 00:00:00"),
        status_id: 1,
        clickrate: 0,
      },
    ]);
    expect(res.json).toBeCalledTimes(1);
  });

  it("getAllEvents", async () => {
    await controller.getAllEvents(req, res);
    expect(service.getAllEvents).toBeCalled();
    expect(res.json).toBeCalledWith([
      {
        id: 2,
        name: "getAllEventsName",
        description: "getAllEventsDescription",
        profilepic: "getAllEventsProfilepic.jpg",
        clickrate: 0,
        starttime: new Date("2021-05-01 00:00:00"),
        status_id: 1,
      },
      {
        id: 3,
        name: "getAllEventsName2",
        description: "getAllEventsDescription2",
        profilepic: "getAllEventsProfilepic.jpg2",
        clickrate: 0,
        starttime: new Date("2021-05-01 00:00:00"),
        status_id: 1,
      },
      {
        id: 4,
        name: "getAllEventsName3",
        description: "getAllEventsDescription3",
        profilepic: "getAllEventsProfilepic.jpg3",
        clickrate: 0,
        starttime: new Date("2021-05-01 00:00:00"),
        status_id: 1,
      },
    ]);
    expect(res.json).toBeCalledTimes(1);
  });

  it("getEvent", async () => {
    await controller.getEvent(req, res);
    expect(service.getEvent).toBeCalled();
    expect(res.json).toBeCalledWith([
      {
        id: 1,
        name: "getEventName",
        description: "getEventDescription",
        profilepic: "getEventProfilepic.jpg",
        starttime: new Date("2021-05-01 00:00:00"),
        clickrate: 0,
        status_id: 1,
      },
    ]);
    expect(res.json).toBeCalledTimes(1);
  });

  it("updateEvent", async () => {
    await controller.updateEvent(req, res);
    expect(service.updateEvent).toBeCalled();
    expect(res.json).toBeCalledWith([
      {
        id: 2,
        name: "updateEventName",
        description: "updateEventDescription",
        profilepic: "updateEventProfilepic.jpg",
        starttime: new Date("2021-05-01 00:00:00"),
        clickrate: 0,
        status_id: 0,
      },
    ]);
    expect(res.json).toBeCalledTimes(1);
  });
});
