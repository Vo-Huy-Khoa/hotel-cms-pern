import { combineReducers } from "@reduxjs/toolkit";
import currentVisibilityReducer from "./visibility";

const rootReducer = combineReducers({
  currentVisibility: currentVisibilityReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
