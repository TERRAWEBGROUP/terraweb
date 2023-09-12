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
    <nav className="navbar">
      <div className="navbar_logo ml0 ">
        <img src={logo} className="Logo" alt="logo" />
      </div>

      <ul className="navbar_menu">
        <li className="nav-link">
          <label onClick={() => navigate("/home")}>
            <i className="fas fa-home"></i>
            <span className="ml2">Home</span>
          </label>
        </li>

        <li className="nav-link">
          <label onClick={() => navigate("/services")}>
            {/* <FontAwesomeIcon icon="fas fa-atlas" /> */}
            <i className="fas fa-atlas"></i>
            <span className="ml2">Services</span>
          </label>
        </li>

        <li className="nav-link">
          <label onClick={() => navigate("/blog")}>
            <i className="fas fa-blog"></i>
            <span className="ml2">Blog</span>
          </label>
        </li>
      </ul>

      <i className="hamburger">
        {/* <img src={togglerlogo} className="togglerLogo" alt="logo" /> */}

        <i onClick={props.toggleModal} className="fas fa-solid fa-bars"></i>
        {/* <span className="fa-bars"></span> */}
      </i>

      <ul className="navbar_sub-menu">
        <li className="nav-link">
          <label onClick={() => navigate("/about")}>
            <i className="fas fa-solid fa-info-circle"></i>
            <span className="ml2">About</span>
          </label>
        </li>
        <li className="nav-link">
          <label onClick={() => navigate("/login")}>
            <i className="fas fa-sign-in-alt"></i>
            <span className="ml2">Sign in</span>
          </label>
        </li>
        <li className="nav-link">
          <label onClick={() => navigate("/register")}>
            <i className="fas fa-user-plus"></i>
            <span className="ml2">Sign Up</span>
          </label>
        </li>
      </ul>
    </nav>
  );
}
