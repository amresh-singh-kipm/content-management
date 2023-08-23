import React, { useEffect, useState } from "react";
import Form from "../components/Form";
import ContactDetails from "./ContactDetails";
import { useSelector } from "react-redux";
import { showContact } from "../redux/contact/reducers";

const Contact: React.FC = () => {
  const { contact } = useSelector<any, showContact>(
    (state) => state.CREATECONTACT
  );
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [showContact, setShowContact] = useState<boolean>(false);
  const openCreateForm = (): void => {
    setOpenForm(true);
    setShowContact(true);
  };

  useEffect(() => {
    if (contact.length > 0) setShowContact(true);
  }, []);

  return (
    <>
      <div className="flex justify-center items-center my-2">
        {openForm ? (
          <Form />
        ) : (
          <button
            className="  p-2 rounded-2xl bg-red-400 border  text-white drop-shadow-xl hover: border-red-400 hover:bg-slate-50 hover:text-red-400"
            onClick={openCreateForm}
          >
            Create Contact
          </button>
        )}
      </div>
      <div className="flex justify-center gap-4 py-3 items-center flex-wrap">
        {showContact ? (
          <ContactDetails />
        ) : (
          <p>No contact found. Please add contact from Create contact button</p>
        )}
      </div>
    </>
  );
};

export default Contact;
