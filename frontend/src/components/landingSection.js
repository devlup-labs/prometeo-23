import { useEffect } from "react";
import { Link } from "react-router-dom";

import "./landingSection.css";
import "../pages/clock.css";
import clock from "../pages/clock.js";

import PrometeoLogo from "../assets/homePage/logo.png";


export default function LandingSection() {
    useEffect (() => {
        clock();
    }, []);
    return (
        <div id="landing-container">
            <div id="landing">
                <div id="landing-left-section">
                    <div id="landing-countdown"></div>
                    <div id="landing-left-section-links">
                        <Link to="/pre-register">
                            <button id="preregister-button" className="button-29">
                                Pre-register now!
                            </button>
                        </Link>
                    </div>
                </div>
                <div id="landing-right-section">
                    <div id="the-image">
                        <img id="the-image-img" src={PrometeoLogo} alt="image" />
                    </div>
                </div>
            </div>
        </div>
    );
}
