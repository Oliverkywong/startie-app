export interface UserInfo {
  id: number;
  username: string;
  profilepic: string;
  description: string;
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