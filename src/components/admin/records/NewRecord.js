import React, { useState, Fragment, useEffect, useRef } from "react";

import "./style.css";
import data from "./mock-data.json";
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";

import Cookies from "js-cookie";

import { Circles } from "react-loader-spinner";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const NewRecord = () => {
  const options = [
    { value: "", text: "-- choose product type --" },
    { value: "coffee", text: "coffee" },
    { value: "tea leaves", text: "tea leaves" },
    { value: "milk", text: "milk" },
  ];

  const [names, setNames] = useState({
    producttype: options[0].value,
  });

  const [contacts, setContacts] = useState(data);
  const [addFormData, setAddFormData] = useState({
    id: "",
    username: "",
    producttype: "",
    created: "",
    company: "",
    weight: "",
  });

  const [editFormData, setEditFormData] = useState({
    id: "",
    username: "",
    producttype: "",
    created: "",
    company: "",
    weight: "",
  });

  const [editContactId, setEditContactId] = useState(null);

  const [foundErr, setFoundErr] = useState(null);
  const [foundErrAdd, setFoundErrAdd] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [isLoadingAdd, setIsLoadingAdd] = useState(null);
  const [isLoadingSave, setIsLoadingSave] = useState(null);

  //analysis Constants
  const [totalRecords, settotalRecords] = useState(null);

  //clear inputs
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  //handle product type input
  const onProducttypeChange = (event) => {
    // if (names.gender.length >= 1) {
    //   setFlag(1);
    // } else {
    //   setFlag(2);
    // }
    // Spreading "...state" ensures we don't "lose" fname,lname,email... etc
    setNames((names) => ({
      ...names,
      producttype: event.target.value,
    }));

    //update the form fields before updating
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);

    console.log(addFormData.producttype);
  };

  useEffect(() => {
    //fetch agents
    const fetchAll = () => {
      let adminCookie = Cookies.get("id");
      if (adminCookie >= 1) {
        setIsLoading(true);

        setTimeout(() => {
          fetch("https://terraweb.herokuapp.com/getdailyrecords", {
            method: "post",
            headers: { "Content-Type": "application/JSON" },
            body: JSON.stringify({
              id: adminCookie,
            }),
          })
            .then(function (response) {
              if (response.status === 400) {
                throw Error("Wrong credentials");
              }
              if (response === 500) {
                throw Error("Could not complete request because of an error");
              }

              return response.json();
            })
            .then((user) => {
              console.log(user);
              if (user[0].id >= 1) {
                setFoundErr(null);

                setIsLoading(null);
                setContacts(user);
                loadAnalysis(user);
                console.log(user);

                //load data
              } else {
                //dont load

                setFoundErr(null);
                setIsLoading(null);
              }
            })
            .catch((err) => {
              // setFoundErr(err.message);
              setIsLoading(null);
              // setFlag(1);
            });
        }, 2000);
      } else {
        setIsLoading(null);
      }
    };

    fetchAll();
  }, []);

  //load analysis
  const loadAnalysis = (datamap) => {
    settotalRecords(datamap.length);
  };

  //fetch users
  const fetchRecords = () => {
    let adminCookie = Cookies.get("id");
    if (adminCookie >= 1) {
      setIsLoading(true);

      setTimeout(() => {
        fetch("https://terraweb.herokuapp.com/getdailyrecords", {
          method: "post",
          headers: { "Content-Type": "application/JSON" },
          body: JSON.stringify({
            id: adminCookie,
          }),
        })
          .then(function (response) {
            if (response.status === 400) {
              throw Error("Wrong credentials");
            }
            if (response === 500) {
              throw Error("Could not complete request because of an error");
            }

            return response.json();
          })
          .then((user) => {
            console.log(user);
            if (user[0].id >= 1) {
              setFoundErr(null);

              setIsLoading(null);
              setContacts(user);
              loadAnalysis(user);

              //load data
            } else {
              //dont load

              setFoundErr(null);
              setIsLoading(null);
            }
          })
          .catch((err) => {
            // setFoundErr(err.message);
            setIsLoading(null);
            // setFlag(1);
          });
      }, 2000);
    } else {
      setIsLoading(null);
    }
  };

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    console.log("my field name ", fieldName);
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  //refresh after add records
  const refreshRecords = () => {
    fetchRecords();
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newContact = {
      company: addFormData.company,
      producttype: addFormData.producttype,
      weight: addFormData.weight,
    };

    if (
      newContact.company.length >= 1 &&
      newContact.producttype.length >= 1 &&
      newContact.weight.length >= 1
    ) {
      //send add agent request

      // let adminCookie = Cookies.get("id");
      let adminCookie = "yes";
      if (adminCookie === "yes") {
        setIsLoadingAdd(true);
        setTimeout(() => {
          fetch("https://localhost:8000/addnrecord", {
            method: "post",
            headers: { "Content-Type": "application/JSON" },
            body: JSON.stringify({
              id: adminCookie,
              producttype: newContact.producttype,
              weight: newContact.weight,

              company: newContact.company,
            }),
          })
            .then(function (response) {
              if (response.status === 400) {
                throw Error("An error occurred while adding records. ");
              }
              if (response === 500) {
                throw Error("Could not complete request because of an error");
              }

              return response.json();
            })
            .then((user) => {
              console.log(user);
              if (user) {
                setFoundErr(null);

                setIsLoadingAdd(null);
                // setContacts(user);

                //refresh data
                refreshRecords();

                //clear textboxes
                usernameRef.current.value = "";
                emailRef.current.value = "";
                passwordRef.current.value = "";

                //load data
              } else {
                //dont load

                setFoundErrAdd(null);
                setIsLoadingAdd(null);
                addFormData.username = "";
              }
            })
            .catch((err) => {
              setFoundErrAdd(err.message);
              setIsLoadingAdd(null);
              newContact.username = "";

              // setFlag(1);
            });
        }, 1000);
      } else {
        setIsLoadingAdd(null);
      }
    } else {
      console.log("unable to proceed");
    }
  };

  return (
    <div className="app-container center mt6">
      {isLoading ? (
        <div className="db mb2">
          <Circles type="Oval" color="#000080" height={40} width={80} />
        </div>
      ) : null}

      <div className="dib-l">
        <label className="ma2 white f3 b">
          Total Weight for all companies
          <label className="strong red ml2 mr2">{totalRecords}</label>
        </label>

        <label className="ma2 white f3 b">
          Last Recorded
          <label className="strong red ml2 mr2"></label>
        </label>
      </div>

      <h2 className="f3 b white">Add New Record</h2>
      <div>
        <input
          className="br-pill"
          type="text"
          name="company"
          required="required"
          placeholder="Enter a company..."
          onChange={handleAddFormChange}
        />
        <select
          className="rounded pa2 ma2 f4 bg-white tracked br-pill w-25-l w-25-m"
          value={names.producttype}
          onChange={onProducttypeChange}
          name="producttype"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.text}
            </option>
          ))}
        </select>

        <input
          className="br-pill"
          type="number"
          name="weight"
          placeholder="Enter weight (Kgs)"
          onChange={handleAddFormChange}
        />

        {isLoadingAdd ? (
          <div className="dib ml2 mr2">
            <Circles type="Oval" color="#000080" height={20} width={40} />
          </div>
        ) : null}

        <label
          className=" br-pill bg-white orange f4  b pa2 hover-bg-orange hover-white"
          type="submit"
          onClick={handleAddFormSubmit}
        >
          Add
        </label>

        {foundErrAdd ? (
          <label className="dt red  pb2">{foundErrAdd}</label>
        ) : null}
      </div>
    </div>
  );
};

export default NewRecord;
