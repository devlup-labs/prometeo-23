import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import useOnScreen from "./useOnScreen";

import bgImage2 from "../assets/backgrounds/exploration.png";
import participantsImg from "../assets/icons/participants.png";
import collegesImg from "../assets/icons/colleges.png";
import eventsImg from "../assets/icons/events.png";
import speakersImg from "../assets/icons/talks.png";
import prizeImg from "../assets/icons/prize.png";
import sponsorsImg from "../assets/icons/sponsors.png";

import "./statsHome.css";

import $ from "jquery";

export default function StatsHome() {
    // const [isVisible, setIsVisible] = useState(false);

    const ref = useRef();
    const onScreen = useOnScreen(ref);

    const [countDone, setCountDone] = useState(false);

    // const startCounter = (counters, speed) => {
    //     counters.forEach((counter) => {
    //         const updateCount = () => {
    //             const target = +counter.getAttribute("data-target");
    //             const count = +counter.innerText;
    //             // remove the + sign from count if it is present
    //             // if (count.toString().indexOf("+") > 0) {
    //             //     count = count.toString().split("+")[0];
    //             // }

    //             const inc = target / speed;
    //             if (count < target) {
    //                 counter.innerText = Math.ceil(count + inc);
    //                 setTimeout(updateCount, 1);
    //             } else {
    //                 counter.innerText = target;
    //             }
    //             // counter.innerText += "+";
    //         };
    //         updateCount();
    //     });
    // };

    function countUp() {
        var num = $(this).text();
        var decimal = 0;
        if (num.indexOf(".") > 0) {
            // if number is Decimal
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

        // startCounter(counters, speed);
        if (!countDone && onScreen) {
            // console.log("hmmmmm");
            $(".js-num").each(countUp);
            setCountDone(true);
        }
        // console.log("countDone: ", countDone);
    }, [onScreen]);

    return (
        <div id="statsHome-container">
            <img id="statsHome-image-img" src={bgImage2} alt="bgImage" />
            <div id="statsHome">
                <div id="statsHome-top">
                    <div id="statsHome-title">
                        <div id="statsHome-subheading">A GLIMPSE OF</div>
                        <div id="statsHome-heading">PROMETEO 2022</div>
                        <div id="statsHome-hr"></div>
                    </div>
                    <div id="statsHome-description">
                        {/* create 6 divs */}
                        <div id="statsHome-description-row">
                            <div id="statsHome-description-1">
                                <img
                                    src={participantsImg}
                                    alt="icon"
                                    id="stats-icon"
                                />
                                <div id="statsHome-description-top">
                                    <span
                                        className="js-num"
                                        data-target="12000"
                                    >
                                        12000
                                    </span>
                                    <span>+</span>
                                </div>
                                <span>Participants</span>
                            </div>
                            <div id="statsHome-description-2">
                                <img
                                    src={collegesImg}
                                    alt="icon"
                                    id="stats-icon"
                                />
                                <div id="statsHome-description-top">
                                    <span
                                        className="js-num"
                                        data-target="12000"
                                    >
                                        450
                                    </span>
                                    <span>+</span>
                                </div>
                                <span>Colleges</span>
                            </div>
                            <div id="statsHome-description-3">
                                <img
                                    src={prizeImg}
                                    alt="icon"
                                    id="stats-icon"
                                />
                                <div id="statsHome-description-top">
                                    <span
                                        className="js-num"
                                        data-target="12000"
                                    >
                                        5.5
                                    </span>
                                    <span id="statsHome-lakh">Lakh+</span>
                                </div>
                                <span>Prize Pool</span>
                            </div>
                        </div>
                        <div id="statsHome-description-row">
                            <div id="statsHome-description-4">
                                <img
                                    src={sponsorsImg}
                                    alt="icon"
                                    id="stats-icon"
                                />
                                <div id="statsHome-description-top">
                                    <span
                                        className="js-num"
                                        data-target="12000"
                                    >
                                        30
                                    </span>
                                    <span>+</span>
                                </div>
                                <span>Sponsors</span>
                            </div>
                            <div id="statsHome-description-5">
                                <img
                                    src={speakersImg}
                                    alt="icon"
                                    id="stats-icon"
                                />
                                <div id="statsHome-description-top">
                                    <span
                                        className="js-num"
                                        data-target="12000"
                                    >
                                        30
                                    </span>
                                    <span>+</span>
                                </div>
                                <span>Speakers</span>
                            </div>
                            <div id="statsHome-description-6">
                                <img
                                    src={eventsImg}
                                    alt="icon"
                                    id="stats-icon"
                                />
                                <div id="statsHome-description-top">
                                    <span
                                        className="js-num"
                                        data-target="12000"
                                    >
                                        20
                                    </span>
                                    <span>+</span>
                                </div>
                                <span>Events</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="statsHome-links" ref={ref}>
                    {/* <Link to="/stats">
                        <button id="preregister-button" className="button-29">
                            View More
                        </button>
                    </Link> */}
                </div>
            </div>
        </div>
    );
}
