import { combineReducers } from "redux";
import userReducers from "./userReducers";
import toDoReducers from "./toDoReducers";

export const reducers = combineReducers({
  user: userReducers,
  toDo: toDoReducers,
});
