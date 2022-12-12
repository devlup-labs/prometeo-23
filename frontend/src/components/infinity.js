import { useEffect } from "react";
import { Link } from "react-router-dom";

import "./infinity.css";

import infinityImg from "../assets/homePage/infinity.png";

export default function Infinity() {
    return (
        <div id="infinity-container">
            <div id="infinity">
                <img src={infinityImg} alt="Infinity" id="infinity-img" />
                <span id="infinity-text">
                    <h2>
                        WHAT'S <span id="infinity-yellow">NEXT?</span>
                    </h2>
                </span>
            </div>
            <div id="infinity-blur"></div>
        </div>
    );
}
