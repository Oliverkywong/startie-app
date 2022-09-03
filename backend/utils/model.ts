export interface User {
  id: number;
  username: string;
  password: string;
  email: string;
  role_id: number;
}

export interface Team {
  id: number;
  name: string;
  description?: string;
  profilepic?: string;
}
