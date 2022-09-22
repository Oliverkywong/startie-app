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
  async getAllEvents(
    input: EventListInput,
    show: boolean
  ): Promise<EventListData> {
    let query = this.knex<Event>("event")
      .select(
        "event.id",
        "event.name",
        "status.name as status",
        "searchcategory.name as category",
        "description",
        "maxteammember",
        "starttime",
        "event.profilepic",
        "clickrate",
        "created_at"
      )
      .join("status", "status_id", "status.id")
      .join("searchcategory", "event.searchcategory_id", "searchcategory.id")
  
      if (input.name) {
        query = query.where("event.name", "ilike", `%${input.name}%`);
      }
      if (input.q) {
        query = query.where("event.name", "ilike", `%${input.q}%`);
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
      if (input.category_id) {
        query = query.where("searchcategory.id", "=", `${input.category_id}`);
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
  async getEvent(id: string | number) {
    return await this.knex<Event>("event").select("*").where("id", id);
  }

  // -------------------------------------------------------------------------------------------------------------------
  // update event for Admin
  // -------------------------------------------------------------------------------------------------------------------
  async updateEventForAdmin(eventId: number, input: EventListInput) {
    const eventInfo = await this.knex<Event>("event")
      .update({
        name: input.name,
        description: input.description,
        maxteammember: input.maxteammember,
        profilepic: input.profilepic,
        status_id: input.status_id,
      })
      .where("id", eventId)
      .returning("*");

    return eventInfo;
  }
  // // -------------------------------------------------------------------------------------------------------------------
  // // update event
  // // -------------------------------------------------------------------------------------------------------------------
  //   async updateEvent(
  //     eventId: number,
  //     eventName: string,
  //     description: string,
  //     maxteammember: number,
  //     profilepic: string,
  //     starttime: Date | string,
  //     newStatusId: number
  //   ) {
  //         const eventInfo = await this.knex<Event>("event")
  //           .update({
  //             name: eventName,
  //             description: description,
  //             maxteammember: maxteammember,
  //             profilepic: profilepic,
  //             starttime: starttime,
  //             status_id: newStatusId,
  //           })
  //           .where("id", eventId)
  //           .returning("*");

  //         return eventInfo;
  //       }
}
