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
}

export interface Team {
  id: number;
  name: string;
  description?: string;
  profilepic?: string;
}

export interface Job {
  id: number;
  name: string;
  description: string;
}

export interface Event {
  id: number;
  name: string;
  description: string;
  profilepic?: string;
  // starttime(
  //   year: number,
  //   month: number,
  //   date?: number,
  //   hours?: number,
  //   minutes?: number
  // ): Date;
  starttime?: string;
}

export interface UserId_Username {
  userId: number;
  username: string;
}
declare global {
  namespace Express {
    interface Request {
      user?: UserId_Username;
    }
  }
}
