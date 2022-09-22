export interface UserInfo {
  id: number;
  username: string;
  profilepic: string | null;
  description: string;
  phonenumber: string;
  tags: string[];
  shortDescription: string;
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
