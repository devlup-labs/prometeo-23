import { useEffect } from "react";
import "./ca.css";

import boat from "../assets/ca/boat.png";
import socialMedia1 from "../assets/ca/social_media.png";
import socialMedia2 from "../assets/ca/social_media2.png";
import concert from "../assets/ca/concert.png";
import certificate from "../assets/ca/certificate.png";
import goodies from "../assets/ca/souvenir.png";
import tickets from "../assets/ca/tickets.png";
import logo from "../assets/homePage/logo.png";

import FadeIn from "../components/fadein";

export default function CA() {
    useEffect(() => {
        const navBarEle = document.getElementById("navbar");
        navBarEle.style.opacity = 1;
        document.body.style.overflow = "hidden";
    }, []);

    return (
        <FadeIn duration={1000}>
            <div id="ca-container">
                <div id="ca-title">
                    <div id="ca-title-text">
                        CAMPUS <span>AMBASSADOR</span> PROGRAM
                    </div>
                    <img
                        id="ca-title-img"
                        src={boat}
                        className="white-shadow"
                        alt="campus-ambassador"
                    />

                    <span id="ca-title-desc">
                        <button className="button-48" role="button">
                            <span className="button-text">REGISTER!</span>
                        </button>
                        This is the description of the campus ambassador program
                        of Prometeo'23.
                    </span>
                </div>
                <div className="ca-content">
                    <div className="ca-content-title" id="ca-title-left">
                        HEADING 1
                    </div>
                    <div className="ca-content-text ca-left">
                        <span className="ca-content-desc-left">
                            lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Nulla vitae elit libero, a pharetra augue.
                            Nullam id dolor id nibh ultricies vehicula ut id
                            elit. Nullam id dolor id nibh ultricies vehicula ut
                            id elit. Nullam id.
                        </span>
                        <img
                            className="ca-content-img blue-shadow"
                            src={socialMedia1}
                            alt="social-media"
                        />
                    </div>
                </div>
                <div className="ca-content">
                    <div className="ca-content-title" id="ca-title-right">
                        HEADING 2
                    </div>
                    <div className="ca-content-text ca-right">
                        <img
                            className="ca-content-img red-shadow"
                            src={socialMedia2}
                            alt="social-media"
                        />
                        <span className="ca-content-desc-right">
                            lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Nulla vitae elit libero, a pharetra augue.
                            Nullam id dolor id nibh ultricies vehicula ut id
                            elit. Nullam id dolor id nibh ultricies vehicula ut
                            id elit. Nullam id.
                        </span>
                    </div>
                </div>
                <div className="ca-content">
                    <div className="ca-content-title">INCENTIVES</div>
                    <div className="ca-content-text ca-incentive">
                        <div className="ca-content-incentive">
                            <div className="ca-content-incentive-title silver">
                                SILVER <span>Campus Ambassador</span>
                                <div>15+ Registrations</div>
                            </div>
                            <div className="ca-content-incentive-desc">
                                <div className="ca-content-incentive-desc-item">
                                    <img
                                        className="white-shadow2"
                                        src={concert}
                                        alt="concert"
                                    />
                                    Free Accommodation and Pronite Pass
                                </div>
                                <div className="ca-content-incentive-desc-item">
                                    <img
                                        className="yellow-shadow2"
                                        src={certificate}
                                        alt="certificate"
                                    />
                                    Certificate
                                </div>
                                <div className="ca-content-incentive-desc-item">
                                    <img
                                        className="blue-shadow2"
                                        src={goodies}
                                        alt="goodies"
                                    />
                                    Goodies (T-shirt)
                                </div>
                            </div>
                        </div>
                        <div className="ca-content-incentive">
                            <div className="ca-content-incentive-title gold">
                                GOLD <span>Campus Ambassador</span>
                                <div>25+ Registrations</div>
                            </div>
                            <div className="ca-content-incentive-desc">
                                <div className="ca-content-incentive-desc-item">
                                    <img
                                        className="white-shadow2"
                                        src={concert}
                                        alt="concert"
                                    />
                                    Free Accommodation and Pronite Pass
                                </div>
                                <div className="ca-content-incentive-desc-item">
                                    <img
                                        className="yellow-shadow2"
                                        src={certificate}
                                        alt="certificate"
                                    />
                                    Certificate
                                </div>
                                <div className="ca-content-incentive-desc-item">
                                    <img src={goodies} alt="goodies" />
                                    Goodies (Hoodie, Vouchers)
                                </div>
                                <div className="ca-content-incentive-desc-item">
                                    <img
                                        className="yellow-shadow2"
                                        src={tickets}
                                        alt="workshop"
                                    />
                                    Free Entry to 1 Workshop
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="ca-content">
                    <div className="ca-content-title" id="ca-title-left">
                        REGISTRATION
                    </div>
                    <div className="ca-content-text ca-left">
                        <span className="ca-content-desc-left ca-register">
                            So what are you waiting for? Register now and become
                            a part of the Prometeo'23 family!
                            <button className="button-48" role="button">
                                <span className="button-text">I'M IN!</span>
                            </button>
                        </span>
                        <img
                            className="ca-content-img blue-shadow ca-pr-logo"
                            src={logo}
                            alt="social-media"
                        />
                    </div>
                </div>
            </div>
        </FadeIn>
    );
}
