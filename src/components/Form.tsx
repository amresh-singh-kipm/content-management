import React, { ReactElement, useEffect, useState } from "react";
import { contactInterface } from "../Interfaces/interface";
import { useDispatch } from "react-redux";
import { createContact, editContact } from "../redux/contact/actions";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { showContact } from "../redux/contact/reducers";
import { useLocation, useNavigate } from "react-router-dom";

function Form(): ReactElement {
  const { contact } = useSelector<any, showContact>(
    (state) => state.CREATECONTACT
  );
  const navigate = useNavigate();

  //initial state to save contact
  const initState: contactInterface = {
    id: uuidv4(),
    fname: "",
    lname: "",
    status: "",
  };
  const [contactDetails, setContactDetails] = useState(initState);

  const [edit, setEdit] = useState(false);

  let location = useLocation();
  let search = new URLSearchParams(location.search);

  //logic if we click on edit contact to show data
  useEffect(() => {
    let index = search.get("index");
    let id = Number(index);
    if (contact.length > 0 && index !== null) {
      setEdit(true);
      setContactDetails({
        id: contact[id].id,
        fname: contact[id].fname ?? "",
        lname: contact[id].lname ?? "",
        status: contact[id].status ?? "",
      });
    }
  }, []);

  const [errors, setErrors] = useState<{ [key: string]: string }>({
    fname: "",
    lname: "",
    status: "",
  });

  //function to validate fields
  const validateUser = (): boolean => {
    let isValid = true;
    const newErrors: { [key: string]: string } = {};

    if (contactDetails.fname === "") {
      newErrors.fname = "First name is required.";
      isValid = false;
    }

    if (contactDetails.lname === "") {
      newErrors.lname = "Last name is required.";
      isValid = false;
    }
    if (contactDetails.status === "") {
      newErrors.status = "Status is required.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  //function to take input
  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setContactDetails({ ...contactDetails, [name]: value });
  };

  const dispatch = useDispatch();
  //function to save contact data
  const onSubmit = () => {
    if (validateUser()) {
      if (edit) {
        console.log("if");
        dispatch(editContact(contactDetails));
        alert("Contact updated");
        navigate("/contact");
        setContactDetails(initState);
      } else {
        console.log("else");
        dispatch(createContact(contactDetails));
        alert("Contact created");
        setContactDetails(initState);
      }
    }
  };

  return (
    <div className="  md:w-2/3 mx-auto my-12 bg-white rounded-xl p-6 shadow-2xl">
      <h2 className="text-xl text-center font-semibold mb-4">Create Contact</h2>

      <div className="mb-4">
        <label
          htmlFor="fname"
          className="block text-gray-700 font-semibold mb-2"
        >
          First Name
        </label>
        <input
          type="text"
          id="fname"
          name="fname"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-red-400"
          placeholder="Enter First name"
          value={contactDetails.fname}
          onChange={handleChange}
        />
        {errors.fname && errors.fname}
      </div>

      <div className="mb-4">
        <label
          htmlFor="lname"
          className="block text-gray-700 font-semibold mb-2"
        >
          Last Name
        </label>
        <input
          type="text"
          id="lname"
          name="lname"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-red-400"
          placeholder="Enter Last name"
          value={contactDetails.lname}
          onChange={handleChange}
        />
        {errors.lname && errors.lname}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Status</label>
        <div className="flex justify-between">
          <label className="inline-flex items-center mr-4">
            <input
              type="radio"
              className="htmlForm-radio text-white-500"
              name="status"
              value="Inactive"
              checked={contactDetails.status === "Inactive"}
              onChange={handleChange}
            />
            <span className="ml-2">Inactive</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="htmlForm-radio text-white-500"
              name="status"
              value="Active"
              checked={contactDetails.status === "Active"}
              onChange={handleChange}
            />
            <span className="ml-2">Active</span>
          </label>
        </div>
        {errors.status && errors.status}
      </div>

      <div className="grid mt-6">
        <button
          type="submit"
          className="block w-full mt-4 bg-red-400 border text-white py-2 rounded-full  hover:text-red-400 hover: border-red-400 hover:bg-slate-50
          "
          onClick={onSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default Form;
