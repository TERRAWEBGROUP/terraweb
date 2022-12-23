import React from "react";

// import { useNavigate } from "react-router-dom";

import "./modalstyles.css";

import logo from "../assets/img/terrawebLogo.png";

import Modal from "react-modal";
Modal.setAppElement("#root");

export default function LoginNavModal(props) {
  //browser history
  // const navigate = useNavigate();

  const navigateHome = () => {
    window.location.pathname = "/home";
  };
  const navigateServices = () => {
    window.location.pathname = "/services";
  };
  const navigateBlog = () => {
    window.location.pathname = "/blog";
  };
  const navigateAbout = () => {
    window.location.pathname = "/about";
  };
  const navigateLogin = () => {
    window.location.pathname = "/login";
  };
  const navigateRegister = () => {
    window.location.pathname = "/register";
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

          <li onClick={navigateServices} class="modal-link">
            <label>
              {/* <FontAwesomeIcon icon="fas fa-atlas" /> */}
              <i class="fas fa-atlas"></i>
              <span className="ml2">Services</span>
            </label>

            {/* caret for dropdown toggle */}
            <label id="dropdown-trigger">
              <span class="caret-dropdown"></span>
            </label>
          </li>

          <li onClick={navigateBlog} class="modal-link">
            <label>
              <i class="fas fa-blog"></i>
              <span className="ml2">Blog</span>
            </label>
          </li>
        </ul>

        <ul class="modal_sub-menu">
          <li onClick={navigateAbout} class="modal-link">
            <label>
              <i className="fas fa-solid fa-info-circle"></i>
              <span className="ml2">About</span>
            </label>
          </li>
          <li onClick={navigateLogin} class="modal-link">
            <label>
              <i class="fas fa-sign-in-alt"></i>
              <span className="ml2">Sign in</span>
            </label>
          </li>
          <li onClick={navigateRegister} class="modal-link">
            <label>
              <i class="fas fa-user-plus"></i>
              <span className="ml2">Sign Up</span>
            </label>
          </li>
        </ul>
      </Modal>
    </div>
  );
}
