import { useEffect } from "react";
import { Link } from "react-router-dom";

import "./infinity.css";

import infinityImg from "../assets/homePage/logo.png";

export default function LandingSection() {
    useEffect(() => {
        clock();
    }, []);
    return (
        <div id="landing-container">
            <img src={infinityImg} alt="Infinity" id="infinity-img" />
            <h2>WHAT'S NEXT?</h2>
        </div>
    );
}
