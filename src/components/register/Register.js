import React, { useRef, useState } from "react";

import { useNavigate } from "react-router-dom";

import validator from "validator";

import { useDispatch } from "react-redux";
import { loadUser } from "../../redux/loginSlice";

import { Oval } from "react-loader-spinner";

import "../../index.css";
import "tachyons";

function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [flag, setFlag] = useState("");
  const [success, setSuccess] = useState("");
  const [foundErr, setFoundErr] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  // const { user } = useSelector((state) => state.login);
  const dispatch = useDispatch();

  const validateEmail = () => {
    var emailval = email;

    if (validator.isEmail(emailval)) {
      setEmailError("valid");

      setFlag(1);
    } else {
      setEmailError("not valid");

      setFlag(2);
    }
  };

  function onEmailChange(event) {
    if (email.length >= 1) {
      setFlag(1);
    } else {
      setFlag(2);
    }
    setEmail(event.target.value);
    validateEmail();
  }

  const onPasswordChange = (event) => {
    if (password.length >= 1) {
      setFlag(1);
    } else {
      setFlag(2);
    }
    setPassword(event.target.value);
  };

  const onSubmitRegister = () => {
    validateEmail();
    if (flag === 1) {
      setIsLoading(true);

      fetch("https://terraweb.herokuapp.com/register", {
        method: "post",
        headers: { "Content-Type": "application/JSON" },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
        .then(function (response) {
          if (response.status === 400) {
            throw Error("Unable to register. User perhaps already exists.");
          }
          if (response.status === 417) {
            throw Error("Fill all details");
          }

          if (response === 500) {
            throw Error("could not complete request because of an error");
          }
          return response.json();
        })
        .then((user) => {
          if (user) {
            dispatch(loadUser(user));
            setEmail("");
            setPassword("");
            setSuccess("success");
            setFoundErr(null);
            setIsLoading(null);
          } else {
            setSuccess("not good");
            setFoundErr(null);
            setIsLoading(null);
          }
        })
        .catch((err) => {
          setSuccess("got error");

          setFoundErr(err.message);
          setIsLoading(null);
        });
    }
  };

  return (
    <div class="login">
      {/* <section class="login__box"> */}
      <div class="login__header">
        <img
          src="img/WHITE LOGO.png"
          alt="terraweb white logo"
          class="login__header--image"
        />
      </div>
      <div class="login__main">
        <input
          type="email"
          id="id"
          placeholder="email address"
          class="login__input"
          onChange={onEmailChange}
        />
        {emailError === "not valid" && (
          <p className="card-tite f6 b red">Incorrect email format.</p>
        )}
        <input
          type="password"
          id="passwordsgn"
          placeholder="Password"
          class="login__input"
          onChange={onPasswordChange}
        />
        <input
          type="password"
          id="passwordconfirm"
          placeholder="Confirm Password"
          class="login__input"
        />

        {foundErr && <label className="dt b red mv3">{foundErr}</label>}

        {flag === 2 && (
          <p className="card-tite f6 red b">Some fields are incorrect.</p>
        )}
        {success === "success" && (
          <p className="card-tite f4 blue b">
            Account created successfully. Please Login now.
          </p>
        )}
        {success === "not good" && (
          <p className="card-tite f4 red b">Error. Please try again.</p>
        )}
        <div className="lh-copy mt2 pv2 button">
          <label
            onClick={() => navigate("/termsofservice")}
            className="f4 measure  hover-blue dim black "
          >
            By clicking <b className="b f4">"Register"</b> you agree to our
            Terms and Conditions.
          </label>
        </div>
        {isLoading && (
          <div className="db mb2">
            <Oval type="Oval" color="#0000FF" height={40} width={80} />
          </div>
        )}

        <div className=" w-100  ">
          <button className="btn btn-orange sign_in ">
            <label className="link-orange " onClick={onSubmitRegister}>
              Register
            </label>
          </button>

          <button className="btn btn-white ">
            <label onClick={() => navigate("/login")} class="link-white">
              Sign In
            </label>
          </button>
        </div>
      </div>
    </div>
  );
}
export default Register;
