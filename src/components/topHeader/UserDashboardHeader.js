import React from "react";

import { useNavigate } from "react-router-dom";

import Cookies from "js-cookie";

import "./navstyles.css";

import "tachyons";

import logo from "../assets/img/terrawebLogo.png";

export default function UserDashboardHeader(props) {
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
    <nav class="usernavbar">
      <div className="usernavbar_logo ml0 ">
        <img src={logo} className="Logo" alt="logo" />
      </div>

      <ul class="usernavbar_menu">
        <li class="nav-link">
          <label onClick={() => navigate("/home")}>
            <i class="fas fa-home"></i>
            <span className="ml2">Home</span>
          </label>
        </li>

        <li class="nav-link">
          <label onClick={() => navigate("/blog")}>
            <i class="fas fa-blog"></i>
            <span className="ml2">Blog</span>
          </label>
        </li>
      </ul>

      <i class="hamburger">
        {/* <img src={togglerlogo} className="togglerLogo" alt="logo" /> */}

        <i onClick={props.toggleModal} className="fas fa-solid fa-bars"></i>
        {/* <span className="fa-bars"></span> */}
      </i>

      <ul class="usernavbar_sub-menu">
        <li class="nav-link" onClick={() => navigate("/messages")}>
          <label>
            <i className="fas fa-solid fa-comment-dots"></i>
            <span className="ml2">Messages</span>
          </label>
        </li>
        <li class="nav-link">
          <label onClick={() => navigate("/profile")}>
            <i class="fas fa-user-circle"></i>
            <span className="ml2">My profile</span>
          </label>
        </li>
        <div class="dropdown">
          <li class="nav-link">
            <label onClick={() => navigate("/records")}>
              <i class="fas fa-clipboard"></i>
              <span className="ml2">Records</span>
            </label>
          </li>
          <div className="dropdown-content">
            <label onClick={() => navigate("/records/dailyrecords")}>
              <i class="fas fa-clipboard"></i>
              <span className="ml2">Daily Records</span>
            </label>
            <label onClick={() => navigate("/records/summary")}>
              <i class="fas fa-clipboard"></i>
              <span className="ml2">Summary Records</span>
            </label>
          </div>
        </div>
        <li class="nav-link">
          <label onClick={onLogout}>
            <i class="fas fa-sign-out-alt"></i>
            <span className="ml2">Logout</span>
          </label>
        </li>
      </ul>
    </nav>
  );
}
