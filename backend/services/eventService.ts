import { Knex } from "knex";
import { Event } from "../utils/model";

export class EventService {
  constructor(private knex: Knex) {}

// -------------------------------------------------------------------------------------------------------------------
// create event ✅
// -------------------------------------------------------------------------------------------------------------------
  async createEvent(
    EventName: string,
    description: string,
    maxteammember: number,
    profilepic: string,
    starttime: Date
  ) {
    try {
      const eventInfo = await this.knex<Event>("event")
        .insert({
          name: EventName,
          description: description,
          maxteammember: maxteammember,
          profilepic: profilepic,
          starttime: starttime,
          status_id: 1,
        })
        .into("event")
        .returning("*");

      return eventInfo;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
// -------------------------------------------------------------------------------------------------------------------
// get All Events ✅
// -------------------------------------------------------------------------------------------------------------------
  async getAllEvents() {
    return await this.knex<Event>("event")
      .select("*")
  }

// -------------------------------------------------------------------------------------------------------------------
// get one event ✅
// -------------------------------------------------------------------------------------------------------------------
  async getEvent(eventName: string) {
    return await this.knex<Event>("event")
      .select("id", "name", "description")
      .where("name", eventName)
      .returning("*");
  }

// -------------------------------------------------------------------------------------------------------------------
// update event ✅
// -------------------------------------------------------------------------------------------------------------------
  async updateEvent(
    eventId: number,
    eventName: string,
    description: string,
    maxteammember: number,
    profilepic: string,
    starttime: Date
  ) {
    if (
      eventName !== null ||
      description !== null ||
      maxteammember !== null ||
      profilepic !== null ||
      starttime !== null
    ) {
      try {
        const eventInfo = await this.knex<Event>("event")
          .update({
            name: eventName,
            description: description,
            maxteammember: maxteammember,
            profilepic: profilepic,
            starttime: starttime,
          })
          .where("id", eventId)
          .returning("*");

        return eventInfo;
      } catch (err) {
        console.error(err);
        throw err;
      }
    } else {
      return;
    }
  }
}
