import { useEffect } from "react";
import { Link } from "react-router-dom";

import "./landingSection.css";
import "../pages/clock.css";
import clock from "../pages/clock.js";

import PrometeoLogo from "../assets/homePage/logo.png";

export default function LandingSection() {
    useEffect(() => {
        clock();
    }, []);
    return (
        <div className="landing-container" id="home">
            <div id="landing">
                <div id="landing-image">
                    <img
                        id="landing-image-img"
                        src={PrometeoLogo}
                        alt="image"
                    />
                </div>
                <div id="landing-text">
                    <div id="landing-countdown-title">
                        THE JOURNEY TO INFINITY BEGINS IN
                    </div>
                    <div id="landing-countdown"></div>
                </div>
                <div id="landing-links">
                    <Link to="/pre-register">
                        <button id="preregister-button" className="button-29">
                            Pre-register now!
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
