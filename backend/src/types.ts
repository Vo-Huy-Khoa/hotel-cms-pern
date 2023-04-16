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

export interface SearchQuery {
  room_id?: string;
  name?: string;
  check_in?: string;
  check_out?: string;
}

export interface Booking {
  id: number;
  client_id: number;
  room_id: number;
  total_price?: number | null;
  check_in: Date;
  check_out: Date;
  created_at: Date;
  updated_at: Date;
  room: {
    name: string;
  };
  client: {
    name: string;
  };
}
