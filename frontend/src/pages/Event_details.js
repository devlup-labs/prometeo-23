import React from "react";
import { useState, useEffect } from "react";
import { useLocation, useSearchParams, Link } from "react-router-dom";

import "./EventDetails.css";
import { backendURL } from "../backendURL";
import FadeIn from "../components/fadein";

function CreateEntry(props) {
    const eventTerm = props.eventInfo;
    const eventSponsor = props.eventSponsor;

    return (
        <Details
            key={eventTerm.id}
            eventTerm={eventTerm}
            eventSponsor={eventSponsor}
            // name={eventTerm.name}
            // img={eventTerm.image.replace(
            //     "0.0.0.0:8888",
            //     "apiv.prometeo.in"
            // )}
            // desc={eventTerm.description}
            // team_size={eventTerm.max_team_size}
            // prize={eventTerm.prize}
            // date={eventTerm.date}
            // rulebook={eventTerm.rulebook}
            // sponsor_name={eventSponsor.map((sponsor) => {
            //     if (sponsor.name) return sponsor.name;
            //     else return "#";
            // })}
            // sponsor_image={
            //     // for each sponsor, we need to get the image from the backend
            //     // and then display it here
            //     eventSponsor.map((sponsor) => {
            //         return sponsor.image.replace(
            //             "0.0.0.0:8888",
            //             "apiv.prometeo.in"
            //         );
            //     })
            // }
            // sponsor_website={eventSponsor.map((sponsor) => {
            //     if (sponsor.website) return sponsor.website;
            //     else return "#";
            // })}
        />
    );
}

function Details(props) {
    const eventTerm = props.eventTerm;
    const eventSponsor = props.eventSponsor;

    return (
        <div className="event-details">
            <div className="event-details__header">
                <div className="event-details__title">
                    {eventTerm.name}
                    <div className="event-details__title__underline"></div>
                </div>
                {eventSponsor.length > 0 && (
                    <div className="event-details__sponsors">
                        <div className="event-details__sponsors_text">
                            Sponsored by
                        </div>
                        <div className="event-details__sponsors_images">
                            {eventSponsor.map((sponsor) => {
                                return (
                                    <img
                                        src={
                                            sponsor.image
                                                ? sponsor.image.replace(
                                                      "0.0.0.0:8888",
                                                      "apiv.prometeo.in"
                                                  )
                                                : ""
                                        }
                                        title={sponsor.name}
                                        alt="Sponsor Image"
                                        key={sponsor.id}
                                    />
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
            <div className="event-details__body">
                <div className="event-details__body__left">
                    {/* <div className="event-details__body__left__image"> */}
                    <img
                        className="event-details__body__left__image__img"
                        src={
                            eventTerm.image
                                ? eventTerm.image.replace(
                                      "0.0.0.0:8888",
                                      "apiv.prometeo.in"
                                  )
                                : ""
                        }
                        alt="Event Image"
                    />
                    {/* </div> */}
                    <div className="event-details__body__left__buttons">
                        {eventTerm.external_link && (
                            <a
                                href={eventTerm.external_link || ""}
                                className="event-details-register button-64"
                            >
                                <span>REGISTER</span>
                            </a>
                        )}
                        {eventTerm.rulebook && (
                            <a
                                href={
                                    eventTerm.rulebook.replace(
                                        "0.0.0.0:8888",
                                        "apiv.prometeo.in"
                                    ) || ""
                                }
                                className="event-details-rulebook button-64"
                            >
                                <span>RULEBOOK</span>
                            </a>
                        )}
                    </div>
                </div>
                <div className="event-details__body__right">
                    <div className="event-details__body__right__top">
                        <div className="event-details__body__right__top__on">
                            On{" "}
                            <span id="event-details-text">
                                {eventTerm.date}
                            </span>
                        </div>
                        <div className="event-details__body__right__top__prize">
                            Prize Money{" "}
                            <span id="event-details-text">
                                {eventTerm.prize}
                            </span>
                        </div>
                        <div className="event-details__body__right__top__participation-type">
                            Participation Type{" "}
                            <span id="event-details-text">
                                {eventTerm.participation_type}
                            </span>
                        </div>
                        {eventTerm.max_team_size > 1 && (
                            <div className="event-details__body__right__top__teams">
                                Team Size{" "}
                                <span id="event-details-text">
                                    {eventTerm.min_team_size}-
                                    {eventTerm.max_team_size}
                                </span>
                            </div>
                        )}
                    </div>
                    <hr className="event-details__body__right__bottom1__hr" />
                    <div className="event-details__body__right__bottom">
                        {eventTerm.description && (
                            <>
                                <p id="event-content-heading">Description</p>
                                <div className="event-details__body__right__bottom2">
                                    {eventTerm.description}
                                </div>
                                <hr className="event-details__body__right__bottom1__hr" />
                            </>
                        )}
                        {eventTerm.problem_statement && (
                            <>
                                <p id="event-content-heading">
                                    Problem Statement
                                </p>
                                <div
                                    className="event-details__body__right__bottom1"
                                    dangerouslySetInnerHTML={{
                                        __html: eventTerm.problem_statement,
                                    }}
                                ></div>
                            </>
                        )}
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

            const fetchURL = `${backendURL}/api/eventsponsors/`;

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
            <div id="EventDetailsPage" className="contentDiv">
                <CreateEntry
                    eventInfo={eventInfo}
                    eventSponsor={eventSponsor}
                />
            </div>
        </FadeIn>
    );
}

export default EventDetails;
