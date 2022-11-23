import React, { useRef } from "react";

import { useNavigate } from "react-router-dom";

import "tachyons";

export default function Footer({
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
    <footer class="footer-section">
      <div class="footer container">
        <div class="footer__social-media">
          <img
            src="img/LOGO-FAVCON.png"
            alt="terraweb logo"
            class="footer__social-media--logo"
          />
        </div>
        <div class="footer__other-links">
          <h4 class="footer__other-links--heading">Other links</h4>
          <div class="footer__other-links--links">
            <a href="#" class="footer__other-links--link">
              THis should be a link to somewhere
            </a>
            <a href="#" class="footer__other-links--link">
              THis should be a link to somewhere
            </a>
            <a href="#" class="footer__other-links--link">
              THis should be a link to somewhere
            </a>
            <a href="#" class="footer__other-links--link">
              THis should be a link to somewhere
            </a>
            <a href="#" class="footer__other-links--link">
              THis should be a link to somewhere
            </a>
          </div>
        </div>
        <div class="footer__team">
          <h4 class="footer__team--heading">Our team</h4>
          <ul class="footer__team--list">
            <li class="footer__team--list-item">Member of terrraweb</li>
            <li class="footer__team--list-item">Member of terrraweb</li>
            <li class="footer__team--list-item">Member of terrraweb</li>
            <li class="footer__team--list-item">Member of terrraweb</li>
            <li class="footer__team--list-item">Member of terrraweb</li>
            <li class="footer__team--list-item">Member of terrraweb</li>
            <li class="footer__team--list-item">Member of terrraweb</li>
            <li class="footer__team--list-item">Member of terrraweb</li>
          </ul>
        </div>

        <div class="footer__policy">
          <h4 class="footer__policy--heading">Our team</h4>
          <p class="footer__policy--text">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam
            optio iusto maiores velit? Nobis, itaque! Minima provident tempore,
            dolorem voluptate veritatis nisi voluptatibus delectus corrupti quo
            maxime deserunt molestias quam!
          </p>
        </div>
      </div>
      {/* social links */}
      <div className=" white  pb0-ns f3 ml7-l ml5-ns mt2 ">
        <div className="f3 fw5 tracked ttu ml3">Get in touch</div>

        <div className="mt3 ml3 w-50 o-100 ">
          <label
            target="blank"
            rel="noreferrer"
            className="no-underline near-white bg-animate bg-near-black hover-bg-gray inline-flex items-center  br2 "
            href="https://facebook.com/revsite"
            title="Facebook"
            onClick={() => window.open("https://facebook.com/", "_blank")}
          >
            <svg
              className="dib h2 w2"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fillRule="evenodd"
              clipRule="evenodd"
              strokeLinejoin="round"
              strokeMiterlimit="1.414"
            >
              <path
                d="M15.117 0H.883C.395 0 0 .395 0 .883v14.234c0 .488.395.883.883.883h7.663V9.804H6.46V7.39h2.086V5.607c0-2.066 1.262-3.19 3.106-3.19.883 0 1.642.064 1.863.094v2.16h-1.28c-1 0-1.195.476-1.195 1.176v1.54h2.39l-.31 2.416h-2.08V16h4.077c.488 0 .883-.395.883-.883V.883C16 .395 15.605 0 15.117 0"
                fillRule="nonzero"
              />
            </svg>
            <span className="f6 ml3 pr2">Facebook</span>
          </label>
        </div>

        <div className="mt4 f2 white">
          <label
            className="hover-blue"
            onClick={() => navigate("/termsofservice")}
          >
            Terms of Service
          </label>
        </div>
      </div>
      <div class="footer__copy">&copy; 2022 Terraweb. All rights reserved.</div>
    </footer>
  );
}

// export default Footer;
