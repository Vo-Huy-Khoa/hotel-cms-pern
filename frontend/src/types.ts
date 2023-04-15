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
  count: string | undefined;
  price: string;
  created_at: string;
  updated_at: string;
}

export interface IRoom {
  id: number;
  roomType: object;
  name: string;
  description: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface IBooking {
  id: number;
  room_id: number;
  room: object;
  client: object;
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

export type LoginRequestBody = {
  user_name: string;
  password: string;
};

export const initIRoomType = {
  id: 1,
  name: "",
  count: "",
  price: "",
  created_at: "",
  updated_at: "",
};

export const initBodyClient = {
  id: 1,
  name: "",
  email: "",
  identity_number: "",
  phone: "",
  created_at: "",
  updated_at: "",
};
export const initBodyBooking = {
  room_id: "",
  client_id: "",
  check_in: "",
  check_out: "",
  status: "true",
};

export const initRoom = {
  id: 1,
  room_type_id: 1,
  name: "",
  description: "",
  status: true,
};

export const initBooking = {
  id: 1,
  room_id: 1,
  room: "",
  client: "",
  check_in: "",
  check_out: "",
  created_at: "",
  updated_at: "",
};
