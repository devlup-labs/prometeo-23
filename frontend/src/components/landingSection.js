import { useEffect } from "react";
import { Link } from "react-router-dom";

import "./landingSection.css";
import "../pages/clock.css";
import clock from "../pages/clock.js";

import PrometeoLogo from "../assets/navbar/prometeo_logo_23.png";
import space from "../assets/homePage/hero.png";

export default function LandingSection() {
    useEffect(() => {
        clock();
        const script = document.createElement("script");

        script.src = "https://d23jutsnau9x47.cloudfront.net/back/v1.0.9/viewer.js";
        script.dataset.option = "{|environment|:{|gradient|:|radial|,|sensitivity|:0.9,|colorStart|:[0,7,7,1],|colorEnd|:[0,71,81,1]},|particle|:{|life|:1.2,|power|:0.029,|texture|:|https://res.cloudinary.com/naker-io/image/upload/v1566560053/flare_01.png|,|number|:400,|colorStart|:[6,147,227,1],|colorEnd|:[122,192,213,1],|sizeStart|:0.6,|sizeEnd|:1.2,|direction1|:{|x|:100,|y|:0,|z|:100},|direction2|:{|x|:-100,|y|:0,|z|:-100}},|waterMark|:false}";
        script.dataset.container = "main-container";
        // script.async = true;

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);
    return (
        <div className="landing-container" id="main-container">
            <div id="landing">
                <div id="landing-left-section">
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
                </div>
                <div id="landing-right-section">
                    <div id="landing-image">
                        <img id="landing-image-img2" src={space} alt="image" />
                    </div>
                    <div id="landing-links">
                        <Link to="/pre-register">
                            <button
                                id="preregister-button"
                                className="button-27"
                            >
                                Pre-register now!
                            </button>
                        </Link>
                        <Link to="/pre-register">
                            <button
                                id="preregister-button"
                                className="button-27"
                            >
                                Button 2
                            </button>
                        </Link>
                        <Link to="/pre-register">
                            <button
                                id="preregister-button"
                                className="button-27"
                            >
                                Button 3
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
