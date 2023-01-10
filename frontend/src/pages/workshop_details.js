import React from "react";
import { useState, useEffect, Component } from "react";
import { useLocation, useSearchParams, Link } from "react-router-dom";
import { PDFObject } from 'react-pdfobject'
import { toast } from "react-toastify";

import "./workshopDetails.css";
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
    />
  );
}

function MakeActiveClass() {
  // const tab1 = document.getElementsByClassName('.tab-content');
  // tab1.classList.remove('active');
  const tab2 = document.getElementById("tab1");
  tab2.classList.add("active");
}

function removeDefault() {
  const tab1 = document.getElementById("tab1");
  tab1.classList.remove("default-active");
}

function Details(props) {
  const eventTerm = props.eventTerm;
  const eventSponsor = props.eventSponsor;

  // const checkProblem = props.problem_statement == null ? "tab-content" : "tab-hide"
  const tabHeading = props.problem_statement == null ? null : "tab-hide";

  // tabs
  var tabLinks = document.querySelectorAll(".tab_class");
  var tabContent = document.querySelectorAll(".tab-content");

  tabLinks.forEach(function (el) {
    el.addEventListener("click", openTabs);
  });

  function openTabs(el) {
    var btnTarget = el.currentTarget;
    // var country = btnTarget.dataset.country;

    tabContent.forEach(function (el) {
      el.classList.remove("active");
      el.classList.remove("default-active");
    });

    tabLinks.forEach(function (el) {
      el.classList.remove("active");
    });

    // document.querySelector("#" + country).classList.add("active");

    btnTarget.classList.add("active");
  }

  function forceDownload(blob, filename) {
    var a = document.createElement('a');
    a.download = filename;
    a.href = blob;
    // For Firefox https://stackoverflow.com/a/32226068
    document.body.appendChild(a);
    a.click();
    a.remove();
  }
  
  // Current blob size limit is around 500MB for browsers
  async function downloadResource(url, filename) {
    if (!filename) filename = url.split('\\').pop().split('/').pop();
    await fetch(url, {
        headers: new Headers({
          'Origin': 'http://localhost:3000'
        }),
        mode: 'no-cors'
      })
      .then(response => response.blob())
      .then(blob => {
        let blobUrl = window.URL.createObjectURL(blob);
        forceDownload(blobUrl, filename);
      })
      .catch(e => console.error(e));
  }
  
  // downloadResource('https://giant.gfycat.com/RemoteBlandBlackrussianterrier.webm');

  const handleDownload = (url) => {
    const myPromise = new Promise((resolve, reject) => {
      downloadResource(url)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        })
    })

    toast.promise(myPromise, {
      pending: "Downloading...",
      success: "Downloaded successfully!",
      error: "Error while downloading"
    })

  }

  // if (PDFObject.supportsPDFs) {
  //   console.log("Yay, this browser supports inline PDFs.");
  // } else {
  //   console.log("Boo, inline PDFs are not supported by this browser");
  // }

  return (
    <div className="event-details">
      <div className="event-details__header">
        <div className="event-details__back-button">
          <Link to={`/workshop`}>
            <svg
              className="fa fa-backBtn"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
            </svg>
          </Link>
        </div>
        <div className="event-details__title">
          {eventTerm.name}
          <div className="event-details__title__underline"></div>
        </div>
        {eventSponsor.length > 0 && (
          <div className="event-details__sponsors">
            <div className="event-details__sponsors_text">Sponsored by</div>
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
                ? eventTerm.image.replace("0.0.0.0:8888", "apiv.prometeo.in")
                : ""
            }
            alt="Event Image"
          />
          {/* </div> */}
          <div className="event-details__body__left__buttons">
            {eventTerm.external_link && (
              <a
                href={eventTerm.external_link || ""}
                target="_blank"
                className="event-details-register button-64"
              >
                <span>REGISTER</span>
              </a>
            )}
            {eventTerm.rulebook &&
              (PDFObject.supportsPDFs ? (
                <a
                  href={
                    eventTerm.rulebook.replace(
                      "0.0.0.0:8888",
                      "apiv.prometeo.in"
                    ) || ""
                  }
                  target="_blank"
                  className="event-details-rulebook button-64"
                >
                  <span>Content</span>
                </a>
              ) : (
                <div
                  className="event-details-rulebook button-64"
                  onClick={() =>
                    handleDownload(
                      eventTerm.rulebook.replace(
                        "0.0.0.0:8888",
                        "apiv.prometeo.in"
                      )
                    )
                  }
                >
                  <span>Content</span>
                </div>
              ))}
          </div>
        </div>

        <div className="event-details__body__right">
          <div className="workshop-details__body__right__top">
            <ul className="workshopTabs">
              <li className="tab_class active">
                <a href="#tab1">Event Description</a>
              </li>
              <li className="tab_class">
                <a href="#tab2">Discounts</a>
              </li>
              <li className="tab_class">
                <a href="#tab3">Rules</a>
              </li>
              <li className="tab_class">
                <a href="#tab4">Contact Us</a>
              </li>
              {/* <li className={tabHeading}>
                                <a href="#tab2">Other Details</a>
                            </li> */}
              {/* <li><a href="#tab3">Contact Us</a></li> */}
            </ul>

            <div className="tab-content active active default-active" id="tab1">
              <div className="top-event-mains">
                <div className="event-details__body__right__top__on">
                  On <span id="event-details-text">{eventTerm.date}</span>
                </div>
                <div className="event-details__body__right__top__prize">
                  Registration Fee
                  <span id="event-details-text">{eventTerm.prize}</span>
                </div>
                <div className="event-details__body__right__top__participation-type">
                  Participation Type
                  <span id="event-details-text">
                    {eventTerm.participation_type}
                  </span>
                </div>
                {eventTerm.venue && (
                  <div className="event-details__body__right__top__venue">
                    Venue <span id="event-details-text">{eventTerm.venue}</span>
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
              </div>
            </div>

            <div className="tab-content" id="tab2">
              {/* <h2>Tab 2 Content</h2> */}

              <hr className="event-details__body__right__bottom1__hr" />
              <div className="event-details__body__right__bottom">
                <p id="event-content-heading">Discounts</p>
                <div className="event-details__body__right__bottom2">
                  <h2>Single registration offer:</h2>
                  <p>
                    Register and Pay fee before 15th January, 2023 to get free
                    pass of Pronite.
                  </p>
                  <h2>Group Discounts:</h2>
                  <p>
                    Register as a group to avail the following discounts:
                    <br /> 2 members Rs. 100 off
                    <br /> 3 members Rs. 200 off
                  </p>
                  <p>*to avail the Discounts please contact us</p>
                </div>
              </div>
            </div>
            <div className="tab-content" id="tab3">
              {/* <h2>Tab 2 Content</h2> */}

              <hr className="event-details__body__right__bottom1__hr" />
              <div className="event-details__body__right__bottom">
                <p id="event-content-heading">Rules</p>
                <div className="event-details__body__right__bottom2">
                  <ul>
                    <li>
                      <b>Eligibility:</b>
                      <p>
                        Participants will have to register individually for each
                        workshop.
                      </p>
                    </li>
                    <li>
                      <b>Payment Instructions:</b>
                      <p>
                        While paying the fees, login with the same credentials
                        with which you had registered on the Website. Please
                        enter the data correctly for us to process your payment
                        information properly.
                      </p>
                    </li>
                    <li>
                      <b>Prerequisites:</b>
                      <p>
                        A laptop/PC with Microsoft Windows (7 or later & Minimum
                        4GB RAM), configuration Internet Connectivity (Typically
                        to be able to do video call / conferencing), Notepad &
                        Pen..
                      </p>
                    </li>
                    <br />
                    <p>
                      No Refunds will be entertained <br />
                      **Limited number of seats
                      <br />
                      ** If the Workshop gets canceled, all the participants
                      will be given a full refund, irrespective of the Deadline.
                    </p>
                  </ul>
                </div>
              </div>
            </div>
            <div className="tab-content workshop-contact" id="tab4">
              {/* <h2>Tab 2 Content</h2> */}

              <hr className="event-details__body__right__bottom1__hr" />
              <div className="event-details__body__right__bottom">
                <p id="event-content-heading">Contact</p>
                <div className="event-details__body__right__bottom2">
                  <ul>
                    <li>
                      <b>Likhith Ayinala: +91 82978 57887</b>
                    </li>
                    <li>
                      <b>Adarsh Palaskar: +91 93736 32633</b>
                    </li>
                    <br />
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="tab-content" id="tab3">
                       


                        <hr className="event-details__body__right__bottom1__hr" />
                        <div className="event-details__body__right__bottom">
                        <h3> Name</h3>

                                    
                                    <div
                                        className="event-details__body__right__bottom1">
                                     contact number  
                                     <br></br>
                                     email
                                    </div>
                
                
                        </div>   

                     {/* <MakeActiveClass />  */}

          {/* </div> */}
        </div>
      </div>
    </div>
  );
}

function WorkshopDetails() {
  const [eventSponsor, setEventSponsor] = useState([]);
  const [eventInfo, setEventInfo] = useState([]);
  const [urlParams] = useSearchParams();

  const location = useLocation();
  //   console.log(location.state);

  useEffect(() => {
    // check if the event is coming from the home page
    if (location.state) {
    } else {
      removeDefault();
    }
  }, []);

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
          data = data.filter((item) => item.id == urlParams.get("id"));
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
          data = data.filter((item) => item.event == urlParams.get("id"));
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
        <CreateEntry eventInfo={eventInfo} eventSponsor={eventSponsor} />
      </div>
    </FadeIn>
  );
}

export default WorkshopDetails;
