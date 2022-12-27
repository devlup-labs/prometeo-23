// import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import flagshipEvents_data from "./dummy_dronerace";
import "./dronerace.css";

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
    <div className="flag">
      <div
        id="flagTop-bg"
        className="flagTop-DroneContainer-bg"
        style={{
          backgroundImage: `url(${props.bg})`,
        }}
      >
        {/* <img src={props.image} /> */}
      </div>
      <div className="flagTop-DroneContainer">
        <h1 data-title={props.name}>{props.name}</h1>
        {/* <div class="table center">
          <div class="monitor-wrapper center">
            <div class="monitor center">
              <p>Ready for war</p>
            </div>
          </div>
        </div> */}

        {/* <img src={props.image} /> */}
      </div>
      <section className="flag-bottom-bg">
        <div className="flagAbout">
          <h3 className="title-shadow">ABOUT</h3>
          <section className="Abouttable">
            <div id="flag_prize">
              <img src={prizeImg} alt="icon" id="flag_prize-icon" />
              <div id="flagPrize-description">
                <span className="js-num" data-target="12000">
                  60
                </span>
                <span>K+</span>
                <br />
                <span ref={ref}>Prize Pool</span>
              </div>
            </div>
            <div>
              <p className="about-description">{props.description}</p>
              <Link id="flagAbout-button">Registrations Opening Soon</Link>
            </div>
          </section>
          {/* <p>{props.description}</p> */}
        </div>
        {/* <div className="flagSponsors">
          <h3 className="title-shadow">SPONSORS</h3>
          <img src="https://apiv.prometeo.in/media/sponsors/smasung_sWRoaY5.webp" />
        </div> */}
        <div className="flagContactUs">
          <h3 className="title-shadow">CONTACT US</h3>
          <div class="canvas">
            <div id="contact-card" class="contact-card">
              <div>
                <p className="flagContactUs-name">NAME SURNAME</p>
                <p className="flagContactUs-mail">fake.1@iitj.ac.in</p>
                <p className="flagContactUs-phone">+91 123456789</p>
              </div>
              <div>
                <p className="flagContactUs-name">NAME SURNAME</p>
                <p className="flagContactUs-mail">fake.1@iitj.ac.in</p>
                <p className="flagContactUs-phone">+91 123456789</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function DroneRace() {
  return (
    <FadeIn duration={500}>
      <div id="flagshipEventsPage">{flagshipEvents_data.map(createEntry)}</div>
    </FadeIn>
  );
}

export default DroneRace;
