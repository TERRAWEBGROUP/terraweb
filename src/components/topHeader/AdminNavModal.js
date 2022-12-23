import React, { useState } from "react";

import Cookies from "js-cookie";

import "./modalstyles.css";

import logo from "../assets/img/terrawebLogo.png";

import Modal from "react-modal";
Modal.setAppElement("#root");

export default function AdminNavModal(props) {
  //   //browser history
  //   const navigate = useNavigate();

  //dropdown toggle users
  const [dropdownActiveUsers, setdropdownActiveUsers] = useState(false);

  //dropdown toggle
  const [dropdownActive, setDropdownActive] = useState(false);

  function toggleDropdownUsers() {
    setdropdownActiveUsers(!dropdownActiveUsers);
  }

  function toggleDropdown() {
    setDropdownActive(!dropdownActive);
  }

  const navigateHome = () => {
    window.location.pathname = "/home";
  };

  const navigateUsers = () => {
    window.location.pathname = "/users";
  };

  const navigateDeleteUser = () => {
    window.location.pathname = "/users";
  };
  const navigateMessages = () => {
    window.location.pathname = "/messages";
  };
  const navigateProfile = () => {
    window.location.pathname = "/profile";
  };
  const navigateRecords = () => {
    window.location.pathname = "/records";
  };

  const navigateDailyRecord = () => {
    window.location.pathname = "/records";
  };
  const navigateSummary = () => {
    window.location.pathname = "/records";
  };
  const handleLogout = () => {
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

  return (
    <div className="modalcontainer">
      <Modal
        isOpen={props.isOpen}
        onRequestClose={props.toggleModal}
        contentLabel="My dialog"
        className="mymodal"
        overlayClassName="myoverlay"
        closeTimeoutMS={200}
      >
        <div className="modal_logo bb  ">
          <div className="w-100">
            <img src={logo} className="Logo" alt="logo" />
          </div>
          <i
            onClick={props.toggleModal}
            className="fas fa-window-close f1 mr0"
          ></i>
        </div>
        <ul class="modal_menu">
          <li onClick={navigateHome} class="modal-link">
            <label>
              <i class="fas fa-home"></i>
              <span className="ml2">Home</span>
            </label>
          </li>

          {/* <li onClick={navigateBlog} class="modal-link">
            <label>
              <i class="fas fa-blog"></i>
              <span className="ml2">users</span>
            </label>
          </li> */}
          <div className="caret flex ">
            <li onClick={toggleDropdownUsers} class="modal-link">
              <label>
                <i class="fas fa-clipboard"></i>
                <span className="ml2">Users</span>
              </label>
            </li>
            {!dropdownActiveUsers ? (
              <div>
                {/* caret for dropdown toggle */}
                <label className="dropdown-label">
                  <span
                    onClick={toggleDropdownUsers}
                    className="dropdown-trigger-down"
                    class="fas fa-caret-square-down"
                  ></span>
                </label>
              </div>
            ) : null}
            {dropdownActiveUsers ? (
              <div className="left">
                {/* caret for dropdown up toggle */}

                <label onClick={toggleDropdownUsers} className="dropdown-label">
                  <span
                    className="dropdown-trigger-up"
                    class="fas fa-caret-square-up"
                  ></span>
                </label>
              </div>
            ) : null}
          </div>
          {dropdownActiveUsers ? (
            <div className="ml5 w-30">
              <label onClick={navigateUsers}>
                <i class=""></i>
                <span className="ml2"> Add user</span>
              </label>
              <label onClick={navigateDeleteUser}>
                <i class=""></i>
                <span className="ml2">DeleteUser</span>
              </label>
            </div>
          ) : null}
        </ul>

        <ul class="modal_sub-menu">
          <li onClick={navigateMessages} class="modal-link">
            <label>
              <i className="fas fa-solid fa-comment-dots"></i>
              <span className="ml2">Messages</span>
            </label>
          </li>
          <li onClick={navigateProfile} class="modal-link">
            <label>
              <i class="fas fa-user-circle"></i>
              <span className="ml2">My profile</span>
            </label>
          </li>

          <div className="caret flex ">
            <li onClick={toggleDropdown} class="modal-link">
              <label>
                <i class="fas fa-clipboard"></i>
                <span className="ml2">Records</span>
              </label>
            </li>
            {!dropdownActive ? (
              <div>
                {/* caret for dropdown toggle */}
                <label className="dropdown-label">
                  <span
                    onClick={toggleDropdown}
                    className="dropdown-trigger-down"
                    class="fas fa-caret-square-down"
                  ></span>
                </label>
              </div>
            ) : null}
            {dropdownActive ? (
              <div className="left">
                {/* caret for dropdown up toggle */}

                <label onClick={toggleDropdown} className="dropdown-label">
                  <span
                    className="dropdown-trigger-up"
                    class="fas fa-caret-square-up"
                  ></span>
                </label>
              </div>
            ) : null}
          </div>
          {dropdownActive ? (
            <div className="ml5 w-30">
              <label onClick={navigateRecords}>
                <i class=""></i>
                <span className="ml2">New Record</span>
              </label>
              <label onClick={navigateDailyRecord}>
                <i class=""></i>
                <span className="ml2">Daily Records</span>
              </label>
              <label onClick={navigateSummary}>
                <i class=""></i>
                <span className="ml2">Summary</span>
              </label>
            </div>
          ) : null}

          <li onClick={handleLogout} class="modal-link">
            <label>
              <i class="fas fa-sign-out-alt"></i>
              <span className="ml2">Logout</span>
            </label>
          </li>
        </ul>
      </Modal>
    </div>
  );
}
