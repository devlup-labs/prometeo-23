// import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import flagshipEvents_data from "./dummy_robowar";
import "./robowar.css";

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
    // const onScreen = useOnScreen(ref);

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

    // useEffect(() => {
    //     const counters = document.querySelectorAll(".counter");
    //     const speed = 200;

    //     if (!countDone && onScreen) {
    //         $(".js-num").each(countUp);
    //         setCountDone(true);
    //     }
    // }, [onScreen]);

    return (
        <div className="robowar_flag">
            <div
                className="robowar_flagTop-Container"
                style={{
                    backgroundImage: `url(${props.bg})`,
                }}
            >
                <h1 data-title={props.name}>{props.name}</h1>
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
                    <section className="Abouttable">
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
                        <div>
                            <p className="about-description">
                                {props.description}
                            </p>
                            <Link id="robowar_flagAbout-button">
                                Registrations Opening Soon
                            </Link>
                        </div>
                    </section>
                    {/* <p>{props.description}</p> */}
                </div>
                {/* <hr /> */}
                <div className="robowar_flagResources">
                    <h3 className="title-shadow">RESOURCES</h3>
                    <div className="robowar_flag_Allcards">
                        <div
                            className="robowar_flag_card card0"
                            style={{
                                backgroundImage: `url(${props.cardbg1})`,
                                boxShadow:
                                    "inset 0 0 60px 60px rgba(0,0,0,0.9)",
                            }}
                        >
                            <div className="robowar_flag_card-border">
                                <h2>15 Kg</h2>
                            </div>
                        </div>
                        <div
                            className="robowar_flag_card card0"
                            style={{
                                backgroundImage: `url(${props.cardbg2})`,
                            }}
                        >
                            <div className="robowar_flag_card-border">
                                <h2>60 Kg</h2>
                            </div>
                        </div>
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
                                    NAME SURNAME
                                </p>
                                <p className="robowar_flagContactUs-mail">
                                    fake.1@iitj.ac.in
                                </p>
                                <p className="robowar_flagContactUs-phone">
                                    +91 123456789
                                </p>
                            </div>
                            <div>
                                <p className="robowar_flagContactUs-name">
                                    NAME SURNAME
                                </p>
                                <p className="robowar_flagContactUs-mail">
                                    fake.1@iitj.ac.in
                                </p>
                                <p className="robowar_flagContactUs-phone">
                                    +91 123456789
                                </p>
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

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await api.get(`${backendURL}/checkteamrw/`);

                if (response.status === 200) {
                  console.log(response.data);
                } else {
                    throw response.statusText;
                }
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, []);
    return (
        <FadeIn duration={500}>
            <div id="robowar_flagshipEventsPage">
                {flagshipEvents_data.map(createEntry)}
            </div>
        </FadeIn>
    );
}

export default Robowar;
