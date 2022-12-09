import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./homePage.css";

import PrometeoLogo from "../assets/homePage/logo.png";
import loading1 from "../assets/loading/big_bang.mp4";
import spinner from "../assets/loading/loading_new.gif";
import scrollGif from "../assets/homePage/scrolldown.gif";

import solarSystem from "./solarsystem";
import FadeIn from "../components/fadein";

import LandingSection from "../components/landingSection";
import Introduction from "../components/intro";
import Theme from "../pages/Theme";
import InitiativeHome from "../components/initiativeHome";
import EventHome from "../components/eventHome";
import GalleryHome from "../components/galleryHome";

export default function HomePage(props) {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoading = () => {
    setIsLoading(false);
    document.body.style.backgroundColor = "#fff";
  };

  const fadeScreenToHomePage = () => {
    props.bbFunc(false);

    document.body.style.background = "rgb(16,28,39)";
    document.body.style.background =
      "radial-gradient(circle, rgba(16,28,39,1) 10%, rgba(0,0,0,1) 90%)";

    const homePageEle = document.getElementById("homepage");
    homePageEle.style.opacity = 1;
    const navBarEle = document.getElementById("navbar");
    navBarEle.style.opacity = 1;

    solarSystem();
  };

  useEffect(() => {
    // clock();

    document.body.style.overflow = "hidden";

    if (props.bb) {
      const vid = document.getElementById("my_video");
      vid.addEventListener("canplay", handleLoading);
      vid.addEventListener("ended", fadeScreenToHomePage);
    } else {
      fadeScreenToHomePage();
    }
  }, []);

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
          <div id="scroll-down">
            <img src={scrollGif} alt="Scroll Down" id="scroll-down-gif" />
          </div>
          {/* <div id="about-prometeo">
            <div id="the-image">
              <img id="the-image-img" src={PrometeoLogo} alt="image" />
            </div>
            <div id="about-prometeo-text">
              THE JOURNEY TO INFINITY BEGINS IN
              <div id="clock" className="layer"></div>
            </div>
            <Link to="/pre-register">
              <button id="preregister-button" className="button-29">
                Pre-register now!
              </button>
            </Link>
          </div> */}
          <div id="homepage-content">
            <LandingSection />
            <Introduction />
            <Theme />
            <InitiativeHome />
            <EventHome />
            <GalleryHome />
          </div>
        </div>
      </div>
    </FadeIn>
  );
}
