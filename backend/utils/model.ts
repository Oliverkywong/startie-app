export interface User {
  id: number;
  username: string;
  password: string;
  email: string;
  status_id: number;
  profilepic: string;
  phonenumber: string;
  description: string;
  clickrate: number;
  team_id: number;
  event_id: number;
}

export interface Team {
  id: number;
  name: string;
  searchcategory_id: number;
  description?: string;
  profilepic?: string;
  status_id: number;
  clickrate: number;
}

export interface Team_Tags {
  team_id: number;
  tag_id: number;
}

export interface Job {
  id: number;
  name: string;
  description?: string;
  status_id: number;
  clickrate: number;
}

export interface Event {
  id: number;
  name: string;
  description?: string;
  maxteammember: number;
  profilepic?: string;
  starttime: Date;
  status_id: number;
  clickrate: number;
}

