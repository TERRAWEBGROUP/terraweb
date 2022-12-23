import React, { useRef, useState } from "react";

import { useNavigate } from "react-router-dom";

import validator from "validator";

import { useDispatch } from "react-redux";
import { loadUser } from "../../redux/loginSlice";

import { Oval } from "react-loader-spinner";

import "./register.css";
import "tachyons";
import Register from "./Register";

function RegisterAdmin(props) {
  const navigate = useNavigate();
  //store variables onchange to send to backend

  //store select values in an array
  const options = [
    { value: "", text: "-- select gender --" },
    { value: "male", text: "male" },
    { value: "female", text: "female" },
  ];

  const [names, setNames] = useState({
    fullname: "",

    username: "",
    company: "",
    phone: "",
    gender: options[0].value,
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //passwords erroe
  const [passConfirmErr, setPasswordErr] = useState("");

  //validate email and flag if there's an error
  const [emailError, setEmailError] = useState("");
  const [flag, setFlag] = useState("");

  //display success info after successful registration
  const [success, setSuccess] = useState("");

  //display an error when there is a problem registering
  const [foundErr, setFoundErr] = useState(null);

  //show is loading animation
  const [isLoading, setIsLoading] = useState(null);

  // const { user } = useSelector((state) => state.login);
  const dispatch = useDispatch();

  //handle first name input
  const onFnameChange = (event) => {
    if (names.fullname.length >= 1) {
      setFlag(1);
    } else {
      setFlag(2);
    }
    // Spreading "...state" ensures we don't "lose" fname,lname,email... etc
    setNames((names) => ({
      ...names,
      fullname: event.target.value,
    }));
  };

  //handle lname input
  const onLNameChange = (event) => {
    if (names.lname.length >= 1) {
      setFlag(1);
    } else {
      setFlag(2);
    }
    // Spreading "...state" ensures we don't "lose" fname,lname,email... etc
    setNames((names) => ({
      ...names,
      lname: event.target.value,
    }));
  };
  //handle username input
  const onUsernameChange = (event) => {
    if (names.username.length >= 1) {
      setFlag(1);
    } else {
      setFlag(2);
    }
    // Spreading "...state" ensures we don't "lose" fname,lname,email... etc
    setNames((names) => ({
      ...names,
      username: event.target.value,
    }));
  };
  //handle company input
  const onCompanyChange = (event) => {
    if (names.company.length >= 1) {
      setFlag(1);
    } else {
      setFlag(2);
    }
    // Spreading "...state" ensures we don't "lose" fname,lname,email... etc
    setNames((names) => ({
      ...names,
      company: event.target.value,
    }));
  };
  //handle phone input
  const onPhoneChange = (event) => {
    if (names.phone.length >= 1) {
      setFlag(1);
    } else {
      setFlag(2);
    }
    // Spreading "...state" ensures we don't "lose" fname,lname,email... etc
    setNames((names) => ({
      ...names,
      phone: event.target.value,
    }));
  };

  //handle gender input
  const onGenderChange = (event) => {
    if (names.gender.length >= 1) {
      setFlag(1);
    } else {
      setFlag(2);
    }
    // Spreading "...state" ensures we don't "lose" fname,lname,email... etc
    setNames((names) => ({
      ...names,
      gender: event.target.value,
    }));
    console.log(names.gender);
  };

  //handle on fname and lname change

  //validate email format
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
  //handle password change
  const onPasswordChange = (event) => {
    if (password.length >= 8) {
      setFlag(1);
    } else {
      setFlag(2);
    }
    setPassword(event.target.value);
  };

  //handle confirm password
  const passwordConfirm = (event) => {
    if (password === event.target.value) {
      setPasswordErr("matches");
    } else {
      setPasswordErr("not match");
    }
  };

  const onSubmitRegister = () => {
    validateEmail();
    if (flag === 1) {
      setIsLoading(true);

      fetch("http://localhost:8000/registerAdmin", {
        method: "post",
        headers: { "Content-Type": "application/JSON" },
        body: JSON.stringify({
          fullname: names.fullname,

          email: email,
          username: names.username,
          password: password,
          company: names.company,
          phone: names.phone,
          gender: names.gender,
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
    <div class="registerdiv ">
      {/* <section class="register__box"> */}
      <div class="register__header">
        <img
          src="img/WHITE LOGO.png"
          alt="terraweb white logo"
          class="register__header--image"
        />
        <label className="fnamelabel white b f2">| Admin Registration</label>
      </div>
      <div className="register__main">
        <label className="fnamelabel b f4">
          Full Name in the format (FirstName LastName)
        </label>

        <input
          onChange={onFnameChange}
          type="text"
          placeholder="First Name"
          className="register__input__firstname w-60-l tl "
          aria-describedby="name-desc"
        />

        <b className="b f4 tl">What's your email?</b>
        <input
          type="email"
          placeholder="email address"
          className="register__input tl"
          onChange={onEmailChange}
        />
        {emailError === "not valid" ? (
          <p className="card-tite f6 b red">Incorrect email format.</p>
        ) : null}
        <b className="b f4">Create a username or nick name</b>
        <input
          onChange={onUsernameChange}
          type="text"
          placeholder="Username"
          className="register__input tl"
        />
        <b className="b f4">Create a password (8 or more characters)</b>

        <input
          type="password"
          id="passwordsgn"
          placeholder="Password"
          className="register__input tl"
          onChange={onPasswordChange}
        />
        <b className="b f4">Confirm Password</b>

        <input
          onChange={passwordConfirm}
          type="password"
          id="passwordconfirm"
          placeholder="Confirm Password"
          className="register__input tl"
        />
        {passConfirmErr === "not match" ? (
          <p className="card-tite f6 b red">Passwords do not match</p>
        ) : null}
        <b className="b f4">Enter your company/companies (Optional) </b>
        <input
          onChange={onCompanyChange}
          type="text"
          id="company"
          placeholder="Company"
          className="register__input tl"
        />
        <b className="b f4">Enter your phone number</b>
        <input
          onChange={onPhoneChange}
          type="phonenumber"
          id="phonenumber"
          placeholder="Phone Number"
          className="register__input tl"
        />

        <b className="b f4">What is your gender?</b>
        <select
          className="rounded f4 bg-white tracked br-pill w-25-l w-25-m"
          value={names.gender}
          onChange={onGenderChange}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.text}
            </option>
          ))}
        </select>

        {foundErr ? <label className="dt b red mv3">{foundErr}</label> : null}

        {flag === 2 ? (
          <p className="card-tite f6 red b">Some fields are incorrect.</p>
        ) : null}
        {success === "success" ? (
          <p className="card-tite f4 blue b">
            Account created successfully. Please login now.
          </p>
        ) : null}
        {success === "not good" ? (
          <p className="card-tite f4 red b">Error. Please try again.</p>
        ) : null}
        <div className="lh-copy mt2 pv2 button">
          <label
            onClick={() => navigate("/termsofservice")}
            className="f4 measure  hover-blue dim black "
          >
            By clicking <b className="b f4">"Register"</b> you agree to our
            Terms and Conditions.
          </label>
        </div>
        {isLoading ? (
          <div className="db mb2">
            <Oval type="Oval" color="#0000FF" height={40} width={80} />
          </div>
        ) : null}

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
export default RegisterAdmin;
