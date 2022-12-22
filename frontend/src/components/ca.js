import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./ca.css";

import useAxios from "../context/context_useAxios";
import { backendURL } from "../backendURL";
import AuthContext from "../context/AuthContext";

import boat from "../assets/ca/boat.png";
import socialMedia1 from "../assets/ca/social_media.png";
import socialMedia2 from "../assets/ca/social_media2.png";
import concert from "../assets/ca/concert.png";
import certificate from "../assets/ca/certificate.png";
import goodies from "../assets/ca/souvenir.png";
import tickets from "../assets/ca/tickets.png";
import logo from "../assets/homePage/logo.png";

import FadeIn from "../components/fadein";
import { Navigate } from "react-router-dom";

export default function CA_Homepage() {
    return (
        <FadeIn duration={1000}>
            <div id="ca-div-container">
                <div id="ca-div-title">
                    CAMPUS <span>AMBASSADOR</span> PROGRAM
                </div>
                <div id="ca-div-desc">
                    <img
                        id="ca-div-desc-img"
                        src={boat}
                        className="white-shadow"
                        alt="campus-ambassador"
                    />

                    <div id="ca-div-desc-text">
                        Represent Prometeo in your college community and
                        encourage students to participate by highlighting the
                        advantages of taking part in the fest. Win awesome
                        goodies, free passes to the fest and much more!
                        <Link to="/campus-ambassador">
                            <button id="ca-div-button" className="button-48">
                                <span className="ca-div-button-text">
                                    VIEW MORE
                                </span>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </FadeIn>
    );
}
