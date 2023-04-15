export interface IUser {
  id: number;
  user_name: string;
  full_name: string;
  password: string;
  email: string;
  status: boolean;
  created_at: Date;
  updated_at: Date;
}
