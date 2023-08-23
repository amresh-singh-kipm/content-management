import { ACTION } from "./types";
import { ActionInterface } from "../../Interfaces/interface";

export interface showContact {
  contact: any[];
}

const initState: showContact = {
  contact: [],
};

export const createContactReducer = (
  state = initState,
  { type, payload }: ActionInterface
) => {
  switch (type) {
    case ACTION.CREATE_CONTACT:
      return {
        ...state,
        contact: [...state.contact, payload],
      };
    case ACTION.DELETE_CONTACT:
      return {
        ...state,
        contact: payload,
      };
    case ACTION.EDIT_CONTACT:
      return {
        ...state,
        contact: state.contact.map((item) =>
          item.id === payload.id
            ? {
                ...item,
                fname: payload.fname,
                lname: payload.lname,
                status: payload.status,
              }
            : item
        ),
      };
    default:
      return state;
  }
};
