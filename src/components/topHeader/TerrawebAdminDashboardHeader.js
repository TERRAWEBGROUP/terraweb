import React from "react";

import { useNavigate } from "react-router-dom";

import Cookies from "js-cookie";

import "./navstyles.css";

import "tachyons";

import logo from "../assets/img/terrawebLogo.png";

export default function TerrawebAdminDashboardHeader(props) {
  //handle logout
  const onLogout = () => {
    //remove all cookies

    Object.keys(Cookies.get()).forEach(function (cookieName) {
      var neededAttributes = {
        // Here you pass the same attributes that were used when the cookie was created
        // and are required when removing the cookie
        // id: user.id,
      };

      Cookies.remove(cookieName, neededAttributes);
    });
    window.location.pathname = "/";
  };

  // handlenavigation
  //browser history
  const navigate = useNavigate();

  return (
    <nav className="usernavbar">
      <div className="usernavbar_logo ml0 ">
        <img src={logo} className="Logo" alt="logo" />
      </div>

      <ul className="usernavbar_menu">
        <li className="nav-link">
          <label onClick={() => navigate("/home")}>
            <i className="fas fa-home"></i>
            <span className="ml2">Home</span>
          </label>
        </li>

        <div className="dropdown">
          <li className="nav-link">
            <label onClick={() => navigate("/users")}>
              <i className="fas fa-clipboard"></i>
              <span className="ml2">Users</span>
            </label>
          </li>
          <div className="dropdown-content">
            <label>
              <i className="fas fa-plus-circle"></i>
              <span className="ml2">Add User</span>
            </label>
            <label>
              <i className="fas fa-user-times"></i>
              <span className="ml2">Delete User</span>
            </label>
          </div>
        </div>
      </ul>

      <i className="hamburger">
        {/* <img src={togglerlogo} className="togglerLogo" alt="logo" /> */}

        <i onClick={props.toggleModal} className="fas fa-solid fa-bars"></i>
        {/* <span className="fa-bars"></span> */}
      </i>

      <ul className="usernavbar_sub-menu">
        <li className="nav-link" onClick={() => navigate("/messages")}>
          <label>
            <i className="fas fa-solid fa-comment-dots"></i>
            <span className="ml2">Messages</span>
          </label>
        </li>
        <li className="nav-link">
          <label onClick={() => navigate("/profile")}>
            <i className="fas fa-user-circle"></i>
            <span className="ml2">My profile</span>
          </label>
        </li>
        <div className="dropdown">
          <li className="nav-link">
            <label onClick={() => navigate("/records")}>
              <i className="fas fa-clipboard"></i>
              <span className="ml2">Records</span>
            </label>
          </li>
          <div className="dropdown-content">
            <label>
              <i className="fas fa-plus-circle"></i>
              <span className="ml2">New Record</span>
            </label>
            <label>
              <i className="fas fa-clipboard"></i>
              <span className="ml2">Daily Records</span>
            </label>
            <label>
              <i className="fas fa-clipboard"></i>
              <span className="ml2">Summary Records</span>
            </label>
          </div>
        </div>
        <li className="nav-link">
          <label onClick={onLogout}>
            <i className="fas fa-sign-out-alt"></i>
            <span className="ml2">Logout</span>
          </label>
        </li>
      </ul>
    </nav>
  );
}
