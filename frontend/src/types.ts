import { VisibilityActionTypes } from "./redux/actions";

export interface IUser {
  _id: string;
  user_name: string;
  full_name: string;
  email: string;
  identity_number: string;
  phone: string;
  role: string;
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
