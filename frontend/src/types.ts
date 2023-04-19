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
}

export interface IRoomType {
  id: number;
  name: string;
  count: string | undefined;
  price: string;
}

export interface IRoom {
  id: number;
  room_type_id: number;
  roomType: IRoomType;
  name: string;
  description: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface IBooking {
  id: number;
  room_id: number;
  room: IRoom;
  client: IClient;
  check_in: string;
  check_out: string;
  status: string;
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
  email: string;
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
  roomType: initIRoomType,
  name: "",
  description: "",
  status: "true",
  created_at: "",
  updated_at: "",
};

export const initBooking = {
  id: 1,
  room_id: 1,
  room: initRoom,
  client: initBodyClient,
  check_in: "",
  check_out: "",
  status: "true",
};
