import React from "react";

import "tachyons";

import "./style.css";
// import "bootstrap/dist/css/bootstrap.min.css";
const AdminProfile = () => {
  return (
    <div className="container rounded bg-white mt-5 mb-5 pa5 cf center">
      <div className="row flex flex-wrap center">
        <div className="col-md-3 border-right fl pv5 pa5">
          <div className="d-flex flex-column align-items-center text-center p-3 py-5 flex tc center">
            <img
              className="rounded-circle mt-5"
              alt="profile"
              width="150px"
              src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
            />
            <span className="font-weight-bold">Edogaru</span>
            <span className="text-black-50">edogaru@mail.com.my</span>
            <span> </span>
          </div>
        </div>
        <div className="col-md-5 border-right fl tc pv5 pa5">
          <div className="p-3 py-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="text-right">Profile Settings</h4>
            </div>
            <div className="row mt-2 ">
              <div className="col-md-6 dib">
                <label className="labels">Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="first name"
                />
              </div>
              <div className="col-md-6">
                <label className="labels">Surname</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="surname"
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-12">
                <label className="labels">Mobile Number</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="enter phone number"
                />
              </div>
              <div className="col-md-12">
                <label className="labels">Address Line 1</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="enter address line 1"
                />
              </div>

              <div className="col-md-12">
                <label className="labels">Email ID</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="enter email id"
                />
              </div>
            </div>

            <div className="ma3 ml6">
              <button className="bg-orange pa2  br-pill white f3 b hover-bg-orange hover-white center">
                Save Profile
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-4 fr  tc pv5 pa5">
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
                className="form-control"
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
          <div className="mt-1 ml6">
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
