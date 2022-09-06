import { Knex } from "knex";
import { Event } from "../utils/model";

export class EventService {
  constructor(private knex: Knex) {}

  async getAllEvents() {
    return await this.knex<Event>("event")
      .select("id", "name", "description")
      .returning("*");
  }

  async createEvent(
    EventName: string,
    description?: string,
    profilepic?: string,
    // starttime?: Date
    starttime?: string
  ) {
    return await this.knex<Event>("event")
      .insert({
        name: EventName,
        description: description,
        profilepic: profilepic,
        starttime: starttime,
      })
      .into("event")
      .returning("*");
  }

  async getEvent(eventName: string) {
    return await this.knex<Event>("event")
      .select("id", "name", "description")
      .where("name", eventName)
      .returning("*");
  }

  async updateEvent(
    eventId: number,
    eventName?: string,
    description?: string,
    profilepic?: string,
    starttime?: string
  ) {
    if (
      eventName !== null ||
      description !== null ||
      profilepic !== null ||
      starttime !== null
    ) {
      return await this.knex<Event>("event")
        .update({
          name: eventName,
          description: description,
          profilepic: profilepic,
          starttime: starttime,
        })
        .where("id", eventId)
        .returning("*");
    } else {
      return;
    }
  }
}
