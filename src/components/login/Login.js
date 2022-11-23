import React, { useRef, useState } from "react";

import { useNavigate } from "react-router-dom";

import validator from "validator";

import { useDispatch } from "react-redux";
import { loadUser } from "../../redux/loginSlice";

import { Oval } from "react-loader-spinner";

import "../../index.css";

import Footer from "../topHeader/Footer";

function Login() {
  const navigate = useNavigate();

  // const { user } = useSelector((state) => state.login);
  const dispatch = useDispatch();

  //state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [flag, setFlag] = useState(null);
  const [foundErr, setFoundErr] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const validateEmail = () => {
    var emailnew = email;

    if (validator.isEmail(emailnew)) {
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
  }

  const onPasswordChange = (event) => {
    if (password.length >= 1) {
      setFlag(1);
    } else {
      setFlag(2);
    }
    setPassword(event.target.value);
  };

  const onSubmitSignin = () => {
    // dispatch(loadUser({ id: 1 }));
    // window.location.pathname = "/";
    validateEmail();
    if (email.length === 0 && password.length === 0) {
      setFlag(2);
    } else if (email.length === 0 || password.length === 0) {
      setFlag(2);
    } else {
      setIsLoading(true);

      fetch("https://terraweb.herokuapp.com/login", {
        method: "post",
        headers: { "Content-Type": "application/JSON" },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
        .then(function (response) {
          if (response.status === 400) {
            throw Error("Wrong credentials");
          }
          if (response === 500) {
            throw Error("Could not complete request because of an error");
          }

          return response.json();
        })
        .then((user) => {
          if (user[0].id) {
            setFoundErr(null);

            setIsLoading(null);
            // dispatch(loadUser(user[0].id));

            dispatch(loadUser(user[0]));

            // console.log(user[0]);
            // navigate("/users");
            window.location.pathname = "/users";
            setFlag(1);
          } else {
            setFlag(2);
            navigate("/login");

            setFoundErr(null);
            setIsLoading(null);
          }
        })
        .catch((err) => {
          setFoundErr(err.message);
          setIsLoading(null);
          setFlag(1);
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
          type="text"
          id="id"
          placeholder="Enter email"
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
        {flag === 2 && (
          <label className="red b db">
            Incorrect details! Check your details.
          </label>
        )}
        {foundErr && <label className="dt red  pb2">{foundErr}</label>}

        {isLoading && (
          <div className="db mb2">
            <Oval type="Oval" color="#0000FF" height={40} width={80} />
          </div>
        )}
        <div className="d-flex w-100">
          <div className="login__btns ">
            <button className="btn btn-orange sign_in ">
              <label
                href="login.html"
                class="link-orange"
                onClick={onSubmitSignin}
              >
                Sign In
              </label>
            </button>
            <button className="btn btn-white">
              <label onClick={() => navigate("/forgotPass")} className="f3 ">
                Forgot password?
              </label>
            </button>

            <button className="btn btn-white">
              <label onClick={() => navigate("/register")} class="link-white">
                SignUp
              </label>
            </button>
          </div>
        </div>
      </div>
      {/* </section> */}
    </div>
  );
}
export default Login;
