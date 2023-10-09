import React, { useState, Fragment, useEffect, useRef } from "react";

import "./style.css";
import data from "./mock-data.json";
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";

import Cookies from "js-cookie";

import { Circles } from "react-loader-spinner";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const TwRecords = () => {
  const options = [
    { value: "", text: "-- choose product type --" },
    { value: "coffee", text: "coffee" },
    { value: "tea leaves", text: "tea leaves" },
    { value: "milk", text: "milk" },
  ];

  //store select company values in an array
  const companies = [
    { value: "", text: "-- select company--" },
    { value: "Terraweb", text: "Terraweb" },
    { value: "Gatamura Dairy", text: "Gatamura Dairy" },
    { value: "Mbuuni Coffee", text: "Mbuuni Coffee" },
    { value: "Kanyua Tea", text: "Kanyua Tea" },
  ];

  const [names, setNames] = useState({
    producttype: options[0].value,
    company: companies[0].value,
  });

  const [foundUsers, setFoundUsers] = useState();

  const [contacts, setContacts] = useState(data);
  const [addFormData, setAddFormData] = useState({
    id: "",
    fullname: "",
    farmerid: "",
    firstName: "",
    lastName: "",
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

  //lookup farmer id and set state to show labe if found
  const [foundFarmer, setFoundFarmer] = useState(null);

  //display success info after successful registration
  const [success, setSuccess] = useState("");

  const [foundErr, setFoundErr] = useState(null);
  const [foundErrAdd, setFoundErrAdd] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [isLoadingAdd, setIsLoadingAdd] = useState(null);
  const [isLoadingSave, setIsLoadingSave] = useState(null);

  //when record is successfully added
  const [successAdd, setSuccessAdd] = useState(null);

  //analysis Constants
  const [totalRecords, settotalRecords] = useState(null);

  //search users in your company
  const [searchRecord, setSearchRecord] = useState("");

  const [deleteState, setDeleteState] = useState("");

  //clear inputs
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  //use ref to fill inputs or clear them
  const firtNameRef = useRef();
  const lastNameRef = useRef();

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
  };

  useEffect(() => {
    //fetch records
    const fetchAll = () => {
      try {
        let adminCookie = Cookies.get("sessionidadmin");
        let userCookie = Cookies.get("sessioniduser");
        if (adminCookie.length >= 8 || userCookie.length >= 8) {
          setIsLoading(true);

          setTimeout(() => {
            fetch("https://api.terraweb.africa/getTWRecords", {
              method: "post",
              headers: { "Content-Type": "application/JSON" },
              body: JSON.stringify({
                adminid: adminCookie,
                userid: userCookie,
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
  const loadAnalysis = (datamap) => {};

  //search records
  const searchRecords = () => {
    // setContacts(null);
    //fetch cookie
    let adminCookie = Cookies.get("sessionidadmin");
    if (adminCookie.length >= 1) {
      setIsLoading(true);

      setTimeout(() => {
        fetch("https://api.terraweb.africa/searchRecords", {
          method: "post",
          headers: { "Content-Type": "application/JSON" },
          body: JSON.stringify({
            adminid: adminCookie,

            fullname: searchRecord,

            userid: searchRecord,
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

  //handle search user
  const onSearchChange = (event) => {
    event.preventDefault();
    setSearchRecord(event.target.value);
  };

  //fetch users
  const fetchRecords = () => {
    try {
      let adminCookie = Cookies.get("sessionidadmin");
      let userCookie = Cookies.get("sessioniduser");
      if (adminCookie.length >= 8 || userCookie.length >= 8) {
        setIsLoading(true);

        setTimeout(() => {
          fetch("https://api.terraweb.africa/getTWRecords", {
            method: "post",
            headers: { "Content-Type": "application/JSON" },
            body: JSON.stringify({
              adminid: adminCookie,
              userid: userCookie,
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

  //check if user exists when full name is typed out
  const fetchUsers = () => {};

  // const handleAddFormChange = (event) => {
  //   event.preventDefault();

  //   const fieldName = event.target.getAttribute("name");
  //   const fieldValue = event.target.value;

  //   const newFormData = { ...addFormData };
  //   newFormData[fieldName] = fieldValue;

  //   setAddFormData(newFormData);
  // };

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

  //handle company input
  const onCompanyChange = (event) => {
    if (names.company.length >= 3) {
      //   setFlag(1);
    } else {
      //   setFlag(2);
    }
    // Spreading "...state" ensures we don't "lose" fname,lname,email... etc
    setNames((names) => ({
      ...names,
      company: event.target.value,
    }));
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
      farmerid: addFormData.farmerid,
      companyname: addFormData.company,
      producttype: addFormData.producttype,
      weight: addFormData.weight,
      fullname: addFormData.fullname,
    };

    if (
      newContact.companyname.length >= 3 &&
      newContact.producttype.length >= 3 &&
      newContact.fullname.length >= 3 &&
      newContact.weight.length >= 1

      // companyname &&
      // companyname.length >= 1 &&
      // producttype &&
      // producttype.length >= 1 &&
      // fullname &&
      // fullname.length >= 1 &&
      // weight &&
      // weight.length >= 1
    ) {
      //send add agent request
      let adminCookie = Cookies.get("sessionidadmin");
      if (adminCookie.length >= 4) {
        setIsLoadingAdd(true);
        setTimeout(() => {
          fetch("https://api.terraweb.africa/addnewrecord", {
            method: "post",
            headers: { "Content-Type": "application/JSON" },
            body: JSON.stringify({
              adminid: adminCookie,
              farmerid: newContact.farmerid,
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

    //update

    let adminCookie = Cookies.get("sessionidadmin");
    if (adminCookie.length >= 1) {
      setIsLoadingSave(true);
      setTimeout(() => {
        fetch("https://api.terraweb.africa/updateRecord", {
          method: "post",
          headers: { "Content-Type": "application/JSON" },
          body: JSON.stringify({
            id: newContacts[index].id,
            adminid: adminCookie,
            fullname: newContacts[index].fullname,
            companyname: newContacts[index].companyname,
            producttype: newContacts[index].producttype,
            weight: newContacts[index].weight,
          }),
        })
          .then(function (response) {
            if (response.status === 400) {
              throw Error(
                "An error occurred, during update. Try checking the details to make sure they are correct and try again"
              );
            }
            if (response === 500) {
              throw Error("Could not complete request because of an error.");
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

  //confirm delete record
  const onDeleteYes = (id) => {
    let adminCookie = Cookies.get("sessionidadmin");
    if (adminCookie.length >= 1) {
      fetch("https://api.terraweb.africa/deleterecord", {
        method: "post",
        headers: { "Content-Type": "application/JSON" },
        body: JSON.stringify({
          adminid: adminCookie,

          id: id,
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
            <p className="f3">Sure you want to delete this user record?</p>
            <p className="b red f4">
              Note that this cannot be <b className="red f3">UNDONE</b>
            </p>
            <label
              className="dib w3 tc pa2 f3 ma2 white br-pill bg-red "
              onClick={onClose}
            >
              No
            </label>
            <label
              className="dib w4 f4 fr tc pa3 white br-pill bg-blue "
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

  //handle autofill first name and last name
  const handleAutofillNames = () => {};

  //handle look up farmer id
  const handleLookupFarmerID = (event) => {
    event.preventDefault();

    const newContact = {
      farmerid: addFormData.farmerid,
    };

    if (
      newContact.farmerid.length >= 1

      // companyname &&
      // companyname.length >= 1 &&
      // producttype &&
      // producttype.length >= 1 &&
      // fullname &&
      // fullname.length >= 1 &&
      // weight &&
      // weight.length >= 1
    ) {
      //send add agent request
      let adminCookie = Cookies.get("sessionidadmin");
      if (adminCookie.length >= 4) {
        setIsLoadingAdd(true);
        setTimeout(() => {
          fetch("https://api.terraweb.africa/lookupFarmerProfile", {
            method: "post",
            headers: { "Content-Type": "application/JSON" },
            body: JSON.stringify({
              adminid: adminCookie,
              farmerid: newContact.farmerid,
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
            .then((data) => {
              // //display the found
              // // Assuming data contains the response from the server
              // const { message } = data; // Extract the message
              // const fullName = message.split(": ")[1]; // Extract the full name

              // const [firstName, lastName] = fullName.split(" "); // Split full name into first and last names

              // console.log(firstName); // First name
              // console.log(lastName); // Last name

              if (data) {
                setFoundErr(null);

                setIsLoadingAdd(null);
                // setContacts(data);
                setSuccessAdd(data);
                //refresh data
                //display found farmer
                setFoundFarmer(data);
                console.log(data);

                refreshRecords();

                //load data
              } else {
                //dont load

                setFoundErrAdd(null);
                setIsLoadingAdd(null);
                // addFormData.fullname = "";
                setFoundFarmer(null);
              }
            })

            .catch((err) => {
              // setFoundErrAdd();
              setIsLoadingAdd(null);
              // newContact.fullname = "";
              setFoundFarmer(null);

              // setFlag(1);
            });
        }, 1000);
      } else {
        setIsLoadingAdd(null);
      }
    }
  };

  return (
    <div className="app-container center mt6  ">
      {isLoading ? (
        <div className="db mb2">
          <Circles type="Oval" color="#000080" height={40} width={80} />
        </div>
      ) : null}

      <div className="dib-l">
        <div className="controlContainer d-grid bg-white  br4 shadow-3 ">
          <label className="ma2 black pt3 f3 b">
            Total Weight
            <label className="strong red ml2 mr2">{totalRecords}</label>
          </label>

          <label
            className="ma2 black pt3
           f3 b"
          >
            Last Recorded
            <label className="strong red ml2 mr2"></label>
          </label>
          <label className="ma2 pt3 black f3 b">
            View personal records
            <label className="strong red ml2 mr2"></label>
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
              onClick={searchRecords}
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
      </div>
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Farmer ID</th>
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

      <h2 className="f3 b white ">Add New Record</h2>
      <div className="">
        {/* <h2 className="b white f3 ma2">
          Company<label> </label>
        </h2>

        <input
          // key={index}
          className="br-pill b black"
          type="text"
          name="company"
        //   defaultValue={names.company}
          required="required"
         
          placeholder="Enter a company..."
          // placeholder={names.company}
          onChange={handleAddFormChange}
        /> */}
        <h2>
          <b className="b f3 white">Choose the company</b>
        </h2>
        <select
          className="rounded f3 bg-white tracked br-pill w-100 w-50-ns"
          value={names.company}
          onChange={onCompanyChange}
        >
          {companies.map((option) => (
            <option key={option.value} value={option.value}>
              {option.text}
            </option>
          ))}
        </select>

        <h2 className="b white f3 ma2">Farmer ID</h2>

        <input
          // key={index}
          className="br-pill b black tl"
          type="text"
          name="farmerid"
          defaultValue={names.farmerid}
          // required="required"
          placeholder="Enter Farmer ID"
          // placeholder={names.company}
          onChange={handleAddFormChange}
        />
        <label
          className=" br-pill bg-white orange f4  b pa2 hover-bg-orange hover-white"
          onClick={handleLookupFarmerID}
        >
          Lookup ID
        </label>
        {foundFarmer ? <b className="green f3">{foundFarmer}</b> : null}

        <div>
          <h2 className="b white f3 ma2">
            <b className="b white f3 ma2">First Name</b>
          </h2>

          <input
            // ref={firstnameref}
            className=" w-100 w-70-l tl  br-pill"
            placeholder="First Name"
            type="text"
            name="firstName"
            // value={addFormData.firstName}
            onChange={handleAddFormChange}
          />
        </div>
        <div>
          <h2 className="b white f3 ma2">
            <b className="b white f3 ma2">Last Name</b>
          </h2>
          <input
            // ref={lastnameref}
            className="w-100 w-70-l tl  br-pill"
            placeholder="Last Name"
            name="lastName"
            type="text"
            // value={addFormData.lastName}
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
        <div className="bg-white shadow-3  pa2 br4">
          <label className="f3 b black ">Note:</label>
          <label className="f3 b black">
            You can only add or edit a record for a farmer that belongs to your
            designated company.
          </label>
        </div>
      </div>
    </div>
  );
};

export default TwRecords;
