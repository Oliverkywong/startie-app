export interface UserInfo {
  id: number;
  username: string;
  profilepic: string | null;
  description: string;
  tags: string[];
}

export interface Team {
  id: number;
  name: string;
  description: string;
  profilepic: string;
  tags: string[];
}

export interface Event {
  id: number;
  name: string;
  description: string;
  profilepic: string;
  starttime: string;
}

export interface Tag {
  id: number;
  name: string;
}

export interface TeamData {
  id: number;
  name: string;
  description: string;
  profilepic: string;
}

export interface TeamMember {
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
