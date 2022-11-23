// import "./App.css";

import React, { useState, useEffect } from "react";

import Cookies from "js-cookie";

// import "../../index.css";
import "./LoginHeader.css";
import { CSSTransition } from "react-transition-group";

import togglerlogo from "../assets/img/toggler.png";

import { useNavigate } from "react-router-dom";

import logo from "../assets/img/terrawebLogo.png";

export default function LoginHeader({ onRouteChange, isSignedIn }) {
  //browser history
  const navigate = useNavigate();

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
          <label onClick={() => navigate("/services")}>Services</label>
          <label onClick={() => navigate("/blog")}>Blog</label>
          <label onClick={() => navigate("/about")}>About</label>
          <label onClick={() => navigate("/login")}>signin</label>
          <label onClick={() => navigate("/register")}>Signup</label>
        </nav>
      </CSSTransition>
      <button onClick={toggleNav} class="Burger">
        <img src={togglerlogo} class="Logo2 " alt="logo" />
      </button>
    </header>
    // <nav class="nav">
    //   <img src="img/LOGO.png" alt="terraweb logo" class="nav__logo" />
    //   <ul class="nav__links">
    //     <li class="nav__links--link">
    //       <a href="#" class="link nav-link">
    //         Home
    //       </a>
    //     </li>
    //     <li class="nav__links--link">
    //       <a href="#" class="link nav-link">
    //         Services
    //       </a>
    //     </li>
    //     <li class="nav__links--link">
    //       <a href="#" class="link nav-link">
    //         Blog
    //       </a>
    //     </li>
    //     <li class="nav__links--link">
    //       <a href="#" class="link nav-link">
    //         About
    //       </a>
    //     </li>
    //     <li class="nav__links--link">
    //       <a href="#" class="link nav-link">
    //         SignIn
    //       </a>
    //     </li>
    //     <li class="nav__links--link">
    //       <a href="#" class="link nav-link">
    //         SignUp
    //       </a>
    //     </li>
    //   </ul>

    //   <button onClick={toggleNav} className="Burger">
    //     <img src={togglerlogo} className="Logo2 " alt="logo" />
    //   </button>
    // </nav>
  );
}

// export default LoginHeader;
