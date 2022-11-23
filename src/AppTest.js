import React from "react";

import Cookies from "js-cookie";

// import "tachyons";

//fro spinners css
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import { Routes, Route, Link } from "react-router-dom";

import Register from "./components/register/Register";
import Login from "./components/login/Login";
import ForgotPass from "./components/login/ForgotPass";

import Terms from "./components/terms/Terms";
import Homepage from "./components/home/Homepage";

import Footer from "./components/topHeader/Footer";
// import DashboardHeader from "./components/topHeader/DashboardHeader";
import LoginHeader from "./components/topHeader/LoginHeader";

// import MyAccount from "./components/myAccount/MyAccount";

// import MainAppCounter from "./components/counter/MainAppCounter";

// import "../node_modules/@syncfusion/ej2-base/styles/material.css";
// import "../node_modules/@syncfusion/ej2-buttons/styles/material.css";
// import "../node_modules/@syncfusion/ej2-react-calendars/styles/material.css";

// import { useSelector, useDispatch } from "react-redux";

function AppTest() {
  let isSignedIn = false;

  let signinCookie = Cookies.get("id");
  if (signinCookie >= 1) {
    isSignedIn = true;
  }

  //scrollto element
  let textInput = null;
  let textInput2 = null;
  let textInput3 = null;
  let textInput4 = null;
  let textInput5 = null;
  let textInput6 = null;

  const setRevandAbout = (element) => {
    textInput = element;
  };

  const setRejectbyRev = (element) => {
    textInput2 = element;
  };
  const setRevReview = (element) => {
    textInput3 = element;
  };
  const setRevApplication = (element) => {
    textInput4 = element;
  };
  const setAboutRev = (element) => {
    textInput5 = element;
  };
  const setComonReason = (element) => {
    if (element) {
      textInput6 = element;
    }
  };

  // const focusTextInput = () => {
  //   // Focus the text input using the raw DOM API
  //   if (const textInput) const textInput.focus();
  // };

  const executeScroll = () => {
    if (textInput === null) {
    } else {
      textInput.scrollIntoView({ behavior: "smooth" });
    }
  };
  const executeScroll2 = () => {
    if (textInput2 === null) {
    } else {
      textInput2.scrollIntoView({ behavior: "smooth" });
    }
  };
  const executeScroll3 = () => {
    if (textInput3 === null) {
    } else {
      textInput3.scrollIntoView({ behavior: "smooth" });
    }
  };
  const executeScroll4 = () => {
    if (textInput4 === null) {
    } else {
      textInput4.scrollIntoView({ behavior: "smooth" });
    }
  };
  const executeScroll5 = () => {
    if (textInput5 === null) {
    } else {
      textInput5.scrollIntoView({ behavior: "smooth" });
    }
  };
  const executeScroll6 = () => {
    if (textInput6 === null) {
    } else {
      textInput6.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <nav>
        <link to="/home">Home</link>
        <link to="/footer">footer</link>
      </nav>
      <Routes>
        <Route index element={<LoginHeader />} />
        <Route path="home" element={<Homepage />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </>
  );
}
export default AppTest;
