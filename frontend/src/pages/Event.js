import React, { useEffect } from "react";
import event_data from "./event_info";
import "./event_page.css";

import logo from "../assets/navbar/prometeo_logo_23.png";
import FadeIn from "../components/fadein";

// function logo(url){
//    return(
//     <img src={url} alt="sponsor_logo" />
//    );
// }

function createEntry(eventTerm) {
  return (
      <Entry
        key={eventTerm.id}
        name={eventTerm.name}
        img={eventTerm.image}
        prize={eventTerm.prize}
		    date={eventTerm.date}
      />
  );
}

function Entry(props) {
  // console.log(props)
  return (
    <a className="event_Card" href="#">
      <div
        className="event_Card-background"
        style={{
          backgroundImage: `url(${props.img})`,
        }}
      >
        {/*  <div class="blue_layer"></div>     blue layer on hover*/}
      </div>
      <div className="event_Card-content">
        {/* <div className="card"></div> */}
        <h3 className="event_Card-heading">{props.name}</h3>

        <div className="event_Card-info">
          <h1 className="event_Card-date">{props.date}</h1>
          <h3 className="event_Card-prize">Prize {props.prize}</h3>
        </div>
      </div>
      <button className="button1">Register</button>
      <button className="button2">View More</button>
    </a>
  );
}

function Events() {
  useEffect(() => {
    const navBarEle = document.getElementById("navbar");
    navBarEle.style.opacity = 1;
    document.body.style.overflow = "auto";
  });

  return (
    <FadeIn duration={500}>
      <div id="eventsPage">
        <h2 className="section-header">PAST EVENTS</h2>
        <section className="event_Hero-section">
          <div className="event_Card-grid">{event_data.map(createEntry)}</div>
        </section>
        {/* <div className="event_cards">{event_data.map(createEntry)}</div> */}
      </div>
    </FadeIn>
  );
}

export default Events;
