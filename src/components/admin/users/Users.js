import React, { useState, Fragment, useEffect, useRef } from "react";

import "./style.css";
import data from "./mock-data.json";
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";

import Cookies from "js-cookie";

import { Circles } from "react-loader-spinner";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Divider } from "@tremor/react";

const Users = () => {
  const [contacts, setContacts] = useState(data);
  const [addFormData, setAddFormData] = useState({
    username: "",
    farmerid: "",
    email: "",
    fullname: "",
    firstName: "",
    lastName: "",
    company: "",
    category: "",
    phone: "",
  });

  const [editFormData, setEditFormData] = useState({
    id: "",
    username: "",
    email: "",
    joined: "",
    company: "",
    category: "",
    phone: "",
    status: "",
  });

  const [editContactId, setEditContactId] = useState(null);

  //display success info after successful registration
  const [success, setSuccess] = useState("");

  const [deleteState, setDeleteState] = useState("");

  const [foundErr, setFoundErr] = useState(null);
  const [foundErrAdd, setFoundErrAdd] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [isLoadingAdd, setIsLoadingAdd] = useState(null);
  const [isLoadingSave, setIsLoadingSave] = useState(null);

  //analysis Constants
  const [totalUsers, settotalUsers] = useState(null);

  const [totalActiveUsers, settotalActiveUsers] = useState(null);

  //store select values in an array
  const options = [
    { value: "", text: "-- select Category --" },
    { value: "farmer", text: "farmer" },
    { value: "fieldAdmin", text: "fieldAdmin" },
  ];
  const [val, setVal] = useState("");

  const [names, setNames] = useState({
    fullname: "",
    farmerid: "",
    category: options[0].value,
    username: "",
    company: "",
    phone: val,
    gender: options[0].value,
    status: "",
  });

  //number options
  const numberOptions = [
    { value: "", text: "10" },
    { value: "10", text: "10" },
    { value: "25", text: "20" },
    { value: "50", text: "20" },

    { value: "100", text: "20" },
  ];

  //search users in your company
  const [searchUser, setSearchUser] = useState("");

  //accept numbers only

  //clear inputs
  const firstnameref = useRef();
  const lastnameref = useRef();
  const fullnameRef = useRef();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const phoneRef = useRef();
  const companyRef = useRef();
  const categoryRef = useRef();

  //creating a fullname formatter here so that fullname data goes into the dataabase in the
  //form of firstname Lastname
  // Function to format the full name
  const formatFullName = (firstName, lastName) => {
    // Ensure the first letter of each name is capitalized
    const formattedFirstName =
      firstName.charAt(0).toUpperCase() + firstName.slice(1);
    const formattedLastName =
      lastName.charAt(0).toUpperCase() + lastName.slice(1);

    // Combine the formatted names into the full name
    const fullName = `${formattedFirstName} ${formattedLastName}`;

    return fullName;
  };

  //format the company to start with capital letter and remove white spaces
  // Function to format the company name
  const formatCompanyName = (input) => {
    // Remove leading and trailing white spaces
    const trimmedInput = input.trim();

    // Ensure the first letter is capitalized
    const formattedCompanyName =
      trimmedInput.charAt(0).toUpperCase() + trimmedInput.slice(1);

    return formattedCompanyName;
  };

  //handle company input
  const onCompanyChange = (event) => {
    if (names.company.length >= 3) {
      setFoundErrAdd("");
    } else {
      setFoundErrAdd("An error occurred");
    }
    const newCompanyName = event.target.value;
    const formattedCompanyName = formatCompanyName(newCompanyName);

    // Spreading "...state" ensures we don't "lose" fname,lname,email... etc
    setNames((names) => ({
      ...names,
      company: formattedCompanyName,
    }));
  };

  // handle on category change
  const handleCategoryEdit = (event) => {
    setSuccess(null);
    setNames((names) => ({
      ...names,
      category: event.target.value,
    }));

    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const category = event.target.value;

    const newFormData = { ...editFormData };
    newFormData["category"] = category;

    setEditFormData(newFormData);
  };

  //handle on status change
  const onStatusChange = (event) => {
    setSuccess(null);
    setNames((names) => ({
      ...names,
      status: event.target.value,
    }));

    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const status = event.target.value;

    const newFormData = { ...editFormData };
    newFormData["status"] = status;

    setEditFormData(newFormData);
  };

  //handle category input
  const onCategoryChange = (event) => {
    setSuccess(null);
    setNames((names) => ({
      ...names,
      gender: event.target.value,
    }));

    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const category = event.target.value;

    const newFormData = { ...addFormData };
    newFormData["category"] = category;

    setAddFormData(newFormData);
  };

  const onPhoneChange = (event) => {
    setNames((names) => ({
      ...names,
      phone: event.target.value,
    }));

    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const category = event.target.value;

    const newFormData = { ...addFormData };
    newFormData["category"] = category;

    setAddFormData(newFormData);
  };
  useEffect(() => {
    //fetch users
    const fetchAll = () => {
      let adminCookie = Cookies.get("sessionidadmin");
      if (adminCookie.length >= 1) {
        setIsLoading(true);

        setTimeout(() => {
          fetch("https://api.terraweb.africa/getusers", {
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
                //load data
                setFoundErrAdd(null);

                setIsLoading(null);
                setContacts(user);
                loadAnalysis(user);

                setSuccess(null);
                setDeleteState(null);

                //store a name after load to display in the title of the users table
                setNames((names) => ({
                  ...names,
                  company: user[0].company,
                }));
              } else {
                //dont load

                setFoundErrAdd(null);
                setFoundErr(null);
                setIsLoading(null);
                setDeleteState(null);
              }
            })
            .catch((err) => {
              // setFoundErr(err.message);
              setIsLoading(null);
              // setFlag(1);
            });
        }, 1500);
      } else {
        setIsLoading(null);
      }
    };

    //load profile
    const fetchProfile = () => {
      let adminCookie = "";
      adminCookie = Cookies.get("sessionidadmin");
      let userid = "";
      userid = Cookies.get("sessioniduser");
      if (adminCookie.length >= 1 || userid.length >= 1) {
        setIsLoading(true);
        setTimeout(() => {
          fetch("https://api.terraweb.africa/loadProfile", {
            method: "post",
            headers: { "Content-Type": "application/JSON" },
            body: JSON.stringify({
              adminid: adminCookie,
              userid: userid,
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
              if (user[0].username.length >= 1) {
                //load data

                setFoundErrAdd(null);

                setIsLoading(null);
                setContacts(user);

                setSuccess(null);
                setDeleteState(null);

                //store a name after load to display in the title of the users table
                setNames((names) => ({
                  ...names,
                  company: user[0].company,
                }));

                setAddFormData((prevState) => ({
                  ...prevState,
                  company: user[0].company,
                }));
                companyRef.current.value = user[0].company;
              } else {
                //dont load

                setFoundErrAdd(null);
                setFoundErr(null);
                setIsLoading(null);
                setDeleteState(null);
              }
            })
            .catch((err) => {
              // setFoundErr(err.message);
              setIsLoading(null);
              // setFlag(1);
            });
        }, 150);
      } else {
        setIsLoading(null);
      }
    };

    fetchAll();
    fetchProfile();
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

  //search users
  const searchUsers = () => {
    // setContacts(null);
    //fetch cookie
    let adminCookie = Cookies.get("sessionidadmin");
    if (adminCookie.length >= 1) {
      setIsLoading(true);

      setTimeout(() => {
        fetch("https://api.terraweb.africa/searchUsers", {
          method: "post",
          headers: { "Content-Type": "application/JSON" },
          body: JSON.stringify({
            adminid: adminCookie,
            username: searchUser,
            email: searchUser,
            phone: searchUser,
            company: searchUser,
            userid: searchUser,
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
              setFoundErrAdd(null);
              setDeleteState(null);

              setIsLoading(null);
              setContacts(user);
              loadAnalysis(user);

              //load data
            } else {
              //dont load

              setFoundErr(null);
              setFoundErrAdd(null);
              setIsLoading(null);
              setDeleteState(null);
            }
          })
          .catch((err) => {
            // setFoundErr(err.message);
            setIsLoading(null);
            // setFlag(1);
          });
      }, 1500);
    } else {
      setIsLoading(null);
    }
  };

  //fetch users
  const fetchUsers = () => {
    //fetch cookie
    let adminCookie = Cookies.get("sessionidadmin");
    if (adminCookie.length >= 1) {
      setIsLoading(true);

      setTimeout(() => {
        fetch("https://api.terraweb.africa/getusers", {
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
              setFoundErrAdd(null);
              setDeleteState(null);

              setIsLoading(null);
              setContacts(user);
              loadAnalysis(user);

              //load data
            } else {
              //dont load

              setFoundErr(null);
              setFoundErrAdd(null);
              setIsLoading(null);
              setDeleteState(null);
            }
          })
          .catch((err) => {
            // setFoundErr(err.message);
            setIsLoading(null);
            // setFlag(1);
          });
      }, 1500);
    } else {
      setIsLoading(null);
    }
  };

  //temp handle add form change
  const handleAddFormChange = (event) => {
    event.preventDefault();

    setSuccess(null);
    setFoundErrAdd(null);

    const fieldName = event.target.getAttribute("name");
    let fieldValue = event.target.value;

    // Check if the field name is "company" and apply formatting if needed
    if (fieldName === "company") {
      // Ensure the first letter is capitalized
      fieldValue = fieldValue.charAt(0).toUpperCase() + fieldValue.slice(1);

      // Remove trailing white spaces
      fieldValue = fieldValue.trim();
      setAddFormData((prevState) => ({
        ...prevState,
        company: fieldValue,
      }));
    } else if (fieldName === "firstName") {
      // Handle input changes for first name
      if (/^[A-Za-z]+$/.test(fieldValue) || fieldValue === "") {
        const fullName = formatFullName(fieldValue, addFormData.firstName);

        setAddFormData((prevState) => ({
          ...prevState,
          firstName: fieldValue,
          fullname: fullName,
        }));
      }
    } else if (fieldName === "lastName") {
      // Handle input changes for last name
      if (/^[A-Za-z]+$/.test(fieldValue) || fieldValue === "") {
        const fullName = formatFullName(addFormData.firstName, fieldValue);
        setAddFormData((prevState) => ({
          ...prevState,
          lastName: fieldValue,
          fullname: fullName,
        }));
      }
    } else {
      const newFormData = { ...addFormData };
      newFormData[fieldName] = fieldValue;

      setAddFormData(newFormData);
    }
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
  const refreshUsers = () => {
    fetchUsers();
  };

  //add user to the database
  const handleAddFormSubmit = (event) => {
    event.preventDefault();
    setSuccess(null);
    setFoundErrAdd(null);

    const newContact = {
      username: addFormData.username,
      farmerid: addFormData.farmerid,
      email: addFormData.email,
      password: addFormData.password,
      fullname: addFormData.fullname,
      company: addFormData.company,
      category: addFormData.category,
      phone: addFormData.phone,
    };

    if (
      newContact.username.length >= 1 &&
      newContact.email.length >= 1 &&
      newContact.password.length >= 8 &&
      newContact.company.length >= 1 &&
      newContact.category.length >= 1 &&
      newContact.phone.length === 10 &&
      newContact.fullname.length >= 1
    ) {
      //send add agent request

      let adminCookie = Cookies.get("sessionidadmin");
      if (adminCookie.length >= 1) {
        setIsLoadingAdd(true);
        setTimeout(() => {
          fetch("https://api.terraweb.africa/addUser", {
            method: "post",
            headers: { "Content-Type": "application/JSON" },
            body: JSON.stringify({
              adminid: adminCookie,
              farmerid: newContact.farmerid,
              username: newContact.username,
              email: newContact.email,
              password: newContact.password,
              fullname: newContact.fullname,
              company: newContact.company,
              category: newContact.category,
              phone: newContact.phone,
            }),
          })
            .then(function (response) {
              if (response.status === 400) {
                throw Error(
                  "A user with the same farmerid or details seems to already exist, or there seems to be an error."
                );
              }
              if (response.status === 417) {
                throw Error("Fill all details");
              }
              if (response === 500) {
                throw Error("Could not complete request because of an error");
              }

              return response.json();
            })
            .then((user) => {
              if (user) {
                setSuccess("success");
                setFoundErrAdd(null);

                setFoundErr(null);

                setIsLoadingAdd(null);
                // setContacts(user);

                //refresh data
                refreshUsers();

                //clear textboxes
                usernameRef.current.value = "";
                emailRef.current.value = "";
                passwordRef.current.value = "";
                phoneRef.current.value = "";
                // //clear the add form array
                // addFormData.username = "";
                // addFormData.email = "";
                // addFormData.phone = "";
                // addFormData.fullname = "";
                // // addFormData.company = "";
                // // addFormData.category = "";
                // addFormData.password = "";
                //load data
              } else {
                setSuccess("not good");

                //dont load

                setFoundErrAdd(null);
                setIsLoadingAdd(null);
                addFormData.username = "";
              }
            })
            .catch((err) => {
              setSuccess("got error");

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
    }
  };

  //update users present in the database
  const handleEditFormSubmit = (event) => {
    event.preventDefault();
    const editedContact = {
      id: editFormData.id,
      farmerid: editFormData.farmerid,
      username: editFormData.username,
      email: editFormData.email,
      password: editFormData.password,
      phone: editFormData.phone,

      category: editFormData.category,
      company: editFormData.company,
      status: editFormData.status,
    };

    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === editContactId);

    newContacts[index] = editedContact;

    // setContacts(newContacts);
    // setEditContactId(null);

    //update

    let adminCookie = Cookies.get("sessionidadmin");

    if (adminCookie.length >= 4) {
      setIsLoadingSave(true);
      setTimeout(() => {
        fetch("https://api.terraweb.africa/updateUser", {
          method: "post",
          headers: { "Content-Type": "application/JSON" },
          body: JSON.stringify({
            adminid: adminCookie,
            farmerid: newContacts[index].farmerid,
            username: newContacts[index].username,
            email: newContacts[index].email,
            password: newContacts[index].password,
            phone: newContacts[index].phone,
            category: newContacts[index].category,
            company: newContacts[index].company,
            status: newContacts[index].status,
          }),
        })
          .then(function (response) {
            if (response.status === 400) {
              throw Error(
                "An error occurred, during update. An update requires a user category (farmer or fieldAdmin). Consider checking if you have the required previledges to perform that kind of an action."
              );
            }
            if (response === 500) {
              throw Error(
                "Could not complete request because of a server error"
              );
            }

            return response.json();
          })
          .then((user) => {
            if (user >= 1) {
              setFoundErr(null);
              setSuccess("success");
              setIsLoadingSave(null);
              setDeleteState(null);

              refreshUsers();
              setEditContactId(null);
              //load data
            } else {
              //dont load
              setSuccess("not good");
              setFoundErrAdd(null);
              setIsLoadingSave(null);
              setDeleteState(null);
              // addFormData.username = "";
            }
          })
          .catch((err) => {
            setFoundErrAdd(err.message);
            setIsLoadingSave(null);
            setSuccess(null);
            // setFlag(1);
          });
      }, 1000);
    } else {
      setIsLoadingSave(null);
    }
  };

  //supply data to the editable row and the index the row should be displayed
  const handleEditClick = (event, contact) => {
    setNames((names) => ({
      ...names,
      category: "",
      status: "",
    }));
    event.preventDefault();
    setEditContactId(contact.id);

    const formValues = {
      id: contact.id,
      farmerid: contact.farmerid,
      username: contact.username,
      email: contact.email,
      password: contact.password,
      created: contact.created,
      category: contact.category,
      company: contact.company,
      phone: contact.phone,
      status: contact.status,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditContactId(null);
    setNames((names) => ({
      ...names,
      category: "",
      status: "",
    }));
  };

  //confirm delete user
  const onDeleteYes = (contactemail, category) => {
    let adminCookie = Cookies.get("sessionidadmin");
    if (adminCookie.length >= 4) {
      fetch("https://api.terraweb.africa/deleteUser", {
        method: "post",
        headers: { "Content-Type": "application/JSON" },
        body: JSON.stringify({
          adminid: adminCookie,

          email: contactemail,
          category: category,
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
          //
          setDeleteState(user);

          if (user) {
            refreshUsers();
          } else {
            //dont load
          }
        })
        .catch((err) => {
          setFoundErrAdd(err.message);
        });
    } else {
    }
  };

  const handleDeleteClick = (contactemail, category) => {
    //delete alert
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="bg-white br4 bb b--black-10   pa4 w-100 shadow-5 center ">
            <h1 className="f2 b">Confirm Delete Agent</h1>
            <p className="f2">Sure you want to delete this user record?</p>
            <p className="b red f3">Note that this action cannot be UnDone.</p>
            <label
              className="dib w3 f3 tc pa2 ma2 white br-pill bg-orange hover-bg-green hover-black"
              onClick={onClose}
            >
              No
            </label>
            <label
              className="dib w4 fr f4 tc pa2 ma2 white br-pill bg-blue hover-bg-red "
              onClick={() => {
                onDeleteYes(contactemail, category);
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

  //handle search user
  const onSearchChange = (event) => {
    event.preventDefault();
    setSearchUser(event.target.value);
  };
  return (
    <div className="app-container center br4 mt6 shadow-3">
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

      <div className="controlContainer d-grid bg-white  br4 shadow-3 ">
        <label className="grid-item pa3 f3 b">
          All Users in <b className="red f2">{names.company}</b>
          {/* retrieve company name from db and populate after load */}
          {/* {contacts[0].company >= 1 ? (
            <b className="red f2">{contacts[0].company}</b>
          ) : null} */}
        </label>
        <div className="grid-item pa2 dib ">
          <input
            type="text"
            className="searchInput "
            placeholder="Search Users"
            onChange={onSearchChange}
          />

          <button
            className="  br-pill bw0 bg-orange white hover-bg-yellow tc pa3 "
            type="button"
            onClick={searchUsers}
          >
            <label className="center f4">Search</label>
          </button>
        </div>
        <div className="grid-item flex-ns pa3 mt2 ">
          <label className="f3  mt2">
            Showing <b>1-50</b> of {contacts.length} Entries
          </label>
          <button
            className=" br-pill bw0 ml2 bg-white orange f4  b pa2 hover-bg-orange hover-white"
            type="submit"
            onClick={handleAddFormSubmit}
          >
            back
          </button>
          <button
            className=" br-pill bw0 ml2 bg-white orange f4  b pa2 hover-bg-orange hover-white"
            type="submit"
            onClick={handleAddFormSubmit}
          >
            next
          </button>
        </div>
      </div>
      <div className="bg-white pa2 br4 shadow-2">
        <form onSubmit={handleEditFormSubmit}>
          <table>
            <thead>
              <tr>
                <th>admin ID</th>
                <th>Farmer ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Password</th>
                <th>Phone</th>

                <th>Created</th>
                <th>Company</th>

                <th>Last Active</th>
                <th>Priviledges</th>
                <th>Status</th>
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
                      onStatusChange={onStatusChange}
                      names={names}
                      handleCategoryEdit={handleCategoryEdit}
                      handleDeleteClick={handleDeleteClick}
                      optionsPreviledges={options}
                      contact={contact}
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
      </div>
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
      <div className="d-flex bg-white pa2 br4 shadow-3">
        {/* <input
          ref={fullnameRef}
          type="text"
          name="fullname"
          required="required"
          placeholder="Enter fullname"
          onChange={handleAddFormChange}
        /> */}
        <div>
          <h2>
            <label className="b f4 ">Farmer ID (optional)</label>
          </h2>
          <input
            // ref={firstnameref}
            className="w-100 w-50-ns tl  "
            placeholder="Farmer ID"
            type="text"
            name="farmerid"
            onChange={handleAddFormChange}
          />
        </div>
        <div>
          <h2>
            <label className="b f4 ">First Name</label>
          </h2>
          <input
            ref={firstnameref}
            className="w-100 w-50-ns  tl  "
            placeholder="First Name"
            type="text"
            name="firstName"
            // value={addFormData.firstName}
            onChange={handleAddFormChange}
          />
        </div>
        <div>
          <h2>
            <label className="b f4 ">Last Name</label>
          </h2>
          <input
            ref={lastnameref}
            className="w-100 w-50-ns  tl  "
            placeholder="Last Name"
            name="lastName"
            type="text"
            // value={addFormData.lastName}
            onChange={handleAddFormChange}
          />
        </div>
        <h2>
          <label className="b f4 ">Username</label>
        </h2>
        <input
          className="w-100 w-50-ns  tl  "
          ref={usernameRef}
          type="text"
          name="username"
          required="required"
          placeholder="Enter a username..."
          onChange={handleAddFormChange}
        />
        <h2>
          <label className="b f4 ">Email</label>
        </h2>
        <input
          className="w-100 w-50-ns  tl  "
          ref={emailRef}
          type="text"
          name="email"
          required="required"
          placeholder="Enter email..."
          onChange={handleAddFormChange}
        />
        <h2>
          <label className="b f4 ">Password</label>
        </h2>
        <input
          className="w-100 w-50-ns  tl  "
          ref={passwordRef}
          type="text"
          name="password"
          required="required"
          placeholder="Enter password..."
          onChange={handleAddFormChange}
        />
        <h2>
          <label className="b f4 ">Phone</label>
        </h2>
        <input
          className="w-100 w-50-ns tl  "
          ref={phoneRef}
          type="text"
          // pattern="[0-9]*"
          pattern="[0-9]*"
          value={val}
          onInput={(e) =>
            setVal((v) => (e.target.validity.valid ? e.target.value : v))
          }
          placeholder="Enter Phone Number"
          name="phone"
          onChange={handleAddFormChange}
        ></input>
        <h2>
          <label className="b f4 ">Company</label>
        </h2>
        <input
          // className="w-100 w-50-ns tl  "
          ref={companyRef}
          // type="text"
          // name="company"
          // required="required"
          // placeholder="Enter Company..."
          // value={addFormData.company}
          // onChange={handleAddFormChange}
          className="w-100 w-50-ns tl br-pill b black"
          type="text"
          name="company"
          // defaultValue={names.company}
          required="required"
          disabled
          // placeholder="Enter a company..."
          // placeholder={names.company}
          onChange={handleAddFormChange}
        />
        <select
          ref={categoryRef}
          className=" f4 bg-white tracked pa2 w-20-l w-20-m"
          value={names.gender}
          onChange={onCategoryChange}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.text}
            </option>
          ))}
        </select>
        {isLoadingAdd ? (
          <div className="dib ml2 mr2">
            <Circles type="Oval" color="#000080" height={20} width={40} />
          </div>
        ) : null}

        <button
          className=" br-pill bw0 ml2 bg-orange white f4  b pa2 hover-bg-orange hover-white"
          type="submit"
          onClick={handleAddFormSubmit}
        >
          Add
        </button>

        {deleteState ? (
          <label className="card-tite w-70 f3 bg-white hover-dark-red br-pill pa1 mt2 red b dt">
            {deleteState}
          </label>
        ) : null}
        {foundErrAdd ? (
          <label className="card-tite w-70 f3 bg-white hover-dark-red br-pill pa1 mt2 red b dt">
            {foundErrAdd}
          </label>
        ) : null}
        {success === "success" ? (
          <p className="card-tite w-50 f3 bg-white hover-blue br-pill pa1 green b">
            Account details updated successfully.
          </p>
        ) : null}
        {success === "not good" ? (
          <p className="card-tite w-50 f3 bg-white hover-dark-red br-pill pa1 red b">
            Error updating Account. Check your details and try again.
          </p>
        ) : null}
      </div>
      <div className="bg-white shadow-3  pa2 br4">
        <label className="f3 b black ">Note:</label>
        <label className="f3 b black">
          You can only add or edit a user or Admin that belongs to your
          designated company.
        </label>
      </div>
    </div>
  );
};

export default Users;
