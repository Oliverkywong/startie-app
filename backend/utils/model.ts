export interface User {
  id: number;
  username: string;
  password: string;
  email: string;
  isadmin: boolean
  status_id: number | string;
  profilepic: string;
  phonenumber: string | number;
  shortDescription: string;
  description: string;
  clickrate: number;
  team_id: number;
  event_id: number;
}

export interface Team {
  id: number;
  name: string;
  searchcategory_id: number;
  shortDescription: string;
  description: string;
  profilepic: string;
  status_id: number | string;
  clickrate: number;
}

export interface Team_Tags {
  team_id: number;
  tag_id: number;
}

export interface User_Tag {
  user_id: number;
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
  name:string;
  description: string;
  provider_name?: string;
  shortDescription: string;
  maxteammember: number;
  profilepic: string;
  starttime: Date;
  status_id: number ;
  clickrate: number;
  searchcategory_id: number,
  event_provider_id: number ,
}

export interface Event_Provider {
  id: number;
  name: string;
  profile_pic: string;
}

export interface User_Team {
  user_id: number | string;
  team_id: number | string;
  isboard?: boolean;
  iswaiting?: boolean;
  applytime?: Date | string;
  quittime?: Date | string;
  isfollow?: boolean;
}

export interface Category {
  id: number | string;
  name: string;
  profilepic?: string;
}

export interface Tag {
  id: number
  name: string
  searchcategory_id: number
}

export interface Team_Tag {
  team_id: number
  tag_id: number
}