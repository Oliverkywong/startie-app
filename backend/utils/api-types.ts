export type EventListData = { //type of list of events for EventList of react admin and for getAllEvents
  events?: Array<{
    id: number;
    event_name: string;
    provider_name: string;
    status: string;
    searchcategory_id: string | number;
    description: string;
    shortDescription: string;
    maxteammember: number;
    starttime: string;
    profilepic: string;
    clickrate: number;
    created_at: string;
  }>;
  error?:string
};

export type EventListInput = { //input query from react admin
  name?: string;
  q?: string;
  event_name?: string;
  provider_name?: string;
  profilepic?: string;
  searchcategory_id?: number | string;
  description?: string;
  shortDescription?: string;
  maxteammember?: number | string;
  status_id?: number | string;
};
// ====================================================================================================================
export type TeamListData = {
  teams?: {rows?:Array<{
    id: number;
    name: string;
    status: string;
    category: string;
    users: string[];
    description: string;
    shortDescription: string;
    tags: string[];
    clickrate: number;
    profilepic: string;
  }>};
  error?:string
};

export type TeamListInput = {
  name?: string;
  q?: string;
  searchcategory_id?: number | string;
  profile_pic?: string;
  description?: string;
  shortDescription?: string;
  tags?: number | string;
  status_id?: number | string;
};

// ====================================================================================================================
export type UserListData = {
  user?: Array<{
    id: number;
    username: string;
    isadmin: boolean;
    status: string;
    email: string;
    shortDescription: string;
    description: string;
    profilepic: string;
    tags: string[];
  }>;
  error?:string
};

export type UserListInput = {
  name?: string;
  q?: string;
  email?: string;
  isadmin?: boolean;
  description?: string;
  shortDescription?: string;
  phonenumber?: number | string;
  status_id?: number | string;
  profilepic?: string;
  tags?: string[];
};
// ====================================================================================================================
export type EventProviderListData = {
  event_provider?: Array<{
    id: number;
    name: string;
    profile_pic?: string;
  }>;
  error?:string
};

export type EventProviderListInput = {
  name?: string;
  q?: string;
  profile_pic?: string;
};
    
// ====================================================================================================================