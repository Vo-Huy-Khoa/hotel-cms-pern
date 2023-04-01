import { VisibilityActionTypes } from "./redux/actions";

export interface IUser {
  id: number;
  user_name: string;
  full_name: string;
  email: string;
  password: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface IClient {
  id: number;
  name: string;
  email: string;
  identity_number: string;
  phone: string;
  created_at: string;
  updated_at: string;
}

export interface IRoomType {
  id: number;
  name: string;
  count: number;
  price: string;
  created_at: string;
  updated_at: string;
}

export interface IRoom {
  id: number;
  room_type_id: number;
  name: string;
  description: string;
  image: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface IBooking {
  id: number;
  room: string;
  client: string;
  check_in: string;
  check_out: string;
  created_at: string;
  updated_at: string;
}

export interface SetVisibilityAction {
  type: VisibilityActionTypes.SET_VISIBILITY;
  payload: boolean;
}

export interface ClearVisibilityAction {
  type: VisibilityActionTypes.CLEAR_VISIBILITY;
}

export type SelectVisibilityAction =
  | SetVisibilityAction
  | ClearVisibilityAction;
