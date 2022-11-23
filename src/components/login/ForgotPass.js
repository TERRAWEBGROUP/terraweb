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
    <div class="login">
      <div class="login__box">
        <div class="login__header">
          <img
            src="img/WHITE LOGO.png"
            alt="terraweb white logo"
            class="login__header--image"
          />
        </div>
        <button className="btn w-100">
          <label className="black f3">
            You will recieve an email to reset your password if your email is in
            our database
          </label>
        </button>
        <div class="login__main">
          <input
            type="email"
            placeholder="email"
            id="emailforgot"
            class="login__inputpass"
          />

          <div class="login__btns">
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
