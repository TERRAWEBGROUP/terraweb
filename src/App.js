import React, { useState } from "react";

import Cookies from "js-cookie";

// import "tachyons";

//fro spinners css
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Register from "./components/register/Register";

import RegisterAdmin from "./components/register/RegisterAdmin";

import Login from "./components/login/Login";
import ForgotPass from "./components/login/ForgotPass";

import Terms from "./components/terms/Terms";
import Homepage from "./components/home/Homepage";
import Home from "./components/home/Home";

//footer and headers
import Footer from "./components/topHeader/Footer";
import AdminDashboardHeader from "./components/topHeader/AdminDashboardHeader";
import TerrawebAdminDashboardHeader from "./components/topHeader/TerrawebAdminDashboardHeader";
import FieldAdminDashboardHeader from "./components/topHeader/FieldAdminDashboardHeader";

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

//nav bar modal
import LoginNavModal from "./components/topHeader/LoginNavModal";

//Login navbar
import LoginNavBar from "./components/topHeader/LoginNavBar";

//User dashboard header
import UserDashboardHeader from "./components/topHeader/UserDashboardHeader";

//User nav modal
import UserNavModal from "./components/topHeader/UserNavModal";

//Admin nav modal
import AdminNavModal from "./components/topHeader/AdminNavModal";

//m admin nav modal
import TerrawebAdminNavModal from "./components/topHeader/TerrawebAdminNavModal";

//FieldAdmin nav modal
import FieldAdminNavModal from "./components/topHeader/FieldAdminNavModal";

//records populated in calender view
import RecordsCalender from "./components/user/recordsCalender/RecordsCalender";
import TwRecords from "./components/twAdmin/twRecords/TwRecords";
import TwUsers from "./components/twAdmin/twUsers/TwUsers";

// import MyAccount from "./components/myAccount/MyAccount";

// import MainAppCounter from "./components/counter/MainAppCounter";

// import "../node_modules/@syncfusion/ej2-base/styles/material.css";
// import "../node_modules/@syncfusion/ej2-buttons/styles/material.css";
// import "../node_modules/@syncfusion/ej2-react-calendars/styles/material.css";

// import { useSelector, useDispatch } from "react-redux";

