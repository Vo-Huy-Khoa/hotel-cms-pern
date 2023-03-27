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
  full_name: string;
  email: string;
  identity_number: string;
  phone: string;
  created_at: string;
  updated_at: string;
}

export interface IRoomType {
  id: number;
  name: string;
  count: string;
  price: string;
  created_at: string;
  updated_at: string;
}

export interface IRoom {
  id: number;
  name: string;
  description: string;
  image: string;
  created_at: string;
  updated_at: string;
}

export interface IBooking {
  id: number;
  user_id: string;
  room_id: string;
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
