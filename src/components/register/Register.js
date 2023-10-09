import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import validator from "validator";

import { useDispatch } from "react-redux";
import { loadUser } from "../../redux/loginSlice";

import { Oval } from "react-loader-spinner";

import "./register.css";
import "tachyons";

function Register(props) {
  const navigate = useNavigate();
  //store variables onchange to send to backend

  //store select values in an array
  const options = [
    { value: "", text: "-- select gender --" },
    { value: "male", text: "male" },
    { value: "female", text: "female" },
  ];

  //store select company values in an array
  const companies = [
    { value: "", text: "-- select company--" },
    { value: "Terraweb", text: "Terraweb" },
    { value: "Gatamura Dairy", text: "Gatamura Dairy" },
    { value: "Mbuuni Coffee", text: "Mbuuni Coffee" },
    { value: "Kanyua Tea", text: "Kanyua Tea" },
  ];

  const [names, setNames] = useState({
    farmerid: "",
    firstName: "",
    lastName: "",
    fullname: "",
    username: "",
    company: companies[0].value,
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

  // //handle full name input
  // const onFnameChange = (event) => {
  //   if (names.fullname.length >= 3) {
  //     setFlag(1);
  //   } else {
  //     setFlag(2);
  //   }
  //   // Spreading "...state" ensures we don't "lose" fname,lname,email... etc
  //   setNames((names) => ({
  //     ...names,
  //     fullname: event.target.value,
  //   }));
  // };

  //creating a fullname formatter here so that fullname data goes into the dataabase in the
  //form of firstname Lastname
  // Function to format the full name
  const formatFullName = (firstName, lastName) => {
    // Ensure the first letter of each name is capitalized
    const formattedFirstName =
      firstName.charAt(0).toUpperCase() + firstName.slice(1);
    const formattedLastName =
      lastName.charAt(0).toUpperCase() + lastName.slice(1);

    // Combine the formatted names into the full name
    const fullName = `${formattedFirstName} ${formattedLastName}`;

    return fullName;
  };

  //format the company to start with capital letter and remove white spaces
  // Function to format the company name
  const formatCompanyName = (input) => {
    // Remove leading and trailing white spaces
    const trimmedInput = input.trim();

    // Ensure the first letter is capitalized
    const formattedCompanyName =
      trimmedInput.charAt(0).toUpperCase() + trimmedInput.slice(1);

    return formattedCompanyName;
  };

  // Handle input changes for first name and last name
  const handleFirstNameChange = (event) => {
    const newFirstName = event.target.value;
    // Check if the input contains only letters
    if (/^[A-Za-z]+$/.test(newFirstName) || newFirstName === "") {
      const fullName = formatFullName(newFirstName, names.lastName);
      setNames((prevState) => ({
        ...prevState,
        firstName: newFirstName,
        fullname: fullName,
      }));
    }
  };

  //handle last name input
  const handleLastNameChange = (event) => {
    const newLastName = event.target.value;
    // Check if the input contains only letters
    if (/^[A-Za-z]+$/.test(newLastName) || newLastName === "") {
      const fullName = formatFullName(names.firstName, newLastName);
      setNames((prevState) => ({
        ...prevState,
        lastName: newLastName,
        fullname: fullName,
      }));
    }
  };

  //handle username input
  const onUsernameChange = (event) => {
    if (names.username.length >= 3) {
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
  // //handle company input
  // const onCompanyChange = (event) => {
  //   if (names.company.length >= 3) {
  //     setFlag(1);
  //   } else {
  //     setFlag(2);
  //   }
  //   const newCompanyName = event.target.value;
  //   const formattedCompanyName = formatCompanyName(newCompanyName);

  //   // Spreading "...state" ensures we don't "lose" fname,lname,email... etc
  //   setNames((names) => ({
  //     ...names,
  //     company: formattedCompanyName,
  //   }));
  // };
  //handle phone input
  const onPhoneChange = (event) => {
    if (names.phone.length >= 10) {
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
    if (names.gender.length >= 3) {
      setFlag(1);
    } else {
      setFlag(2);
    }
    // Spreading "...state" ensures we don't "lose" fname,lname,email... etc
    setNames((names) => ({
      ...names,
      gender: event.target.value,
    }));
  };
  //handle company input
  const onCompanyChange = (event) => {
    if (names.company.length >= 3) {
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
  //handle farmerid input
  const onFarmeridChange = (event) => {
    if (names.farmerid.length >= 1) {
      setFlag(1);
    } else {
      setFlag(2);
    }
    // Spreading "...state" ensures we don't "lose" fname,lname,email... etc
    setNames((names) => ({
      ...names,
      farmerid: event.target.value,
    }));
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
    if (email.length >= 4) {
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

      fetch("https://api.terraweb.africa/registerUser", {
        method: "post",
        headers: { "Content-Type": "application/JSON" },
        body: JSON.stringify({
          farmerid: names.farmerid,
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
    <div className="registerdiv ">
      {/* <section className="register__box"> */}
      <div className="register__header">
        <img
          src="img/WHITE LOGO.png"
          alt="terraweb white logo"
          className="register__header--image"
        />
      </div>
      <div className="register__main">
        {/* <label className="fnamelabel b f4">
          Full Name in the format (FirstName LastName)
        </label>

        <input
          onChange={onFnameChange}
          type="text"
          placeholder="First Name"
          className="register__input__firstname tl w-60-l"
          aria-describedby="name-desc"
        /> */}
        <div>
          <h2>
            <label className="b f4">First Name</label>
          </h2>
          <input
            className="w-100 w-60-ns tl "
            placeholder="First Name"
            type="text"
            value={names.firstName}
            onChange={handleFirstNameChange}
          />
        </div>
        <div>
          <h2>
            <label className="b f4 ">Last Name</label>
          </h2>
          <input
            className="w-100 w-60-ns tl "
            placeholder="Last Name"
            type="text"
            value={names.lastName}
            onChange={handleLastNameChange}
          />
        </div>

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
        {/* <b className="b f4">Enter your company </b>
        <input
          onChange={onCompanyChange}
          value={names.company}
          type="text"
          id="company"
          placeholder="Company"
          className="register__input tl"
        /> */}

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
        <b className="b f4">Choose your company</b>
        <select
          className="rounded f4 bg-white tracked br-pill w-25-l w-25-m"
          value={names.company}
          onChange={onCompanyChange}
        >
          {companies.map((option) => (
            <option key={option.value} value={option.value}>
              {option.text}
            </option>
          ))}
        </select>

        <div>
          <h2>
            <label className="b f4 ">
              Enter <b>Farmer ID</b> if you have one
            </label>
          </h2>
          <input
            // ref={firstnameref}
            className="w-100 w-50-ns tl  "
            placeholder="Farmer ID"
            type="text"
            name="farmerid"
            onChange={onFarmeridChange}
          />
        </div>

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
            <label onClick={() => navigate("/login")} className="link-white">
              Sign In
            </label>
          </button>
        </div>
      </div>
    </div>
  );
}
export default Register;
