import { useEffect } from "react";
import { Link } from "react-router-dom";

import "./infinity.css";

import infinityImg from "../assets/homePage/infinity.png";

export default function Infinity() {
    return (
        <div id="infinity-container">
            <div id="infinity">
                <img src={infinityImg} alt="Infinity" id="infinity-img" />
                <h2>WHAT'S NEXT?</h2>
            </div>
        </div>
    );
}
