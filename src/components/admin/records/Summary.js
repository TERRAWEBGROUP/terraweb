import React, { useState, Fragment, useEffect, useRef } from "react";

import "./style.css";
import data from "./mock-data.json";
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";

import Cookies from "js-cookie";

import { Circles } from "react-loader-spinner";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const Summary = () => {
  const [contacts, setContacts] = useState(data);
  const [addFormData, setAddFormData] = useState({
    id: "",
    username: "",
    email: "",
    password: "",
    created: "",
  });

  const [editFormData, setEditFormData] = useState({
    id: "",
    username: "",
    email: "",
    password: "",
    created: "",
  });

  const [editContactId, setEditContactId] = useState(null);

  const [foundErr, setFoundErr] = useState(null);
  const [foundErrAdd, setFoundErrAdd] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [isLoadingAdd, setIsLoadingAdd] = useState(null);
  const [isLoadingSave, setIsLoadingSave] = useState(null);

  //analysis Constants
  const [totalRecords, settotalRecords] = useState(null);

  const [totalActiveRecords, settotalActiveRecords] = useState(null);

  //clear inputs
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    //fetch agents
    const fetchAll = () => {
      let adminCookie = Cookies.get("tokken");
      if (adminCookie >= 1) {
        setIsLoading(true);

        setTimeout(() => {
          fetch("https://peaceful-lake-35455.herokuapp.com/getrecords", {
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

    fetchAll();
  }, []);

  //load analysis
  const loadAnalysis = (datamap) => {
    settotalRecords(datamap.length);
    let count = 0;

    var i;
    for (i = 0; i < datamap.length; i++) {
      count += datamap[i].earnings;
    }
    settotalActiveRecords(count);
  };

  //fetch records
  const fetchRecords = () => {
    let adminCookie = Cookies.get("tokken");
    if (adminCookie >= 1) {
      setIsLoading(true);

      setTimeout(() => {
        fetch("https://peaceful-lake-35455.herokuapp.com/getrecords", {
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
      username: addFormData.username,
      email: addFormData.email,
      password: addFormData.password,
    };

    if (
      newContact.username.length >= 1 &&
      newContact.email.length >= 1 &&
      newContact.password.length >= 1
    ) {
      //send add agent request

      let adminCookie = Cookies.get("tokken");
      if (adminCookie >= 1) {
        setIsLoadingAdd(true);
        setTimeout(() => {
          fetch("https://peaceful-lake-35455.herokuapp.com/addrecord", {
            method: "post",
            headers: { "Content-Type": "application/JSON" },
            body: JSON.stringify({
              adminid: adminCookie,
              username: newContact.username,
              email: newContact.email,
              password: newContact.password,
            }),
          })
            .then(function (response) {
              if (response.status === 400) {
                throw Error("An error occurred, agent perhaps already exists.");
              }
              if (response === 500) {
                throw Error("Could not complete request because of an error");
              }

              return response.json();
            })
            .then((user) => {
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
      username: editFormData.username,
      email: editFormData.email,
      password: editFormData.password,

      earnings: editFormData.earnings,
    };

    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === editContactId);

    newContacts[index] = editedContact;

    // setContacts(newContacts);
    // setEditContactId(null);

    //send add agent request

    let adminCookie = Cookies.get("tokken");
    if (adminCookie >= 1) {
      setIsLoadingSave(true);
      setTimeout(() => {
        fetch("https://peaceful-lake-35455.herokuapp.com/updaterecord", {
          method: "post",
          headers: { "Content-Type": "application/JSON" },
          body: JSON.stringify({
            adminid: adminCookie,
            username: newContacts[index].username,
            email: newContacts[index].email,
            password: newContacts[index].password,
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
      username: contact.username,
      email: contact.email,
      password: contact.password,
      created: contact.created,
      earnings: contact.earnings,
      availableAccs: contact.availableAccs,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditContactId(null);
  };

  //confirm delete record
  const onDeleteYes = (contactemail) => {
    let adminCookie = Cookies.get("tokken");
    if (adminCookie >= 1) {
      fetch("https://api.terraweb.africa/deleterecord", {
        method: "post",
        headers: { "Content-Type": "application/JSON" },
        body: JSON.stringify({
          adminid: adminCookie,

          email: contactemail,
        }),
      })
        .then(function (response) {
          if (response.status === 400) {
            throw Error("An error occurred, during delete.");
          }
          if (response === 500) {
            throw Error("Could not complete request because of an error");
          }

          return response.json();
        })
        .then((user) => {
          if (user) {
            refreshRecords();
          } else {
            //dont load
          }
        })
        .catch((err) => {
          // setFlag(1);
        });
    } else {
    }
  };

  const handleDeleteClick = (contactemail) => {
    //delete alert
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="bg-white br3 bb b--black-10   pa2 w-100 shadow-5 center ">
            <h1>Confirm Delete Record</h1>
            <p>Sure you want to delete this user record?</p>
            <p className="b red f5">
              Note that this cannot be <b className="red f3">UNDONE</b>
            </p>
            <label
              className="dib w3 tc pa2 ma2 white br-pill bg-red "
              onClick={onClose}
            >
              No
            </label>
            <label
              className="dib w4 fr tc pa2 ma2 white br-pill bg-blue "
              onClick={() => {
                onDeleteYes(contactemail);
                onClose();
              }}
            >
              Yes, Delete it!
            </label>
          </div>
        );
      },
    });
  };

  return (
    <div className="app-container center ">
      {isLoading ? (
        <div className="db mb2">
          <Circles type="Oval" color="#000080" height={40} width={80} />
        </div>
      ) : null}

      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>Total Products</th>
              <th>Total Weight</th>
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
                    handleDeleteClick={handleDeleteClick}
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
    </div>
  );
};

export default Summary;
