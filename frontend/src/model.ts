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
}

export interface Event {
  id: number;
  name: string;
  description: string;
  profilepic: string;
  starttime: string;
}