function App() {
  //login variable that determines if admin or normal user and if signed in
  let loginStatus = "";

  let isSignedIn = false;
  let isAdmin = false;
  let isFieldAdmin = false;
  let isUser = false;
  let isTwAdmin = false;

  let userCookie = "";
  userCookie = Cookies.get("sessioniduser");

  let adminCookie = "";
  adminCookie = Cookies.get("sessionidadmin");

  let sessiontype = "";
  sessiontype = Cookies.get("sessiontype");

  try {
    if (userCookie.length >= 8 && sessiontype === "farmer") {
      let isTwAdmin = false;

      isAdmin = false;
      isUser = true;
      isFieldAdmin = false;
      loginStatus = "isUser";
    } else if (adminCookie.length >= 8 && sessiontype === "admin") {
      let isTwAdmin = false;

      isAdmin = true;
      isUser = false;
      isFieldAdmin = false;
      loginStatus = "isAdmin";
    } else if (adminCookie.length >= 8 && sessiontype === "fieldAdmin") {
      let isTwAdmin = false;

      isAdmin = false;
      isUser = false;
      isFieldAdmin = true;
      loginStatus = "isFieldAdmin";
    } else if (adminCookie.length >= 8 && sessiontype === "twAdmin") {
      let isTwAdmin = true;

      isAdmin = false;
      isUser = false;
      isFieldAdmin = false;
      loginStatus = "twAdmin";
    } else {
      isAdmin = false;
      isUser = false;
      isFieldAdmin = false;
      loginStatus = "";
    }
  } catch (error) {}

  try {
    if (sessiontype === "farmer") {
      isTwAdmin = false;
      isAdmin = false;
      isUser = true;
      isFieldAdmin = false;
      loginStatus = "isUser";
    } else if (sessiontype === "fieldAdmin") {
      isTwAdmin = false;

      isAdmin = false;
      isUser = false;
      isFieldAdmin = true;
      loginStatus = "isFieldAdmin";
    } else if (sessiontype === "admin") {
      isTwAdmin = false;

      isAdmin = true;
      isUser = false;

      isFieldAdmin = false;
      loginStatus = "isAdmin";
    } else if (sessiontype === "twAdmin") {
      isTwAdmin = true;

      isAdmin = false;
      isUser = false;

      isFieldAdmin = false;
      loginStatus = "isTwAdmin";
    } else {
      isTwAdmin = false;
      isAdmin = false;
      isUser = false;
      isFieldAdmin = false;
      loginStatus = "";
    }
  } catch (error) {}

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

  //display navbar modal
  const [isOpen, setIsOpen] = useState(false);

  function toggleModal() {
    setIsOpen(!isOpen);
  }

  switch (loginStatus) {
    case "isTwAdmin":
      return (
        <Router>
          <div className="Ap    ">
            {/* <AdminDashboardHeader /> */}
            <TerrawebAdminDashboardHeader
              toggleModal={toggleModal}
              isOpen={isOpen}
            />

            <TerrawebAdminNavModal toggleModal={toggleModal} isOpen={isOpen} />

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
                    <TwUsers />
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
                  <section className="coolbg pa1 pa1-m w-100-l">
                    <TwRecords />
                  </section>
                }
              ></Route>
              <Route
                exact
                path="/records"
                element={
                  <section className="coolbg pa1 pa1-m w-100-l">
                    <TwRecords />
                  </section>
                }
              ></Route>
              <Route
                exact
                path="/profile"
                element={
                  <section className="coobg pa1 pa1-m">
                    <AdminProfile />
                  </section>
                }
              ></Route>
              <Route
                exact
                path="*"
                element={
                  <section className=" center">
                    <Home
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
    case "isFieldAdmin":
    case "isAdmin":
      return (
        <Router>
          <div className="Ap    ">
            {/* <AdminDashboardHeader /> */}
            <AdminDashboardHeader toggleModal={toggleModal} isOpen={isOpen} />

            <AdminNavModal toggleModal={toggleModal} isOpen={isOpen} />

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
                  <section className="coolbg pa1 pa1-m w-100-l">
                    <Records />
                  </section>
                }
              ></Route>
              <Route
                exact
                path="/records"
                element={
                  <section className="coolbg pa1 pa1-m w-100-l">
                    <Records />
                  </section>
                }
              ></Route>
              <Route
                exact
                path="/profile"
                element={
                  <section className="coobg pa1 pa1-m">
                    <AdminProfile />
                  </section>
                }
              ></Route>
              <Route
                exact
                path="*"
                element={
                  <section className=" center">
                    <Home
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
    case "isFieldAdmin":
      return (
        <Router>
          <div className="Ap    ">
            {/* <AdminDashboardHeader /> */}
            <FieldAdminDashboardHeader
              toggleModal={toggleModal}
              isOpen={isOpen}
            />

            <AdminNavModal toggleModal={toggleModal} isOpen={isOpen} />

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
                  <section className="coolbg pa1 pa1-m w-100-l">
                    <Records />
                  </section>
                }
              ></Route>
              <Route
                exact
                path="/records"
                element={
                  <section className="coolbg pa1 pa1-m w-100-l">
                    <Records />
                  </section>
                }
              ></Route>
              <Route
                exact
                path="/profile"
                element={
                  <section className="coolbg pa1 pa1-m">
                    <AdminProfile />
                  </section>
                }
              ></Route>
              <Route
                exact
                path="*"
                element={
                  <section className=" center">
                    <Home
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
    case "isUser":
      return (
        <Router>
          <div className="Ap    ">
            {/* <AdminDashboardHeader /> */}
            <UserDashboardHeader toggleModal={toggleModal} isOpen={isOpen} />

            <UserNavModal toggleModal={toggleModal} isOpen={isOpen} />

            <Routes>
              <Route exact path="/home" element={<Home />}></Route>

              <Route
                exact
                path="/records"
                element={
                  <section className="coolbg pa1-m pa1">
                    <RecordsCalender />
                  </section>
                }
              ></Route>
              <Route
                exact
                path="/records/summary"
                element={
                  <section className="coolbg pa1-m pa1">
                    <RecordsCalender />
                  </section>
                }
              ></Route>
              <Route
                exact
                path="/records/dailyrecords"
                element={
                  <section className="coolbg pa1-m pa1">
                    <RecordsCalender />
                  </section>
                }
              ></Route>
              <Route
                exact
                path="/profile"
                element={
                  <section className="coolbg pa1-m pa1">
                    <AdminProfile />
                  </section>
                }
              ></Route>
              <Route
                exact
                path="*"
                element={
                  <section className=" center">
                    <Home
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
        <div className="Ap">
          <Router>
            <LoginNavBar toggleModal={toggleModal} />
            {/* <LoginHeader /> */}

            <LoginNavModal toggleModal={toggleModal} isOpen={isOpen} />

            <Routes>
              <Route
                exact
                path="/registerAdmin"
                element={
                  <section className="coolbg pa1-m pa1">
                    <RegisterAdmin />
                  </section>
                }
              ></Route>

              <Route
                exact
                path="/login"
                element={
                  <section className="coolbg pa1-m pa1">
                    <Login />
                  </section>
                }
              ></Route>
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
                  <Homepage
                    setAboutTerraweb={setAboutTerraweb}
                    setBlog={setBlog}
                    setServices={setServices}
                    setTerms={setTerms}
                  />
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
          </Router>
        </div>
      );
  }
}
export default App;
