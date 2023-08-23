import { ActionInterface, contactInterface } from "../../Interfaces/interface";
import { showContact } from "./reducers";
import { ACTION } from "./types";

export const createContact = (data: contactInterface): ActionInterface => {
  return {
    type: ACTION.CREATE_CONTACT,
    payload: data,
  };
};

export const deleteContact = (data: showContact): ActionInterface => {
  return {
    type: ACTION.DELETE_CONTACT,
    payload: data,
  };
};
// export const showAllContact = (data) => {};
export const editContact = (data: contactInterface): ActionInterface => {
  return {
    type: ACTION.EDIT_CONTACT,
    payload: data,
  };
};
