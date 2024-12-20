import { Knex } from "knex";
import { EventListData, EventListInput } from "../utils/api-types";
import { Event } from "../utils/model";

export class DuplicatenameError extends Error {
  constructor(msg?: string) {
    super(msg);
    Object.setPrototypeOf(this, DuplicatenameError.prototype);
  }
}

export class EventService {
  constructor(private knex: Knex) { }

  // -------------------------------------------------------------------------------------------------------------------
  // create event ✅
  // -------------------------------------------------------------------------------------------------------------------
  async createEvent(
    EventName: string,
    description: string,
    maxteammember: number,
    profilepic: string,
    starttime: Date,
    shortDescription: string,
    searchcategory_id: number,
    event_provider_id: number,
  ) {
    const event = await this.knex<Event>("event")
      .select("*")
      .where("name", EventName);
    if (event.length > 0) {
      throw new DuplicatenameError();
    }

    const eventInfo = await this.knex<Event>("event")
      .insert({
        name: EventName,
        description: description,
        maxteammember: maxteammember,
        profilepic: profilepic,
        starttime: starttime,
        shortDescription: shortDescription,
        searchcategory_id: searchcategory_id,
        event_provider_id: event_provider_id,
        status_id: 1,
      })
      .into("event")
      .returning("*");

    return eventInfo;
  }
  // -------------------------------------------------------------------------------------------------------------------
  // get All Events ✅
  // -------------------------------------------------------------------------------------------------------------------
  async getAllEvents(
    show: boolean,
    input?: EventListInput,
  ): Promise<EventListData> {
    let query = this.knex<Event>("event")
      .select(
        "event.id",
        "event.name AS event_name",
        "status.name as status",
        "searchcategory.name as category",
        "description",
        "shortDescription",
        "maxteammember",
        "event_provider.name AS provider_name",
        "event_provider.id as event_provider_id",
        "event_provider.profile_pic as event_provider_profile_pic",
        "starttime",
        "event.profilepic as event_profilepic",
        "clickrate",
        "event.created_at"
      )
      .join("status", "status_id", "status.id")
      .join("searchcategory", "event.searchcategory_id", "searchcategory.id")
      .join("event_provider", "event_provider.id", "event.event_provider_id")

    if (input?.name) {
      query = query.where("event.name", "ilike", `%${input?.name}%`);
    }
    if (input?.q) {
      query = query.where("event.name", "ilike", `%${input?.q}%`);
    }
    if (input?.description) {
      query = query.where("description", "ilike", `%${input?.description}%`);
    }
    if (input?.shortDescription) {
      query = query.where("shortDescription", "ilike", `%${input?.shortDescription}%`);
    }
    if (input?.status_id) {
      query = query.where("status.id", "=", `${input?.status_id}`);
    }
    if (input?.maxteammember) {
      query = query.where("maxteammember", "<=", `${input?.maxteammember}`);
    }
    if (input?.event_provider_id) {
      query = query.where("event_provider_id", "=", `${input?.event_provider_id}`);
    }
    if (input?.searchcategory_id) {
      query = query.where("searchcategory.id", "=", `${input?.searchcategory_id}`);
    }

    const count = await query

    if (show && input?._sort && input?._order && input?._start && input?._end) {
      query = query
        .orderBy(`${input?._sort}`, `${input?._order}`)
        .limit(input?._end - input?._start)
        .offset(input?._start);
    } else {
      query = query.orderBy('id', 'asc').where('status_id', 1)
    }

    let events = await query

    return { events: events, count: count.length };
  }

  // -------------------------------------------------------------------------------------------------------------------
  // get one event ✅
  // -------------------------------------------------------------------------------------------------------------------
  async getEvent(id: string | number) {
    return await this.knex<Event>("event")
      .select("event.id",
        "event.name AS event_name",
        "searchcategory.name as category",
        "description",
        "shortDescription",
        "maxteammember",
        "event_provider.name AS provider_name",
        "event_provider.profile_pic as event_provider_profile_pic",
        "status.name as status",
        "event.status_id",
        "event.searchcategory_id",
        "starttime",
        "event.profilepic as event_profilepic",
        "clickrate",
        "event.created_at")
      .innerJoin("searchcategory", "event.searchcategory_id", "searchcategory.id")
      .innerJoin("event_provider", "event_provider.id", "event.event_provider_id")
      .innerJoin("status", "status_id", "status.id")
      .where("event.id", id);
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
        searchcategory_id: input.searchcategory_id,
        shortDescription: input.shortDescription,
      })
      .where("id", eventId)
      .returning("*");

    return eventInfo;
  }
}
