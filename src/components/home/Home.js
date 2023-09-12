import React, { useRef } from "react";

import { useNavigate } from "react-router-dom";

// import "../App.css";
import "../../index.css";
import "tachyons";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="App bg-black  ">
      <div className="section-hero pt4  ">
        <h2 className="hero__heading ml4 mr4 ">
          Welcome to
          <span>Terraweb</span>
        </h2>
        <p className="hero__paragraph">
          We <span>value</span>
          your time and effort as our<span>valued</span> customer
        </p>
      </div>

      <div className="about-section container">
        <img
          src="img/LOGO-FAVCON.png"
          alt="terraweb logo"
          className="about-section__image"
        />
        <div className="about-section__text white">
          <h3 className="about-section__text--heading">Who are we?</h3>
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

      <div className="services-section">
        <h3 className="services__heading">Our services</h3>
        <div className="container services">
          <div className="servicees__service">
            <h3 className="services__service--title">Education</h3>
            <p className="services__service--text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam,
              quasi adipisci voluptatem minima magnam architecto est sequi
              accusamus unde dolores quaerat odio consequatur quos repudiandae
              dolorum ipsam quo incidunt laudantium!
            </p>
          </div>
          <div className="servicees__service">
            <h3 className="services__service--title">Agriculture</h3>
            <p className="services__service--text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam,
              quasi adipisci voluptatem minima magnam architecto est sequi
              accusamus unde dolores quaerat odio consequatur quos repudiandae
              dolorum ipsam quo incidunt laudantium!
            </p>
          </div>
          <div className="servicees__service">
            <h3 className="services__service--title">Data Management</h3>
            <p className="services__service--text">
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

export default Home;
