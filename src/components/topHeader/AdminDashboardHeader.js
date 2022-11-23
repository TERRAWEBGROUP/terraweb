import React, { useState, useEffect } from "react";

import "./LoginHeader.css";

import "./AdminDashboardHeader.css";
import { CSSTransition } from "react-transition-group";

import togglerlogo from "../assets/img/toggler.png";

import { useNavigate } from "react-router-dom";

import logo from "../assets/img/terrawebLogo.png";

import Cookies from "js-cookie";

// import img from "../assets/img/terrawebLogo.png";

const AdminDashboardHeader = ({ onRouteChange, isSignedIn }) => {
  //browser history
  const navigate = useNavigate();

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

  const [isNavVisible, setNavVisibility] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 700px)");

    window.addEventListener("resize", handleMediaQueryChange(mediaQuery));

    return () => {
      window.removeEventListener("resize", handleMediaQueryChange);
    };
  }, []);

  const handleMediaQueryChange = (mediaQuery) => {
    if (mediaQuery.matches) {
      setIsSmallScreen(true);
      // setNavVisibility(true);
    } else {
      setIsSmallScreen(false);
      setNavVisibility(!isNavVisible);
    }
  };

  const toggleNav = () => {
    // if (isMediaQuery === "largeScreen") {
    //   setIsSmallScreen(!isSmallScreen);
    //   setNavVisibility(!isSmallScreen);
    // } else {
    //   setNavVisibility(!isNavVisible);
    // }
    setNavVisibility(!isNavVisible);
    setIsSmallScreen(!isSmallScreen);
  };

  return (
    <header class="Header">
      <img src={logo} class="Logo" alt="logo" />
      <CSSTransition
        in={!isSmallScreen || isNavVisible}
        timeout={350}
        classNames="NavAnimation"
        unmountOnExit
      >
        <nav class="Nav">
          <label onClick={() => navigate("/home")}>Home</label>

          <label>Blog</label>
          <div class="dropdown">
            <label onClick={() => navigate("/users")}>Users</label>
            {/* <button class="dropbtn">Dropdown</button> */}
            <div class="dropdown-content">
              <label onClick={() => navigate("/users/newuser")}>Add User</label>
              <label onClick={() => navigate("/users/deleteuser")}>
                Delete User
              </label>
            </div>
          </div>
          <label>Messages</label>
          <label onClick={() => navigate("/myprofile")}>My Profile</label>
          <div class="dropdown">
            {/* <button class="dropbtn">Dropdown</button> */}
            <label onClick={() => navigate("/dailyrecords")}>Records</label>
            <div class="dropdown-content">
              <label onClick={() => navigate("/records/newrecord")}>
                New record
              </label>
              <label onClick={() => navigate("/dailyrecords")}>
                Daily Records
              </label>
              <label onClick={() => navigate("/records/summary")}>
                Summary
              </label>
            </div>
          </div>
          <label onClick={onLogout}>Logout</label>
        </nav>
      </CSSTransition>
      <button onClick={toggleNav} class="Burger">
        <img src={togglerlogo} class="Logo2 " alt="logo" />
      </button>
    </header>
  );
};

export default AdminDashboardHeader;
