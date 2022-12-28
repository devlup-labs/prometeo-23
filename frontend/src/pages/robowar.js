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

import prizeImg from "../assets/icons/prize.png";
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
        <div className="flag">
            <div
                className="flagTop-Container"
                style={{
                    backgroundImage: `url(${props.bg})`,
                }}
            >
                <h1 data-title={props.name}>{props.name}</h1>
                <div class="rw-buttons">
                    <button id="rw-create-button" className="button-48">
                        <span className="button-text">CREATE TEAM</span>
                    </button>
                    <button id="rw-join-button" className="button-48">
                        <span className="button-text">JOIN TEAM</span>
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
        </div>
    );
}

function Robowar() {
    return (
        <FadeIn duration={500}>
            <div id="flagshipEventsPage">
                {flagshipEvents_data.map(createEntry)}
            </div>
        </FadeIn>
    );
}

export default Robowar;
