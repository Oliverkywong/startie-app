export interface UserInfo {
  id: number;
  username: string;
  profilepic: string;
  description: string;
  phonenumber: string;
  tags: string[];
  shortDescription: string;
  email: string;
}

export interface Team {
  shortDescription: string;
  id: number;
  name: string;
  description: string;
  profilepic: string;
  tags: string[];
}

export interface EventInfo {
  shortDescription: string;
  category: string;
  id: number;
  provider_name: string;
  event_name: string;
  name: string;
  description: string;
  event_profilepic: string;
  event_provider_profile_pic: string;
  starttime: string;
}

export interface Tag {
  id: number;
  name: string;
}

export interface Looking {
  id: number;
  name: string;
}

export interface TeamData {
  id: number;
  name: string;
  shortDescription: string;
  description: string;
  profilepic: string;
}

export interface TeamMember {
  shortDescription: string;
  id: number;
  username: string;
  profilepic: string;
  description: string;
}

export interface userInfoState {
  userinfo: UserInfo;
  team: Team[];
}

export interface Note {
  id: number;
  content: string;
  created_at: string;
}
