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
    <div class="forgotpass">
      <div class="forgotpass__box">
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
        <div class="forgotpass__main">
          <input
            type="email"
            placeholder="email"
            id="emailforgot"
            class="forgotpass__inputpass"
          />

          <div class="forgotpass__btns">
            <button class="btn btn-white">
              <label class="link-white">Reset</label>
            </button>
            <button class="btn btn-orange sign_in">
              <label onClick={() => navigate("/register")} class="link-orange">
                Sign In
              </label>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
