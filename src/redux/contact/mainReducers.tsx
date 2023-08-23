import { combineReducers } from "redux";
import { createContactReducer,  } from "./reducers";

export const reducer = combineReducers({
  CREATECONTACT: createContactReducer,
});
