import React from "react";

import Cookies from "js-cookie";

// import "tachyons";

//fro spinners css
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Register from "./components/register/Register";
import Login from "./components/login/Login";
import ForgotPass from "./components/login/ForgotPass";

import Terms from "./components/terms/Terms";
import Homepage from "./components/home/Homepage";

//footer and headers
import Footer from "./components/topHeader/Footer";
import AdminDashboardHeader from "./components/topHeader/AdminDashboardHeader";
import LoginHeader from "./components/topHeader/LoginHeader";

//users
import Users from "./components/admin/users/Users";
import NewUser from "./components/admin/users/NewUser";
import DeleteUser from "./components/admin/users/DeleteUser";

//messages
import Messages from "./components/admin/messages/Messages";

//records
import Records from "./components/admin/records/Records";
import NewRecord from "./components/admin/records/NewRecord";
import Summary from "./components/admin/records/Summary";

//profile
import AdminProfile from "./components/admin/profile/AdminProfile";

// import MyAccount from "./components/myAccount/MyAccount";

// import MainAppCounter from "./components/counter/MainAppCounter";

// import "../node_modules/@syncfusion/ej2-base/styles/material.css";
// import "../node_modules/@syncfusion/ej2-buttons/styles/material.css";
// import "../node_modules/@syncfusion/ej2-react-calendars/styles/material.css";

// import { useSelector, useDispatch } from "react-redux";

function App() {
  let isSignedIn = false;

  let signinCookie = Cookies.get("id");
  if (signinCookie >= 1) {
    isSignedIn = true;
  } else {
    isSignedIn = false;
  }

  //scrollto element
  let textInput = null;
  let textInput2 = null;
  let textInput3 = null;
  let textInput4 = null;
  let textInput5 = null;
  let textInput6 = null;

  const setServices = (element) => {
    textInput2 = element;
  };
  const setBlog = (element) => {
    textInput3 = element;
  };

  const setAboutTerraweb = (element) => {
    textInput5 = element;
  };
  const setTerms = (element) => {
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

  switch (isSignedIn) {
    case true:
      return (
        <Router>
          <div className="Ap    ">
            <AdminDashboardHeader />

            {/* <div class="main__top-bar">
              <div class="main__top-bar--balance">
                <span> Ready to update data for 22 April</span>
              </div>
              <div class="main__top-bar--user">
                <p class="user">
                  {" "}
                  Welcome back, <span class="user-name">User Admin 1</span>
                </p>
                <image
                  src="img/user-6.jpg"
                  alt="user image"
                  class="user-image"
                />
                <a href="index.html" class="user-link">
                  Log out
                </a>
              </div>
            </div> */}
            <Routes>
              <Route exact path="/home" element={<Homepage />}></Route>

              <Route
                exact
                path="/users/newuser"
                element={
                  <section className="coolbg pa1 pa1-m">
                    <NewUser />
                  </section>
                }
              ></Route>
              <Route
                exact
                path="/users/deleteuser"
                element={
                  <section className="coolbg pa1 pa1-m">
                    <DeleteUser />
                  </section>
                }
              ></Route>
              <Route
                exact
                path="/users"
                element={
                  <section className="coolbg pa1 pa1-m">
                    <Users />
                  </section>
                }
              ></Route>
              {/* <Route exact path="/messages" element={<Messages />}></Route> */}
              <Route
                exact
                path="/records/newrecord"
                element={
                  <section className="coolbg pa1 pa1-m">
                    <NewRecord />
                  </section>
                }
              ></Route>
              <Route
                exact
                path="/records/summary"
                element={
                  <section className="coolbg pa1 pa1-m">
                    <Summary />
                  </section>
                }
              ></Route>
              <Route
                exact
                path="/dailyrecords"
                element={
                  <section className="coolbg pa1 pa1-m">
                    <Records />
                  </section>
                }
              ></Route>
              <Route exact path="/myprofile" element={<AdminProfile />}></Route>
              <Route
                exact
                path="*"
                element={
                  <section className=" center">
                    <Homepage
                      setAboutTerraweb={setAboutTerraweb}
                      setBlog={setBlog}
                      setServices={setServices}
                      setTerms={setTerms}
                    />
                  </section>
                }
              ></Route>
            </Routes>
            <Footer
              executeScroll={executeScroll}
              executeScroll2={executeScroll2}
              executeScroll3={executeScroll3}
              executeScroll4={executeScroll4}
              executeScroll5={executeScroll5}
              executeScroll6={executeScroll6}
            />
          </div>
        </Router>
      );

    default:
      return (
        <Router>
          <div className="Ap    ">
            <LoginHeader />

            <Routes>
              <Route exact path="/login" element={<Login />}></Route>
              <Route
                path="/register"
                element={
                  <section className="coolbg pa1-m pa1">
                    <Register />
                  </section>
                }
              ></Route>
              <Route
                exact
                path="/forgotpass"
                element={
                  <section className="coolbg pa1 pa1-m">
                    <ForgotPass />
                  </section>
                }
              ></Route>
              <Route
                exact
                path="/termsofservice"
                element={
                  <section className="coolbg pa1 pa1-m">
                    <Terms />
                  </section>
                }
              ></Route>
              <Route
                exact
                path="*"
                element={
                  <section className=" center">
                    <Homepage
                      setAboutTerraweb={setAboutTerraweb}
                      setBlog={setBlog}
                      setServices={setServices}
                      setTerms={setTerms}
                    />
                  </section>
                }
              ></Route>
            </Routes>

            <Footer
              executeScroll={executeScroll}
              executeScroll2={executeScroll2}
              executeScroll3={executeScroll3}
              executeScroll4={executeScroll4}
              executeScroll5={executeScroll5}
              executeScroll6={executeScroll6}
            />
          </div>
        </Router>
      );
  }
}
export default App;
