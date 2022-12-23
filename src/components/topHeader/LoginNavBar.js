import React from "react";
import "./navstyles.css";

import { useNavigate } from "react-router";

import "tachyons";

import logo from "../assets/img/terrawebLogo.png";

export default function LoginNavBar(props) {
  // handlenavigation
  //browser history
  const navigate = useNavigate();

  return (
    <nav class="navbar">
      <div className="navbar_logo ml0 ">
        <img src={logo} className="Logo" alt="logo" />
      </div>

      <ul class="navbar_menu">
        <li class="nav-link">
          <label onClick={() => navigate("/home")}>
            <i class="fas fa-home"></i>
            <span className="ml2">Home</span>
          </label>
        </li>

        <li class="nav-link">
          <label onClick={() => navigate("/services")}>
            {/* <FontAwesomeIcon icon="fas fa-atlas" /> */}
            <i class="fas fa-atlas"></i>
            <span className="ml2">Services</span>
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

      <ul class="navbar_sub-menu">
        <li class="nav-link">
          <label onClick={() => navigate("/about")}>
            <i className="fas fa-solid fa-info-circle"></i>
            <span className="ml2">About</span>
          </label>
        </li>
        <li class="nav-link">
          <label onClick={() => navigate("/login")}>
            <i class="fas fa-sign-in-alt"></i>
            <span className="ml2">Sign in</span>
          </label>
        </li>
        <li class="nav-link">
          <label onClick={() => navigate("/register")}>
            <i class="fas fa-user-plus"></i>
            <span className="ml2">Sign Up</span>
          </label>
        </li>
      </ul>
    </nav>
  );
}
