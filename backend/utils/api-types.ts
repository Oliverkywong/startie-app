export type EventListData = { //type of list of events for EventList of react admin and for getAllEvents
  events?: Array<{
    id: number;
    name: string;
    status: string;
    category: string;
    description: string;
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
  profilepic?: string;
  category_id?: number | string;
  description?: string;
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
    tags: string[];
    clickrate: number;
    profilepic: string;
  }>};
  error?:string
};

export type TeamListInput = {
  name?: string;
  q?: string;
  description?: string;
  tags?: number | string;
  status_id?: number | string;
};

// ====================================================================================================================
export type UserListData = {
  user?: Array<{
    id: number;
    username: string;
    status: string;
    email: string;
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
  description?: string;
  phonenumber?: number | string;
  status_id?: number | string;
  profilepic?: string;
  tags?: string[];
};
// ====================================================================================================================