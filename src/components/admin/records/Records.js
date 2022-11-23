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
  const [contacts, setContacts] = useState(data);
  const [addFormData, setAddFormData] = useState({
    id: "",
    username: "",
    email: "",
    joined: "",
    company: "",
    level: "",
    lastactive: "",
  });

  const [editFormData, setEditFormData] = useState({
    id: "",
    username: "",
    email: "",
    joined: "",
    company: "",
    level: "",
    lastactive: "",
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
      product: addFormData.product,
      weight: addFormData.weight,
    };

    if (
      newContact.company.length >= 1 &&
      newContact.product.length >= 1 &&
      newContact.weight.length >= 1
    ) {
      //send add agent request

      let adminCookie = Cookies.get("id");
      if (adminCookie >= 1) {
        setIsLoadingAdd(true);
        setTimeout(() => {
          fetch("https://terraweb.herokuapp.com/addnewrecord", {
            method: "post",
            headers: { "Content-Type": "application/JSON" },
            body: JSON.stringify({
              id: adminCookie,
              product: newContact.product,
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
    }
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editFormData.id,
      company: editFormData.company,
      product: editFormData.product,
      weight: editFormData.weight,

      username: editFormData.username,
      created: editFormData.created,
    };

    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === editContactId);

    newContacts[index] = editedContact;

    // setContacts(newContacts);
    // setEditContactId(null);
    console.log(newContacts[index].id);

    //update

    let adminCookie = Cookies.get("id");
    if (adminCookie >= 1) {
      setIsLoadingSave(true);
      setTimeout(() => {
        fetch("https://terraweb.herokuapp.com/updaterecord", {
          method: "post",
          headers: { "Content-Type": "application/JSON" },
          body: JSON.stringify({
            id: adminCookie,
            username: newContacts[index].username,
            email: newContacts[index].email,
            password: newContacts[index].password,
            level: newContacts[index].level,
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
      company: contact.company,
      product: contact.product,
      weight: contact.weight,
      username: contact.username,
      created: contact.created,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditContactId(null);
  };

  return (
    <div className="app-container center ">
      {isLoading && (
        <div className="db mb2">
          <Circles type="Oval" color="#000080" height={40} width={80} />
        </div>
      )}

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
              <th>Product</th>
              <th>Weight</th>
              <th>Company</th>
              <th>Username</th>

              <th>Created</th>
              <th>Edit records</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <Fragment>
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
        {foundErr && <label className="dt red  pb2">{foundErr}</label>}

        <button
          className="ml2 br-pill bg-white orange f3 pa3 b mt2 hover-bg-orange hover-white"
          onClick={refreshRecords}
        >
          Refresh
        </button>
      </div>

      <h2 className="f3 b white">Add New Record</h2>
      <div>
        <input
          ref={usernameRef}
          type="text"
          name="comapny"
          required="required"
          placeholder="Enter a company..."
          onChange={handleAddFormChange}
        />
        <input
          ref={emailRef}
          type="text"
          name="product"
          required="required"
          placeholder="Enter product..."
          onChange={handleAddFormChange}
        />
        <input
          ref={passwordRef}
          type="number"
          name="weight"
          placeholder="Enter weight..."
          onChange={handleAddFormChange}
        />

        {isLoadingAdd && (
          <div className="dib ml2 mr2">
            <Circles type="Oval" color="#000080" height={20} width={40} />
          </div>
        )}

        <label
          className=" br-pill bg-white orange f4  b pa2 hover-bg-orange hover-white"
          onClick={handleAddFormSubmit}
        >
          Add
        </label>

        {foundErrAdd && <label className="dt red  pb2">{foundErrAdd}</label>}
      </div>
    </div>
  );
};

export default Records;
