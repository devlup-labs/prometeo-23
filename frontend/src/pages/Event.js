import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import event_data from "./event_info";
import "./event.css";

import logo from "../assets/navbar/prometeo_logo_23.png";
import Footer from "../components/footer";
import FadeIn from "../components/fadein";
import { backendURL } from "../backendURL";

// function logo(url){
//    return(
//     <img src={url} alt="sponsor_logo" />
//    );
// }

const eventTypeToName = {
    live: "Live Events",
    technical: "Technical Events",
    informal: "Informal Events",
    entrepreneurial: "Entrepreneurial Events",
    workshop: "Workshops",
    poster_presentation: "Poster Presentation",
    panel_discussion: "Panel Discussion",
    exhibition: "Tech Carnival",
};

function createEntry(eventTerm) {
    if (eventTerm.name !== "Tedx" && eventTerm.type !== "talk") {
        return <Entry key={eventTerm.id} event={eventTerm} />;
    } else return null;
}

function Entry(props) {
    const event = props.event;
    // console.log("Event:", event)
    return (
        <div className="event_Card">
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
                        <h3 className="event_Card-prize">
                            Prize {event.prize}
                        </h3>
                    )}
                </div>
            </div>
            <div id="buttons">
                <div
                    id="button1"
                    // to={{
                    // 	pathname: '/event-details/',
                    // 	search: `?id=${event.id}`,
                    // }}
                >
                    {event.date}
                </div>
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
            {/* </tr> */}
            {/* </table> */}
        </div>
    );
}

function Events() {
    const [urlParams] = useSearchParams();
    // console.log("Type: ", urlParams.get("type"));

    const [eventData, setEventData] = useState([]);

    useEffect(() => {
        const navBarEle = document.getElementById("navbar");
        navBarEle.style.opacity = 1;
        document.body.style.overflow = "auto";
    });

    useEffect(() => {
        async function fetchData() {
            let headers = new Headers();
            headers.append("Content-Type", "application/json");
            headers.append("Accept", "application/json");
            headers.append("Origin", "http://localhost:3000");

            const requestOptions = {
                method: "GET",
                headers: headers,
            };

            const fetchURL = urlParams.get("type")
                ? `${backendURL}/events/?type=${urlParams.get("type")}`
                : `${backendURL}/events/`;

            await fetch(fetchURL, requestOptions)
                .then((response) => response.json())
                .then((data) => {
                    if (data.length === 0) setEventData([...[{name: "no data"}]]);
                    else setEventData([...data]);
                    // console.log("Data:", data);
                })
                .catch((error) => {
                    console.error("Error:", error);
                    setEventData([...[{name: "no data"}]]);
                });
        }
        fetchData();
    }, [urlParams]);

    return (
        <FadeIn duration={500}>
            <div id="eventsPage" key={urlParams.get("type")}>
                <h2 className="section-header">
                    {urlParams.get("type")
                        ? eventTypeToName[urlParams.get("type")]
                        : "Events"}
                </h2>
                <section className="event_Hero-section">
                    {
                        eventData.length > 0 ? (
                            eventData[0].name === "no data" ? (
                                <div className="event_Card-coming-soon">
                                    Coming Soon!
                                </div>
                            ) : (
                                <div className="event_Card-grid">
                                    {eventData.map(createEntry)}
                                </div>
                            )
                        ) : (
                            <div className="event_Card-coming-soon">
                                Loading...
                            </div>
                        )
                    }
                </section>
                {/* <div className="event_cards">{event_data.map(createEntry)}</div> */}
                {/* <Footer /> */}
            </div>
        </FadeIn>
    );
}

export default Events;
