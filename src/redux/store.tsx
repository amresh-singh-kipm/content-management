import { createStore } from "redux";
import { reducer } from "./contact/mainReducers";

export const store: any = createStore(reducer);
// export default store;
