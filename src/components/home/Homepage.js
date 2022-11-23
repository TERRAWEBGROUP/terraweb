import React, { useRef } from "react";

import { useNavigate } from "react-router-dom";

// import "../App.css";
import "../../index.css";

function Homepage() {
  const navigate = useNavigate();

  return (
    <div className="App bg-black white">
      <div className="section-hero white">
        <div class="hero container">
          <h2 class="hero__heading">
            Welcome to <span>Terraweb</span>
          </h2>
          <p class="hero__paragraph">
            We <span>value</span>
            your time and effort as our<span>valued</span> customer
          </p>
          <div class="hero__buttons">
            <button class="btn btn-orange">
              <label onClick={() => navigate("/login")} class="link-orange">
                Sign In
              </label>
            </button>
            <button class="btn btn-white">
              <label onClick={() => navigate("/register")} class="link-white">
                Sign Up
              </label>
            </button>
          </div>
        </div>
      </div>

      <div class="about-section container">
        <img
          src="img/LOGO-FAVCON.png"
          alt="terraweb logo"
          class="about-section__image"
        />
        <div className="about-section__text white">
          <h3 class="about-section__text--heading">Who are we?</h3>
          <p className="about-section__text--paragraph white">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Dolore,delectus blanditiis? Cumque rem animi excepturi eos ullam,
            earum in voluptatum eligendi suscipit, totam temporibus asperiores
            illum vel tempore optio necessitatibus.
            <br />
            <br />
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Dolore,delectus blanditiis? Cumque rem animi excepturi eos ullam,
            earum in voluptatum eligendi suscipit, totam temporibus asperiores
            illum vel tempore optio necessitatibus.
          </p>
        </div>
      </div>

      <div class="services-section">
        <h3 class="services__heading">Our services</h3>
        <div class="container services">
          <div class="servicees__service">
            <h3 class="services__service--title">Education</h3>
            <p class="services__service--text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam,
              quasi adipisci voluptatem minima magnam architecto est sequi
              accusamus unde dolores quaerat odio consequatur quos repudiandae
              dolorum ipsam quo incidunt laudantium!
            </p>
          </div>
          <div class="servicees__service">
            <h3 class="services__service--title">Agriculture</h3>
            <p class="services__service--text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam,
              quasi adipisci voluptatem minima magnam architecto est sequi
              accusamus unde dolores quaerat odio consequatur quos repudiandae
              dolorum ipsam quo incidunt laudantium!
            </p>
          </div>
          <div class="servicees__service">
            <h3 class="services__service--title">Data Management</h3>
            <p class="services__service--text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam,
              quasi adipisci voluptatem minima magnam architecto est sequi
              accusamus unde dolores quaerat odio consequatur quos repudiandae
              dolorum ipsam quo incidunt laudantium!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
