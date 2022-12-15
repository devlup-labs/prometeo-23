import { useEffect } from "react";
import { toast } from "react-toastify";
import "./ca.css";

import useAxios from "../context/context_useAxios";
import { backendURL } from "../backendURL";

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
    const api = useAxios();
    // console.log("Api:", api);

    useEffect(() => {
        const navBarEle = document.getElementById("navbar");
        navBarEle.style.opacity = 1;
        // document.body.style.overflow = "hidden";
    }, []);

    const handleSubmit = (e) => {
        async function fetchData() {
            try {
                const response = await api.post(
                    `${backendURL}/campusambassador/`
                );
                if (response.status === 200) {
                    toast.success("Registered Successfully!");
                }
            } catch (error) {
                console.log("Error:", error);
            }
        }
        fetchData();
    };

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
                        <button
                            className="button-48"
                            role="button"
                            onClick={handleSubmit}
                        >
                            <span className="button-text">REGISTER!</span>
                        </button>
                        This is the description of the campus ambassador program
                        of Prometeo'23.
                    </span>
                </div>
                <div className="ca-content">
                    <div className="ca-content-title" id="ca-title-left">
                        ABOUT THE PROGRAM
                    </div>
                    <div className="ca-content-text ca-left">
                        <span className="ca-content-desc-left">
                            In the campus ambassador program, you will represent
                            our fest, Prometeo, in your college community and
                            encourage students to participate by highlighting
                            the advantages of taking part in the fest.
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
                        AN OPPORTUNITY TO GROW
                    </div>
                    <div className="ca-content-text ca-right">
                        <img
                            className="ca-content-img red-shadow"
                            src={socialMedia2}
                            alt="social-media"
                        />
                        <span className="ca-content-desc-right">
                            Your task as the campus ambassador is very flexible
                            and easy to do, ranging from providing information
                            about Prometeo'23 to asking students to register for
                            the fest using your referral code. By becoming the
                            campus ambassador you will serve as a link between
                            the students of your college and Prometeo'23. <br></br><br></br>It
                            will help to boost your confidence and leadership
                            skills. Your communication skills will also bloom
                            extravagantly. The campus ambassador program will
                            become an asset if you are a student looking for great
                            learning and networking opportunities.
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
                            So, grab the opportunity and sign up as soon as
                            possible to win the goodies and wonderful perks!
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
