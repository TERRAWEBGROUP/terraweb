import React from "react";

import { useNavigate } from "react-router-dom";
// import { useHistory } from "react-router-dom";

import "./modalstyles.css";

import logo from "../assets/img/terrawebLogo.png";

import Modal from "react-modal";
Modal.setAppElement("#root");

export default function LoginNavModal(props) {
  // browser history
  // const history = useHistory();

  //handle navigation
  const navigate = useNavigate();

  const navigateHome = () => {
    // window.location.pathname = "/home";
    navigate("/home");
    props.toggleModal();
  };
  const navigateServices = () => {
    // window.location.pathname = "/services";
    navigate("/services");
    props.toggleModal();
  };
  const navigateBlog = () => {
    // window.location.pathname = "/blog";
    navigate("/blog");
    props.toggleModal();
  };
  const navigateAbout = () => {
    // window.location.pathname = "/about";
    navigate("/about");
    props.toggleModal();
  };
  const navigateLogin = (e) => {
    // window.location.pathname = "/login";
    e.preventDefault();
    // window.location.href = "/login";

    // history.push("/login");
    navigate("/login");
    props.toggleModal();
  };
  const navigateRegister = (e) => {
    // window.location.pathname = "/register";
    e.preventDefault();
    // window.location.href = "/register";

    // history.push("/register");
    navigate("/register");
    props.toggleModal();
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

          <li onClick={navigateServices} className="modal-link">
            <label>
              {/* <FontAwesomeIcon icon="fas fa-atlas" /> */}
              <i className="fas fa-atlas"></i>
              <span className="ml2">Services</span>
            </label>

            {/* caret for dropdown toggle */}
            <label id="dropdown-trigger">
              <span className="caret-dropdown"></span>
            </label>
          </li>

          <li onClick={navigateBlog} className="modal-link">
            <label>
              <i className="fas fa-blog"></i>
              <span className="ml2">Blog</span>
            </label>
          </li>
        </ul>

        <ul className="modal_sub-menu">
          <li onClick={navigateAbout} className="modal-link">
            <label>
              <i className="fas fa-solid fa-info-circle"></i>
              <span className="ml2">About</span>
            </label>
          </li>
          <li onClick={navigateLogin} className="modal-link">
            <label>
              <i className="fas fa-sign-in-alt"></i>
              <span className="ml2">Sign in</span>
            </label>
          </li>
          <li onClick={navigateRegister} className="modal-link">
            <label>
              <i className="fas fa-user-plus"></i>
              <span className="ml2">Sign Up</span>
            </label>
          </li>
        </ul>
      </Modal>
    </div>
  );
}
