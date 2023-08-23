import React, { ChangeEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { showContact } from "../redux/contact/reducers";
import { useDispatch } from "react-redux";
import { deleteContact } from "../redux/contact/actions";
import { useNavigate } from "react-router-dom";

const ContactDetails: React.FC = () => {
  const { contact } = useSelector<any, showContact>(
    (state) => state.CREATECONTACT
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const deleteData = (id: string) => {
    let remainContact: any = contact.filter((contact) => contact.id !== id);
    dispatch(deleteContact(remainContact));
  };
  const editContact = (id: number) => {
    navigate(`/form?index=${id}`);
  };
  console.log("contact", contact);
  return (
    <>
      {contact.map((contact, index) => {
        const { id, fname, lname, status } = contact;
        return (
          <div className="flex items-center justify-center" key={index}>
            <div className="bg-white shadow-lg rounded-lg p-4 w-72">
              <img
                src="avatar.jpg"
                alt="User Avatar"
                className="w-16 h-16 mx-auto rounded-full border-2"
              />
              <h2 className="text-2xl font-semibold text-center mt-2">
                {fname} {lname}
              </h2>
              <p className="text-gray-600 text-center">
                Status: <span id="status">{status}</span>
              </p>
              <button
                id="toggleStatus"
                className="block w-full mt-4 bg-red-400 border text-white py-2 rounded-full  hover:text-red-400 hover: border-red-400 hover:bg-slate-50
          "
                onClick={() => deleteData(id)}
              >
                Delete
              </button>
              <button
                id="toggleStatus"
                className="block w-full mt-4 bg-red-400 border text-white py-2 rounded-full  hover:text-red-400 hover: border-red-400 hover:bg-slate-50"
                onClick={() => editContact(index)}
              >
                Edit
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ContactDetails;
