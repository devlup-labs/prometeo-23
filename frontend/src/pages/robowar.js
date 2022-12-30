// import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import flagshipEvents_data from "./dummy_robowar";
import "./robowar.css";

import { toast } from "react-toastify";
// import logo from "../assets/navbar/prometeo_logo_23.png";
// import Footer from "../components/footer";
import FadeIn from "../components/fadein";
import useOnScreen from "../components/useOnScreen";
import { useEffect, useState, useRef } from "react";
import $ from "jquery";
import AuthContext from "../context/AuthContext";
import useAxios from "../context/context_useAxios";
import { useContext } from "react";
import prizeImg from "../assets/icons/prize.png";
import { backendURL } from "../backendURL";
// import { backendURL } from "../backendURL";

function createEntry(term) {
    return (
        <Entry
            key={term.id}
            bg={term.bg_image}
            fontColor={term.fontColor}
            image={term.image}
            name={term.name}
            sponsors={term.sponsors}
            cardbg1={term.cardbg1}
            cardbg2={term.cardbg2}
            // reach={term.reach}
            // category={term.category}
            // sponsor={term.sponsor}
            description={term.description}
        />
    );
}

function Entry(props) {
    useEffect(
        // when the component has rendered then add the event listener to it
        () => {
            const navBarEle = document.getElementById("navbar");
            navBarEle.style.opacity = 1;
        },
        []
    );
    const ref = useRef();
    const onScreen = useOnScreen(ref);

    const [countDone, setCountDone] = useState(false);
    function countUp() {
        var num = $(this).text();
        var decimal = 0;
        if (num.indexOf(".") > 0) {
            decimal = num.toString().split(".")[1].length;
        }
        $(this)
            .prop("Counter", 0.0)
            .animate(
                {
                    Counter: $(this).text(),
                },
                {
                    duration: 2000,
                    easing: "swing",
                    step: function (now) {
                        $(this).text(parseFloat(now).toFixed(decimal));
                    },
                }
            );
    }

    useEffect(() => {
        const counters = document.querySelectorAll(".counter");
        const speed = 200;

        if (!countDone && onScreen) {
            $(".js-num").each(countUp);
            setCountDone(true);
        }
    }, [onScreen]);

    return (
        <div className="robowar_flag">
            <div
                className="robowar_flagTop-Container"
                style={{
                    backgroundImage: `url(${props.bg})`,
                }}
            >
                <h1 data-title={props.name}>{props.name}</h1>
                <p id="rw-info"></p>
                <div class="rw-buttons">
                    <button id="rw-create-button" className="button-48">
                        <Link
                            to="/robowars-create-team"
                            className="button-text"
                        >
                            CREATE TEAM
                        </Link>
                    </button>
                    <button id="rw-join-button" className="button-48">
                        <Link to="/robowars-join-team" className="button-text">
                            JOIN TEAM
                        </Link>
                    </button>
                    <button id="rw-pay-button" className="button-48">
                        {/* <Link to="/robowars-join-team" className="button-text"> */}
                        <a className="button-text" href="#">
                            COMING SOON
                        </a>
                        {/* </Link> */}
                    </button>
                </div>
                {/* <div class="table center">
                    <div class="monitor-wrapper center">
                        <div class="monitor center">
                            <p>Ready for war</p>
                        </div>
                    </div>
                </div> */}

                {/* <img src={props.image} /> */}
            </div>
            <section
                className="robowar_flag-bottom-bg"
                style={{
                    backgroundImage:
                        "https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAFV2EPcpTU&#x2F;view?",
                }}
            >
                <div className="robowar_flagAbout">
                    <h3 className="title-shadow">ABOUT</h3>
                    <section className="robowar_Abouttable">
                        <div id="robowar_flag_prize">
                            <img
                                src={prizeImg}
                                alt="icon"
                                id="robowar_flag_prize-icon"
                            />
                            <div id="robowar_flagPrize-description">
                                <span className="js-num" data-target="12000">
                                    100
                                </span>
                                <span>K+</span>
                                <br />
                                <span ref={ref}>Prize Pool</span>
                            </div>
                        </div>
                        <div id="robowar_about-text">
                            <p className="about-description">
                                {props.description}
                            </p>
                            {/* <Link id="robowar_flagAbout-button">
                                Registrations Opening Soon
                            </Link> */}
                        </div>
                    </section>
                    {/* <p>{props.description}</p> */}
                </div>
                {/* <hr /> */}
                <div className="robowar_flagResources">
                    <h3 className="title-shadow">RESOURCES</h3>
                    <div className="robowar_flag_Allcards">
                        <a
                            className="robowar_flag_card card0"
                            style={{
                                backgroundImage: `url(${props.cardbg1})`,
                                boxShadow:
                                    "inset 0 0 60px 60px rgba(0,0,0,0.9)",
                            }}
                            href="https://drive.google.com/file/d/1z2D1VBvRsNdg0abX2qaB6orKM3xUkxwX/view?usp=share_link"
                            target="_blank"
                        >
                            <div className="robowar_flag_card-border">
                                <h2>15 Kg</h2>
                            </div>
                        </a>
                        <a
                            className="robowar_flag_card card0"
                            style={{
                                backgroundImage: `url(${props.cardbg2})`,
                            }}
                            href="https://drive.google.com/file/d/1V0LlTMugMCipBshvA2Lbc925PhYGPfdG/view?usp=share_link"
                            target="_blank"
                        >
                            <div className="robowar_flag_card-border">
                                <h2>60 Kg</h2>
                            </div>
                        </a>
                    </div>
                </div>
                {/* <hr /> */}
                {/* <div className="robowar_flagSponsors">
                    <h3 className="title-shadow">SPONSORS</h3>
                    <img src="https://apiv.prometeo.in/media/sponsors/smasung_sWRoaY5.webp" />
                </div> */}
                <div className="robowar_flagContactUs">
                    <h3 className="title-shadow">CONTACT US</h3>
                    <div class="canvas">
                        <div id="contact-card" class="contact-card">
                            <div>
                                <p className="robowar_flagContactUs-name">
                                    Rahul Gopathi
                                </p>
                                <p className="robowar_flagContactUs-mail">
                                    gopathi.1@iitj.ac.in
                                </p>
                                <a href="https://wa.me/918919430577" className="robowar_flagContactUs-phone">
                                    +91 8919430577
                                </a>
                            </div>
                            <div>
                                <p className="robowar_flagContactUs-name">
                                    Likhith Ayinala
                                </p>
                                <p className="robowar_flagContactUs-mail">
                                    ayinala.1@iitj.ac.in
                                </p>
                                <a href="https://wa.me/918927857887" className="robowar_flagContactUs-phone">
                                    +91 8927857887
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

function Robowar() {
    const { user, logoutUser } = useContext(AuthContext);
    const api = useAxios();
    const [teamName, setTeamName] = useState("");

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await api.get(`${backendURL}/checkteamrw/`);

                if (response.status === 200) {
                    // console.log(response.data);
                    let data = response.data;
                    if (data.team_name) {
                        setTeamName(data.team_name);
                        // hide buttons
                        document.getElementById(
                            "rw-create-button"
                        ).style.display = "none";
                        document.getElementById(
                            "rw-join-button"
                        ).style.display = "none";
                        if (data.team_leader === true) {
                            document.getElementById(
                                "rw-pay-button"
                            ).style.display = "block";
                            document.getElementById("rw-info").innerHTML =
                                "Your Team is <strong id='rw-copy'>" +
                                data.team_name +
                                "</strong>. Payment will be available soon.";
                        } else {
                            document.getElementById(
                                "rw-pay-button"
                            ).style.display = "none";
                            document.getElementById("rw-info").innerHTML =
                                "Your Team is <strong id='rw-copy'>" +
                                data.team_name +
                                "</strong>.";
                        }
                    } else {
                        document.getElementById(
                            "rw-create-button"
                        ).style.display = "block";
                        document.getElementById(
                            "rw-join-button"
                        ).style.display = "block";
                        document.getElementById("rw-pay-button").style.display =
                            "none";
                        document.getElementById("rw-info").innerHTML =
                            "You are not in a team yet.";
                    }
                } else {
                    throw response.statusText;
                }
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        const ele = document.getElementById("rw-copy");
        if (ele) {
            ele.addEventListener("click", function () {
                navigator.clipboard.writeText(teamName);
                toast.info("Copied to clipboard", {
                    position: "bottom-right",
                });
            });
        }
    }, [teamName]);

    return (
        <FadeIn duration={500}>
            <div id="robowar_flagshipEventsPage">
                {flagshipEvents_data.map(createEntry)}
            </div>
        </FadeIn>
    );
}

export default Robowar;
