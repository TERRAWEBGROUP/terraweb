import React, { useState, Fragment, useEffect, useRef } from "react";

import "./style.css";
import data from "./mock-data.json";
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";

import Cookies from "js-cookie";

import { Circles } from "react-loader-spinner";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const Records = () => {
  const options = [
    { value: "", text: "-- choose product type --" },
    { value: "coffee", text: "coffee" },
    { value: "tea leaves", text: "tea leaves" },
    { value: "milk", text: "milk" },
  ];

  const [names, setNames] = useState({
    producttype: options[0].value,
  });

  const [foundUsers, setFoundUsers] = useState();

  const [contacts, setContacts] = useState(data);
  const [addFormData, setAddFormData] = useState({
    id: "",
    fullname: "",
    producttype: "",
    daterecorded: "",
    company: "",
    weight: "",
  });

  const [editFormData, setEditFormData] = useState({
    id: "",
    fullname: "",
    producttype: "",
    daterecorded: "",
    companyname: "",
    weight: "",
  });

  const [editContactId, setEditContactId] = useState(null);

  const [foundErr, setFoundErr] = useState(null);
  const [foundErrAdd, setFoundErrAdd] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [isLoadingAdd, setIsLoadingAdd] = useState(null);
  const [isLoadingSave, setIsLoadingSave] = useState(null);

  //when record is successfully added
  const [successAdd, setSuccessAdd] = useState(null);

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
      try {
        let adminCookie = Cookies.get("sessionidadmin");
        if (adminCookie.length >= 1) {
          setIsLoading(true);

          setTimeout(() => {
            fetch("http://localhost:8000/getdailyrecords", {
              method: "post",
              headers: { "Content-Type": "application/JSON" },
              body: JSON.stringify({
                adminid: adminCookie,
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
                  // loadAnalysis(user);

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
      } catch (error) {}
    };

    fetchAll();
  }, []);

  //load analysis
  const loadAnalysis = (datamap) => {};

  //fetch users
  const fetchRecords = () => {
    try {
      let adminCookie = Cookies.get("sessionidadmin");
      if (adminCookie.length >= 1) {
        setIsLoading(true);

        setTimeout(() => {
          fetch("http://localhost:8000/getdailyrecords", {
            method: "post",
            headers: { "Content-Type": "application/JSON" },
            body: JSON.stringify({
              adminid: adminCookie,
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
                // loadAnalysis(user);

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
    } catch (error) {}
  };

  //check if user exists when full name is typed out
  const fetchUsers = () => {};

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
      companyname: addFormData.companyname,
      producttype: addFormData.producttype,
      weight: addFormData.weight,
      fullname: addFormData.fullname,
    };
    console.log(newContact);

    if (
      newContact.companyname.length >= 1 &&
      newContact.producttype.length >= 1 &&
      newContact.fullname.length >= 1 &&
      newContact.weight.length >= 1
    ) {
      //send add agent request
      let adminCookie = Cookies.get("sessionidadmin");
      if (adminCookie.length >= 1) {
        setIsLoadingAdd(true);
        setTimeout(() => {
          fetch("http://localhost:8000/addnewrecord", {
            method: "post",
            headers: { "Content-Type": "application/JSON" },
            body: JSON.stringify({
              adminid: adminCookie,
              producttype: newContact.producttype,
              weight: newContact.weight,
              fullname: newContact.fullname,
              companyname: newContact.companyname,
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
                setSuccessAdd(user);
                //refresh data
                refreshRecords();

                //load data
              } else {
                //dont load

                setFoundErrAdd(null);
                setIsLoadingAdd(null);
                // addFormData.fullname = "";
              }
            })
            .catch((err) => {
              console.log(err);
              setFoundErrAdd(err.message);
              setIsLoadingAdd(null);
              // newContact.fullname = "";

              // setFlag(1);
            });
        }, 1000);
      } else {
        setIsLoadingAdd(null);
      }
    }
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editFormData.id,
      companyname: editFormData.companyname,
      producttype: editFormData.producttype,
      weight: editFormData.weight,

      fullname: editFormData.fullname,
      daterecorded: editFormData.daterecorded,
    };

    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === editContactId);

    newContacts[index] = editedContact;

    // setContacts(newContacts);
    // setEditContactId(null);
    console.log(newContacts[index].id);

    //update

    let adminCookie = Cookies.get("sessionidadmin");
    if (adminCookie >= 1) {
      setIsLoadingSave(true);
      setTimeout(() => {
        fetch("http://localhost/updaterecord", {
          method: "post",
          headers: { "Content-Type": "application/JSON" },
          body: JSON.stringify({
            adminid: adminCookie,
            fullname: newContacts[index].fullname,
            companyname: newContacts[index].companyname,
            producttype: newContacts[index].producttype,
            weight: newContacts[index].weight,
            daterecorded: newContacts[index].daterecorded,
          }),
        })
          .then(function (response) {
            if (response.status === 400) {
              throw Error("An error occurred, during update.");
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

              setIsLoadingSave(null);

              refreshRecords();
              setEditContactId(null);
              //load data
            } else {
              //dont load

              setFoundErrAdd(null);
              setIsLoadingSave(null);
              // addFormData.username = "";
            }
          })
          .catch((err) => {
            setFoundErrAdd(err.message);
            setIsLoadingSave(null);

            // setFlag(1);
          });
      }, 1000);
    } else {
      setIsLoadingSave(null);
    }
  };

  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact.id);

    const formValues = {
      id: contact.id,
      companyname: contact.companyname,
      producttype: contact.producttype,
      weight: contact.weight,
      fullname: contact.fullname,
      daterecorded: contact.daterecorded,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditContactId(null);
  };

  return (
    <div className="app-container center mt6 ">
      {isLoading ? (
        <div className="db mb2">
          <Circles type="Oval" color="#000080" height={40} width={80} />
        </div>
      ) : null}

      <div className="dib-l">
        <label className="ma2 white f3 b">
          Total Weight
          <label className="strong red ml2 mr2">{totalRecords}</label>
        </label>

        <label className="ma2 white f3 b">
          Last Recorded
          <label className="strong red ml2 mr2"></label>
        </label>
      </div>
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Product Type</th>
              <th>Weight</th>
              <th>Company</th>
              <th>Full Name</th>

              <th>Recorded</th>
              <th>Edit records</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <Fragment key={contact.id}>
                {editContactId === contact.id ? (
                  <EditableRow
                    handleEditFormSubmit={handleEditFormSubmit}
                    isLoadingSave={isLoadingSave}
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnlyRow
                    contact={contact}
                    handleEditClick={handleEditClick}
                    // handleDeleteClick={handleDeleteClick}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>
      <div>
        {foundErr ? <label className="dt red  pb2">{foundErr}</label> : null}

        <button
          className="ml2 br-pill bg-white orange f3 pa3 b mt2 hover-bg-orange hover-white"
          onClick={refreshRecords}
        >
          Refresh
        </button>
      </div>

      <h2 className="f3 b white">Add New Record</h2>
      <div className="">
        <input
          className="br-pill"
          type="text"
          name="company"
          required="required"
          placeholder="Enter a company..."
          onChange={handleAddFormChange}
        />
        <div className="info dt">
          <b className="b white f3 ma2">
            Enter Farmer's names in the format (FirstName LastName)
          </b>
          <input
            className="br-pill w-50"
            type="text"
            name="fullname"
            required="required"
            placeholder="Farmer's full names (FirstName LastName)"
            onChange={handleAddFormChange}
          />
        </div>
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
          <div className="dib pa3">
            <Circles type="Oval" color="#000080" height={30} width={40} />
          </div>
        ) : null}

        <label
          className=" br-pill bg-white orange f4  b pa2 hover-bg-orange hover-white"
          onClick={handleAddFormSubmit}
        >
          Add
        </label>

        {successAdd ? (
          <div className="br-pill bg-white w-25">
            <label className="dt green f3 b  pa2">{successAdd}</label>
          </div>
        ) : null}
        {foundErrAdd ? (
          <label className="dt red f3 b  pb2">{foundErrAdd}</label>
        ) : null}
      </div>
    </div>
  );
};

export default Records;
