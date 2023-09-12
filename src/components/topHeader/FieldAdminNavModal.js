import React, { useState } from "react";

import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import "./modalstyles.css";

import logo from "../assets/img/terrawebLogo.png";

import Modal from "react-modal";
Modal.setAppElement("#root");

export default function FieldAdminNavModal(props) {
  //browser history
  const navigate = useNavigate();

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
    // window.location.pathname = "/home";
    navigate("/home");
    props.toggleModal();
  };

  const navigateMessages = () => {
    // window.location.pathname = "/messages";
    navigate("/messages");
    props.toggleModal();
  };
  const navigateProfile = () => {
    // window.location.pathname = "/profile";
    navigate("/profile");
    props.toggleModal();
  };
  const navigateRecords = () => {
    // window.location.pathname = "/records";
    navigate("/records");
    props.toggleModal();
  };

  const navigateDailyRecord = () => {
    // window.location.pathname = "/records";
    navigate("/records");
    props.toggleModal();
  };
  const navigateSummary = () => {
    // window.location.pathname = "/records";
    navigate("/records");
    props.toggleModal();
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
        <ul className="modal_menu">
          <li onClick={navigateHome} className="modal-link">
            <label>
              <i className="fas fa-home"></i>
              <span className="ml2">Home</span>
            </label>
          </li>
        </ul>

        <ul className="modal_sub-menu">
          <li onClick={navigateMessages} className="modal-link">
            <label>
              <i className="fas fa-solid fa-comment-dots"></i>
              <span className="ml2">Messages</span>
            </label>
          </li>
          <li onClick={navigateProfile} className="modal-link">
            <label>
              <i className="fas fa-user-circle"></i>
              <span className="ml2">My profile</span>
            </label>
          </li>

          <div className="caret flex ">
            <li onClick={toggleDropdown} className="modal-link">
              <label>
                <i className="fas fa-clipboard"></i>
                <span className="ml2">Records</span>
              </label>
            </li>
            {!dropdownActive ? (
              <div>
                {/* caret for dropdown toggle */}
                <label className="dropdown-label">
                  <span
                    onClick={toggleDropdown}
                    // className="dropdown-trigger-down"
                    className="fas fa-caret-square-down"
                  ></span>
                </label>
              </div>
            ) : null}
            {dropdownActive ? (
              <div className="left">
                {/* caret for dropdown up toggle */}

                <label onClick={toggleDropdown} className="dropdown-label">
                  <span
                    // className="dropdown-trigger-up"
                    className="fas fa-caret-square-up"
                  ></span>
                </label>
              </div>
            ) : null}
          </div>
          {dropdownActive ? (
            <div className="ml5 w-30">
              <label onClick={navigateRecords}>
                <i className=""></i>
                <span className="ml2">New Record</span>
              </label>
              <label onClick={navigateDailyRecord}>
                <i className=""></i>
                <span className="ml2">Daily Records</span>
              </label>
              <label onClick={navigateSummary}>
                <i className=""></i>
                <span className="ml2">Summary</span>
              </label>
            </div>
          ) : null}

          <li onClick={handleLogout} className="modal-link">
            <label>
              <i className="fas fa-sign-out-alt"></i>
              <span className="ml2">Logout</span>
            </label>
          </li>
        </ul>
      </Modal>
    </div>
  );
}
