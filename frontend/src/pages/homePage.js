import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./homePage.css";
import "./clock.css";
import clock from "./clock.js";

import PrometeoLogo from "../assets/homePage/logo.png";
import loading1 from "../assets/loading/big_bang.mp4";
import spinner from "../assets/loading/logo.gif";
import scrollGif from "../assets/homePage/scrolldown.gif";

import { loadTextures, createScene } from "./solarsystem";
import FadeIn from "../components/fadein";

export default function HomePage(props) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadTextures(isLoading, setIsLoading);
    }, []);

    useEffect(() => {
        console.log("isLoading: ", isLoading);
        if (!isLoading) {
            const navBarEle = document.getElementById("navbar");
            navBarEle.style.opacity = 1;
            const homePageEle = document.getElementById("homepage");
            homePageEle.style.opacity = 1;
            createScene();
            console.log(document.querySelector("#clock"));
            clock();
        }
    }, [isLoading]);

    return isLoading ? (
        <div className="spinner">
            <img src={spinner} id="loader-gif" alt="Loading..." />
        </div>
    ) : (
        <div id="homepage">
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
                    <button id="preregister-button" className="button-29">
                        Pre-register now!
                    </button>
                </Link>
            </div>
        </div>
    );
}
