import { VisibilityActionTypes } from "./redux/actions";

export interface IUser {
  id: string;
  user_name: string;
  full_name: string;
  email: string;
  identity_number: string;
  phone: string;
  role: string;
  status: string;
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
