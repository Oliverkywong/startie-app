import { Knex } from "knex";
import { EventProviderListData, EventProviderListInput } from "../utils/api-types";
import { Event_Provider } from "../utils/model";

export class EventProviderService {
  constructor(private knex: Knex) {}

  // -------------------------------------------------------------------------------------------------------------------
  // create event provider 
  // -------------------------------------------------------------------------------------------------------------------
  async createEventProvider(
    name: string,
    profile_pic?: string,
  ) {
      const eventProvider = await this.knex<Event_Provider>("event_provider")
        .insert({
          name: name,
          profile_pic: profile_pic
        })
        .into("event_provider")
        .returning("*");

      return eventProvider;
  }
  // -------------------------------------------------------------------------------------------------------------------
  // get all events providers
  // -------------------------------------------------------------------------------------------------------------------
  async getAllEventProvidersForAdmin(
    input: EventProviderListInput
  ): Promise<EventProviderListData> {
    let query = this.knex<Event_Provider>("event_provider")
      .select("*")
  
      if (input.name) {
        query = query.where("name", "ilike", `%${input.name}%`);
      }
      if (input.q) {
        query = query.where("name", "ilike", `%${input.q}%`);
      }

      if (input._sort && input._order) {
        query = query.orderBy(`${input._sort}`, `${input._order}`)
      }

      // if (input._end && input._start) {
      //   query = query.offset(input._start).limit(input._end);
      // }
      
      let event_provider = await query
      
      return {event_provider};
  }

  // -------------------------------------------------------------------------------------------------------------------
  // get one event ✅
  // -------------------------------------------------------------------------------------------------------------------
  async getEventProvider(id: string | number) {
    return await this.knex<Event_Provider>("event_provider")
    .select("*")
    .where("id", id);
  }

  // -------------------------------------------------------------------------------------------------------------------
  // update event for Admin
  // -------------------------------------------------------------------------------------------------------------------
  async updateEventProvidersForAdmin(eventId: number, input: EventProviderListInput) {
    const eventProviderInfo = await this.knex<Event_Provider>("event_provider")
      .update({
        name: input.name
      })
      .where("id", eventId)
      .returning("*");

    return eventProviderInfo;
  }
}
