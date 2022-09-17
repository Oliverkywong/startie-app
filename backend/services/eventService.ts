import { Knex } from "knex";
import { logger } from "../utils/logger";
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
      logger.error(err);
      throw err;
    }
  }
  // -------------------------------------------------------------------------------------------------------------------
  // get All Events ✅
  // -------------------------------------------------------------------------------------------------------------------
  async getAllEvents() {
    return await this.knex<Event>("event").select("*").orderBy('id', 'asc');
  }

  // -------------------------------------------------------------------------------------------------------------------
  // get one event ✅
  // -------------------------------------------------------------------------------------------------------------------
  async getEvent(id: string) {
    return await this.knex<Event>("event")
      .select("*")
      .where("id", id)
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
    starttime: Date,
    newStatusId: number
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
            status_id: newStatusId
          })
          .where("id", eventId)
          .returning("*");

        return eventInfo;
      } catch (err) {
        logger.error(err);
        throw err;
      }
    } else {
      return;
    }
  }
}
