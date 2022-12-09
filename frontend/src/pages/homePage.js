import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'

import "./homePage.css";
import "./clock.css";
import clock from "./clock.js";

import PrometeoLogo from "../assets/homePage/logo.png";
import loading1 from "../assets/loading/big_bang.mp4";
import spinner from "../assets/loading/loading_new.gif";
import scrollGif from "../assets/homePage/scrolldown.gif";

import solarSystem from "./solarsystem";
import FadeIn from "../components/fadein";

export default function HomePage(props) {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoading = () => {
    // console.log("loading over");
    setIsLoading(false);
    document.body.style.backgroundColor = "#fff";
    // console.log(props.bb);
    // console.log("changed body colour");
  };

  const fadeScreenToHomePage = () => {
    // console.log("proceeding to home page");
    props.bbFunc(false);
    // const vid = document.getElementById("my_video");
    // vid.remove();
    // document.getElementById("LoadingAnimation").remove();

    document.body.style.background = "rgb(16,28,39)";
    document.body.style.background =
      "radial-gradient(circle, rgba(16,28,39,1) 10%, rgba(0,0,0,1) 90%)";

    const homePageEle = document.getElementById("homepage");
    homePageEle.style.opacity = 1;
    const navBarEle = document.getElementById("navbar");
    navBarEle.style.opacity = 1;

    solarSystem();
  };

  //   call a function that should run only once after the component is mounted

  useEffect(
    // when the component has rendered then add the event listener to it
    () => {
      // const navBarEle = document.getElementById("navbar")
      // console.log("bigBang: ", props.bb, ", loading: ", isLoading);
      // navBarEle.style.opacity = 0;

      //   const script = document.createElement("script");
      //   script.src = "./clock.js";
      //   script.async = true;
      //   document.body.appendChild(script);
      clock();

      document.body.style.overflow = "hidden";

      if (props.bb) {
        // console.log("ok big bang done");
        const vid = document.getElementById("my_video");
        vid.addEventListener("canplay", handleLoading);
        vid.addEventListener("ended", fadeScreenToHomePage);
      }
      // }
      else {
        // console.log("skipping big bang");
        fadeScreenToHomePage();
      }

      //   return () => {
      //     document.body.removeChild(script);
      //   };
    },
    []
  );

  return (
    <FadeIn duration={500}>
      <div>
        {props.bb && isLoading && (
          <div className="spinner">
            <img src={spinner} alt="Loading..." />
          </div>
        )}
        {props.bb && (
          <div id="LoadingAnimation">
            <video id="my_video" autoPlay={true} muted>
              <source src={loading1} type="video/mp4" />
            </video>
          </div>
        )}
        <div id="homepage">
          {/* <div id="scroll-down">
            <img src={scrollGif} alt="Scroll Down" id="scroll-down-gif"/>
          </div> */}
          <div id="about-prometeo">
            <div id="about-prometeo-logo">
              <img
                id="about-prometeo-logo-img"
                src={PrometeoLogo}
                alt="Prometeo Logo"
              />
            </div>
            <div id="about-prometeo-text">
              {/* Prometeo 2023 is the third edition of IIT Jodhpur's National Technical + Entrepreneurial Festival. Prometeo derives its name from the Greek word for forethinker, and celebrates disruptive technologies through talks, workshops, and competitions. */}
              THE JOURNEY TO INFINITY BEGINS IN
              <div id="clock" className="layer"></div>
            </div>
            <Link to="/pre-register">
              <button id="preregister-button" className="button-29">Pre-register now!</button>
            </Link>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}
