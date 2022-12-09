import React from "react";
import { useState, useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

import "./EventDetails.css";
import { backendURL } from "../backendURL";
import FadeIn from "../components/fadein";

function CreateEntry(props) {
  const eventTerm = props.eventInfo;
  const eventSponsor = props.eventSponsor;
  let n1 = Object.keys(eventTerm).length;
  let n2 = eventSponsor.length;
//   if (n1>0) console.log("event:", eventTerm);
//   else console.log("event: null");
//   if (n2>0) console.log("sponsor:", eventSponsor);
//   else console.log("sponsor: null");
  if (n1 > 0 && n2 > 0) {
	console.log("all good boss");
    return (
      <Details
        key={eventTerm.id}
        name={eventTerm.name}
        img={eventTerm.image.replace("0.0.0.0:8888", "apiv.prometeo.in")}
        desc={eventTerm.description}
        team_size={eventTerm.max_team_size}
        prize={eventTerm.prize}
        date={eventTerm.date}
        rulebook={eventTerm.rulebook}
        sponsor_name={eventSponsor.map((sponsor) => {
			if (sponsor.name) return (sponsor.name);
			else return ("#");
		})}
        sponsor_image={
			// for each sponsor, we need to get the image from the backend
			// and then display it here
			eventSponsor.map((sponsor) => {
				return (sponsor.image.replace("0.0.0.0:8888","apiv.prometeo.in"));
			})
		}
        sponsor_website={eventSponsor.map((sponsor) => {
			if (sponsor.website) return (sponsor.website);
			else return ("#");
		})}
      />
    );
  } else if (n1 > 0) {
	console.log("sponsor kon hai bhai");
    return (
      <Details
        key={eventTerm.id}
        name={eventTerm.name}
        img={eventTerm.image.replace("0.0.0.0:8888", "apiv.prometeo.in")}
        desc={eventTerm.description}
        team_size={eventTerm.max_team_size}
        prize={eventTerm.prize}
        date={eventTerm.date}
        rulebook={eventTerm.rulebook}
      />
    );
  } else {
	console.log("event kon hai bhai");
	return <div></div>;
  }

}

function Details(props) {
  //    if(props.sponsor ===null){
  //     document.getElementsByClassName("sponsor-title").style.display="none";
  //    }
  return (
    <div className="DetailsRow">
      <div className="TopRow">
        <div className="event-title">
          <h1>{props.name} </h1>
        </div>
        {/* <div className="title-sponsor-card">
          <h3 className="sponsor-title">presented by</h3>
          <img
            src="https://store-images.s-microsoft.com/image/apps.22831.65366b28-c5ab-4d39-ac90-c216f32a7b40.4d3b9954-a5ad-45d2-8e6f-13814f1c29c1.62d5a420-2ae0-44f5-8d6d-f17213f8741c"
            className="title-sponsor-img"
          ></img>
        </div> */}
      </div>
      <div className="BottomRow">
        <div className="DetailsColumn LeftColumn">
          <div className="image-box d-flex justify-content-center">
            <div className="event-image-container">
              <img
                alt="event_image"
                className="responsive-image"
                src={props.img}
              ></img>
            </div>
          </div>
          <div className="desc-links">
            {/* <a href="" alt="register" className="individual_link">Register</a> */}
            <form action="" className="link-form">
              <input
                type="submit"
                value="Register"
                className="individual_link"
              />
            </form>
            {/* <a href="{props.rulebook}" alt="rulebook" className="individual_link">RuleBook</a> */}
            <form action={props.rulebook} className="link-form">
              <input
                type="submit"
                value="Rulebook"
                className="individual_link"
              />
            </form>

            <form action="" className="link-form contact-us ">
              <input
                type="submit"
                value="Contact Us"
                className="individual_link"
              />
            </form>
          </div>
        </div>
        <div className="DetailsColumn RightColumn">
          <div className="event-other-details">
            <h3 className="event-items">On </h3>
            <p className="event-items event-date">{props.date}</p>
          </div>
          <div className="event-other-details ">
            <h3 className="event-items">Prize Money </h3>
            <p className="event-items event-prize">{props.prize}</p>
          </div>
          <br />

          <div className="event-other-details">
            <h3 className="event-items">Team Size </h3>
            <p className="event-items">{props.team_size}</p>
          </div>

          <div className="event-other-details right-detail">
            <h3 className="event-items">Registration Fee </h3>
            {/*  THIS IS HARD CODED AS OF NOW */}
            <p className="event-items">NIL</p>
          </div>

          <div className="event-description">
            {/* <h3>Description </h3> */}
            <p>{props.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function EventDetails() {
  const [eventSponsor, setEventSponsor] = useState([]);
  const [eventInfo, setEventInfo] = useState([]);
  const [urlParams] = useSearchParams();

  const location = useLocation();
  //   console.log(location.state);

  useEffect(() => {
    // console.log("useEffect");

    async function fetchData() {
      let headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Accept", "application/json");
      headers.append("Origin", "http://localhost:3000");

      const requestOptions = {
        method: "GET",
        headers: headers,
      };

      const fetchURL = `${backendURL}/api/events/`;

      await fetch(fetchURL, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          data = data.filter((item) => item.id == urlParams.get("id"));
          setEventInfo([...data]);
          // console.log("Data:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }

    const card = location.state;
    // console.log("Card:", card);

    if (card) {
      //   console.log("pewpewpew");
      setEventInfo(card);
    } else {
      //   console.log("pewpewpew2");
      fetchData();
    }
  }, []);

  useEffect(() => {
    async function fetchData2() {
      let headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Accept", "application/json");
      headers.append("Origin", "http://localhost:3000");

      const requestOptions = {
        method: "GET",
        headers: headers,
      };

      const fetchURL = `${backendURL}/api/eventsponsors/`;

      await fetch(fetchURL, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          data = data.filter((item) => item.event == urlParams.get("id"));
          setEventSponsor([...data]);
          console.log("Data:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }

    fetchData2();
  }, []);

  useEffect(() => {
    const navBarEle = document.getElementById("navbar");
    navBarEle.style.opacity = 1;
    document.body.style.overflow = "auto";
  });

  return (
    <FadeIn duration={500}>
      <div id="EventDetailsPage" className="contentDiv">
        <div id="event-header">
          <h2>EVENT DETAILS</h2>
        </div>
        <div className="EventContent">
          {/* <Details /> */}
          <CreateEntry eventInfo={eventInfo} eventSponsor={eventSponsor} />
        </div>
      </div>
    </FadeIn>
  );
}

export default EventDetails;
