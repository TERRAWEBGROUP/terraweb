import React, { useState, Fragment, useEffect, useRef } from "react";

import "./style.css";
import data from "./mock-data.json";
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";

import Cookies from "js-cookie";

import { Circles } from "react-loader-spinner";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const Users = () => {
  const [contacts, setContacts] = useState(data);
  const [addFormData, setAddFormData] = useState({
    id: "",
    username: "",
    email: "",
    joined: "",
    company: "",
  });

  const [editFormData, setEditFormData] = useState({
    id: "",
    username: "",
    email: "",
    joined: "",
    company: "",
  });

  const [editContactId, setEditContactId] = useState(null);

  const [foundErr, setFoundErr] = useState(null);
  const [foundErrAdd, setFoundErrAdd] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [isLoadingAdd, setIsLoadingAdd] = useState(null);
  const [isLoadingSave, setIsLoadingSave] = useState(null);

  //analysis Constants
  const [totalUsers, settotalUsers] = useState(null);

  const [totalActiveUsers, settotalActiveUsers] = useState(null);

  //clear inputs
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    //fetch agents
    const fetchAll = () => {
      let adminCookie = Cookies.get("sessionidadmin");
      if (adminCookie.length >= 1) {
        setIsLoading(true);

        setTimeout(() => {
          fetch("http://localhost:8000/getusers", {
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
    settotalUsers(datamap.length);
    let count = 0;

    var i;
    for (i = 0; i < datamap.length; i++) {
      count = datamap[i].length;
    }
    settotalActiveUsers(count);
  };

  //fetch users
  const fetchUsers = () => {
    let adminCookie = Cookies.get("sessionidadmin");
    if (adminCookie.length >= 1) {
      setIsLoading(true);

      setTimeout(() => {
        fetch("http://localhost:8000/getusers", {
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
  const refreshUsers = () => {
    fetchUsers();
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

      let adminCookie = Cookies.get("sessionidadmin");
      if (adminCookie.length >= 1) {
        setIsLoadingAdd(true);
        setTimeout(() => {
          fetch("http://localhost:8000/addAdmin", {
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
                throw Error(
                  "An error occurred, user email perhaps already exists."
                );
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
                refreshUsers();

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

      level: editFormData.level,
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
        fetch("http://localhost:8000/updateuser", {
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
            console.log(user);
            if (user[0].id >= 1) {
              setFoundErr(null);

              setIsLoadingSave(null);

              refreshUsers();
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
      level: contact.level,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditContactId(null);
  };

  //confirm delete user
  // const onDeleteYes = (contactemail) => {
  //   let adminCookie = Cookies.get("tokken");
  //   if (adminCookie >= 1) {
  //     fetch("https://peaceful-lake-35455.herokuapp.com/deleteuser", {
  //       method: "post",
  //       headers: { "Content-Type": "application/JSON" },
  //       body: JSON.stringify({
  //         adminid: adminCookie,

  //         email: contactemail,
  //       }),
  //     })
  //       .then(function (response) {
  //         if (response.status === 400) {
  //           throw Error("An error occurred, during delete.");
  //         }
  //         if (response === 500) {
  //           throw Error("Could not complete request because of an error");
  //         }

  //         return response.json();
  //       })
  //       .then((user) => {
  //         console.log(user);

  //         if (user) {
  //           refreshUsers();
  //         } else {
  //           //dont load
  //         }
  //       })
  //       .catch((err) => {
  //         // setFlag(1);
  //       });
  //   } else {
  //   }
  // };

  // const handleDeleteClick = (contactemail) => {
  //   //delete alert
  //   confirmAlert({
  //     customUI: ({ onClose }) => {
  //       return (
  //         <div className="bg-white br3 bb b--black-10   pa2 w-100 shadow-5 center ">
  //           <h1>Confirm Delete Agent</h1>
  //           <p>Sure you want to delete this agent record?</p>
  //           <p className="b red f5">Note that this is undoable.</p>
  //           <label
  //             className="dib w3 tc pa2 ma2 white br-pill bg-red "
  //             onClick={onClose}
  //           >
  //             No
  //           </label>
  //           <label
  //             className="dib w4 fr tc pa2 ma2 white br-pill bg-blue "
  //             onClick={() => {
  //               onDeleteYes(contactemail);
  //               onClose();
  //             }}
  //           >
  //             Yes, Delete it!
  //           </label>
  //         </div>
  //       );
  //     },
  //   });
  // };

  return (
    <div className="app-container center mt6">
      {isLoading ? (
        <div className="db mb2">
          <Circles type="Oval" color="#000080" height={40} width={80} />
        </div>
      ) : null}

      <div className="dib-l">
        <label className="ma2 white f3 b">
          Total Users
          <label className="strong red ml2 mr2">{totalUsers}</label>
        </label>

        <label className="ma2 white f3 b">
          Total Active Users
          <label className="strong red ml2 mr2">{totalActiveUsers}</label>
        </label>
      </div>
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>admin ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Password</th>
              <th>Created</th>
              <th>Company</th>

              <th>Last Active</th>
              <th>Edit Users</th>
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
          onClick={refreshUsers}
        >
          Refresh
        </button>
      </div>

      <h2 className="f3 b white">Add a User</h2>
      <div>
        <input
          ref={usernameRef}
          type="text"
          name="username"
          required="required"
          placeholder="Enter a username..."
          onChange={handleAddFormChange}
        />
        <input
          ref={emailRef}
          type="text"
          name="email"
          required="required"
          placeholder="Enter email..."
          onChange={handleAddFormChange}
        />
        <input
          ref={passwordRef}
          type="text"
          name="password"
          required="required"
          placeholder="Enter password..."
          onChange={handleAddFormChange}
        />

        {isLoadingAdd ? (
          <div className="dib ml2 mr2">
            <Circles type="Oval" color="#000080" height={20} width={40} />
          </div>
        ) : null}

        <button
          className=" br-pill bg-white orange f4  b pa2 hover-bg-orange hover-white"
          type="submit"
          onClick={handleAddFormSubmit}
        >
          Add
        </button>

        {foundErrAdd ? (
          <label className="dt red  pb2">{foundErrAdd}</label>
        ) : null}
      </div>
    </div>
  );
};

export default Users;
