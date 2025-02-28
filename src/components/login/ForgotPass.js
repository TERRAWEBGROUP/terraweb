import React, { useRef } from "react";

import { useNavigate } from "react-router-dom";

import "../../index.css";

export default function ForgotPass({
  onRouteChange,
  isSignedIn,
  props,
  executeScroll,
  executeScroll2,
  executeScroll3,
  executeScroll4,
  executeScroll5,
  executeScroll6,
}) {
  const navigate = useNavigate();

  return (
    <div className="forgotpass">
      <div className="forgotpass__box">
        <div className="forgotpass__header ">
          <img
            src="img/WHITE LOGO.png"
            alt="terraweb white logo"
            className="forgotpass__header--image"
          />
        </div>
        <button className="reset__btn ">
          <label className="resetlabel black b f3 w-100">
            You will recieve an email to reset your password if your email is in
            our database
          </label>
        </button>
        <div className="forgotpass__main">
          <input
            type="email"
            placeholder="email"
            id="emailforgot"
            className="forgotpass__inputpass"
          />

          <div className="forgotpass__btns">
            <button className="btn btn-white">
              <label className="link-white">Reset</label>
            </button>
            <button className="btn btn-orange sign_in">
              <label
                onClick={() => navigate("/register")}
                className="link-orange"
              >
                Sign In
              </label>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
