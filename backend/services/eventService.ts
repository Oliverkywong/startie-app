import { Knex } from "knex";
import { EventListData, EventListInput } from "../utils/api-types";
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
    async getAllEvents(input:EventListInput, show: boolean): Promise<EventListData> {

      let query = this.knex<Event>("event").select("event.id", "event.name", "status.name as status", "description", "maxteammember", "starttime", "profilepic", "clickrate", "created_at").join("status", "status_id", "status.id");
  
      if (input.name) {
        query = query.where("event.name", "ilike", `%${input.name}%`);
      }
      if (input.description) {
        query = query.where("description", "ilike", `%${input.description}%`);
      }
      if (input.status_id) {
        query = query.where("status.id", "=", `${input.status_id}`);
      }
      if (input.maxteammember) {
        query = query.where("maxteammember", "<=", `${input.maxteammember}`);
      }
      if (show) {
        query = query.orderBy('id', 'asc')
      } else {
        query = query.orderBy('id', 'asc').where('status_id', 1)
      }

      let events = await query

      
      return {events};
  }

  // -------------------------------------------------------------------------------------------------------------------
  // get one event ✅
  // -------------------------------------------------------------------------------------------------------------------
  async getEvent(id: string) {
    return await this.knex<Event>("event").select("*").where("id", id);
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
    starttime: Date | string,
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
            status_id: newStatusId,
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
