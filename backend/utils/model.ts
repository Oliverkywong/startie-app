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
