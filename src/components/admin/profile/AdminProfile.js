import React, { useState, Fragment, useEffect, useRef } from "react";

import "tachyons";

import "./style.css";
// import "bootstrap/dist/css/bootstrap.min.css";

import data from "./mock-data.json";

import Cookies from "js-cookie";

import { Circles } from "react-loader-spinner";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Divider } from "@tremor/react";

const AdminProfile = () => {
  const [contacts, setContacts] = useState(data);
  const [addFormData, setAddFormData] = useState({
    username: "",
    email: "",

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
    category: options[0].value,
    username: "",
    company: "",
    phone: val,
    gender: options[0].value,
    status: "",
  });

  useEffect(() => {
    //fetch agents
    const fetchProfile = () => {
      let adminCookie = "";
      adminCookie = Cookies.get("sessionidadmin");
      let userid = "";
      userid = Cookies.get("sessioniduser");
      if (adminCookie.length >= 1 || userid.length >= 1) {
        setIsLoading(true);
        setTimeout(() => {
          fetch("http://localhost:8000/loadProfile", {
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
                console.log(user);
                console.log("found error" + user[0].username);
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

    fetchProfile();
  }, []);

  return (
    <div className="container rounded bg-white   pa3 center br4 mt6 shadow-3">
      <div className="co-container flex ">
        <div className="col-md-3 border-right fl pv5 pa5">
          <div className="d-flex flex-column align-items-center text-center p-3 py-5 flex tc center">
            <img
              className="rounded-circle mt-5"
              alt="profile"
              width="150px"
              src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
            />
            <span className="b f3">
              {contacts[0].username ? contacts[0].username : ""}
            </span>
            <span className="b f4">
              {contacts[0].email ? contacts[0].email : ""}
            </span>

            <span>
              <label className="b f4">Status:</label>
              <label className="ml2 b f3">
                {contacts[0].status ? contacts[0].status : ""}
              </label>
            </span>
            <span>
              <label className="b f4">Company:</label>
              <label className="ml2 b f3">
                {contacts[0].company ? contacts[0].company : ""}
              </label>
            </span>
          </div>
        </div>
        <div className="col-md-5 border-right fl tc pv5 pa5">
          <div className="p-3 py-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="b f2">Profile Settings</h4>
            </div>
            <div className="dt center">
              <div className=" ">
                <label className="b f3  w-100">Full Name</label>
                <input
                  type="text"
                  className="w-100"
                  placeholder="Full Name"
                  value={contacts[0].fullname ? contacts[0].username : ""}
                />
              </div>
            </div>
            <div className="dt center pt2 ">
              <label className="b f3  w-100">Mobile Number</label>
              <div className="dib flex">
                <input
                  type="text"
                  className="w-100"
                  placeholder="Phone number"
                  value={contacts[0].phone ? contacts[0].phone : ""}
                />
                <label className="b red f4 hover-blue">
                  Not Confirmed. Click here to confirm
                </label>
              </div>

              <div className="dt cente mr0 pt2 ">
                <label className=" b f3  w-100">Email</label>
                <div className="dib flex">
                  <input
                    type="text"
                    className="w-100"
                    placeholder="Email"
                    value={contacts[0].email ? contacts[0].email : ""}
                  />
                  <label className="b red f4 hover-blue">
                    Not Confirmed. Click here to confirm
                  </label>
                </div>
              </div>
            </div>

            <div className="ma3 ">
              <button className="bg-orange pa2  br-pill white f3 b hover-bg-orange hover-white center">
                Save Profile
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-4   tc pv2 pa3">
          <div className="p-3 py-5">
            <div className="d-flex justify-content-between align-items-center experience">
              <span>
                <label className="tc b f3">Change Password</label>
              </span>
            </div>
            <br />
            <div className="col-md-12">
              <label className="labels">Current Password</label>
              <input
                type="password"
                className="form-control "
                placeholder="Current Password"
              />
            </div>
            <br />
            <div className="col-md-12">
              <label className="labels">New Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="New Password"
              />
            </div>
            <div className="col-md-12">
              <label className="labels">Confirm New Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Confirm New Password"
              />
            </div>
          </div>
          <div className="ma3">
            <button className="bg-orange pa2  br-pill white f3 b hover-bg-orange hover-white center">
              Update Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminProfile;
