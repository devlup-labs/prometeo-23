import React from "react";
import { useState, useEffect } from "react";
import { useLocation, useSearchParams, Link } from "react-router-dom";

import "./EventDetails.css";
import { backendURL } from "../backendURL";

// function logo(url){
//    return(
//     <img src={url} alt="sponsor_logo" />
//    );
// }

const eventTypeToName = {
	"live": "Live Events",
	"technical": "Technical Events",
	"informal": "Informal Events",
	"entrepreneurial": "Entrepreneurial Events",
	"workshop": "Workshops",
	"poster_presentation": "Poster Presentation",
	"panel_discussion": "Panel Discussion",
	"exhibition": "Tech Carnival",
}

function createEntry(eventTerm) {
	if (
		eventTerm.name !== "Tedx"
		&& eventTerm.type !== "talk" 
	) {
		return (
			<Entry
				key={eventTerm.id}
				event={eventTerm}
			/>
		)
	}
	else return null;
}

function Entry(props) {
	const event = props.event;
	// console.log("Event:", event)
	return (
    <div className="event_Card">
      <Link
        id=""
        to={{
          pathname: "/event-details/",
          search: `?id=${event.id}&name=${event.name}`,
        }}
        state={event}
      >
        <div
          className="event_Card-background"
          style={{
            backgroundImage: `url(${event.image.replace(
              "0.0.0.0:8888",
              "apiv.prometeo.in"
            )})`,
          }}
        ></div>
        <div className="event_Card-content">
          {/* <div className="card"></div> */}
          <h3 className="event_Card-heading">{event.name}</h3>

          <div className="event_Card-info">
            <h1 className="event_Card-date">{event.date}</h1>
            {event.prize && event.prize !== "NA" && (
              <h3 className="event_Card-prize">Prize {event.prize}</h3>
            )}
          </div>
        </div>
      </Link>
      <div id="buttons">
			{/* <Link 
						id="button1"
						// to={{
						// 	pathname: '/event-details/',
						// 	search: `?id=${event.id}`,
						// }}
					>
						Register
					</Link> */}
			{/* <button className="button2">View more</button> */}
			<Link
			id="button2"
			to={{
				pathname: "/event-details/",
				search: `?id=${event.id}&name=${event.name}`,
			}}
			state={event}
			>
			View More
			</Link>
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

            const fetchURL = `${backendURL}/events/`;

            await fetch(fetchURL, requestOptions)
                .then((response) => response.json())
                .then((data) => {
                    data = data.filter(
                        (item) => item.id == urlParams.get("id")
                    );
                    setEventInfo(data[0]);
                    // console.log("Data:", data[0]);
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
            // console.log("pewpewpew2");
            fetchData();
        }
    }, []);

    // useEffect(() => {
    //   console.log("data fetched: ", eventInfo);
    // }, [eventInfo]);

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

            const fetchURL = `${backendURL}/eventsponsors/`;

            await fetch(fetchURL, requestOptions)
                .then((response) => response.json())
                .then((data) => {
                    data = data.filter(
                        (item) => item.event == urlParams.get("id")
                    );
                    setEventSponsor([...data]);
                    // console.log("Data:", data);
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
			<div id="eventsPage" key={urlParams.get("type")}>
				<h2 className="section-header">
					{
						urlParams.get("type") 
						? eventTypeToName[urlParams.get("type")]
						: "Events"
					}
				</h2>
				<section className="event_Hero-section">
					{
						(eventData.length > 0) ?
						<div className="event_Card-grid">{eventData.map(createEntry)}</div> :
						<div className="event_Card-coming-soon">
							Coming Soon!
						</div>
					}
				</section>
				{/* <div className="event_cards">{event_data.map(createEntry)}</div> */}
				{/* <Footer /> */}
			</div>
		</FadeIn>
	);
}

export default EventDetails;