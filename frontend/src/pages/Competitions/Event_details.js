import React from "react";
import { useState, useEffect, Component, useContext } from "react";
import useAxios from "../../context/context_useAxios";
import { useLocation, useSearchParams, Link } from "react-router-dom";
import { PDFObject } from "react-pdfobject";
import { toast } from "react-toastify";

import "./EventDetails.css";
import { backendURL } from "../../backendURL";
import FadeIn from "../../components/fadein";
import AuthContext from "../../context/AuthContext";

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
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://apply.devfolio.co/v2/sdk.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  function forceDownload(blob, filename) {
    var a = document.createElement("a");
    a.download = filename;
    a.href = blob;
    // For Firefox https://stackoverflow.com/a/32226068
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  // Current blob size limit is around 500MB for browsers
  async function downloadResource(url, filename) {
    if (!filename) filename = url.split("\\").pop().split("/").pop();
    await fetch(url, {
      headers: new Headers({
        Origin: "http://localhost:3000",
      }),
      mode: "no-cors",
    })
      .then((response) => response.blob())
      .then((blob) => {
        let blobUrl = window.URL.createObjectURL(blob);
        forceDownload(blobUrl, filename);
      })
      .catch((e) => console.error(e));
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
        });
    });

    toast.promise(myPromise, {
      pending: "Downloading...",
      success: "Downloaded successfully!",
      error: "Error while downloading",
    });
  };

  // if (PDFObject.supportsPDFs) {
  //   console.log("Yay, this browser supports inline PDFs.");
  // } else {
  //   console.log("Boo, inline PDFs are not supported by this browser");
  // }
  const [searchParams, SetSearchParams] = useSearchParams();
  const { user, logoutUser } = useContext(AuthContext);
  const [eventData, setEventData] = useState([]);
  console.log(user);
  const api = useAxios();

  const event_name = searchParams.get("name");
  const event_number = searchParams.get("id");
  const handleSubmit = (e) => {
    console.log(e);
    async function fetchData() {
      // console.log(searchParams.get("name"));
      // const event_name = searchParams.get("name");
      // const event_number = searchParams.get("id");

      try {
        // console.log("Fetching data for user:", user.email);
        console.log(user);
        const obj = {
          email: user.email,
          // ambassador: user.ambassador,
          // referral: user.referral_code,
          event_name: event_name,
        };
        // console.log(obj);
        const response = await api.post(`${backendURL}/registerevent/`, obj);
        if (response.status === 200) {
          let data = response.data;
          console.log(data);
          setEventData([...data]);
          return data;
        } else {
          throw "Error: " + response.statusText;
        }
      } catch (error) {
        console.log("Error:", error);
        throw error;
      }
    }

    if (user === null) {
      toast.error("Please login to register!");
    } else {
      const myPromise = new Promise((resolve, reject) => {
        fetchData()
          .then((res) => {
            // console.log(res)
            resolve(res);
          })
          .catch((err) => {
            // console.log(err)
            reject(err);
          });
      });

      toast.promise(myPromise, {
        pending: "Registering for the event...",
        success: "Registered successfully!",
        error: {
          render: ({ data }) => {
            return "Something went wrong!";
          },
        },
      });
    }
  };
  return (
    <div className="event-details">
      <div className="event-details__header">
        <div className="event-details__back-button">
          <Link to={`/competitions`}>
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
        {eventTerm.name === "Blockchain Hackathon" && (
          <div className="blockchain__sponsors">
            {/* <div className="blockchain__sponsors_text">Sponsored by</div> */}
            {/* <div className="devfolio_button"> */}
            {/* <Link id="eventRegis-button">Register</Link> */}
            {/* <span>Apply with Devfolio</span> */}
            <div
              className="apply-button"
              data-hackathon-slug="prometeo23-blockchain-hackathon"
              data-button-theme="dark-inverted"
            >
              {/* Apply with Devfolio */}
            </div>
            {/* </div> */}
            <div className="blockchain__sponsors_images">
              <div className="sponsor_metal1">
                <div className="sponsor_metal1_name">Diamond Sponsors</div>
                <div className="event_sponsors_image1">
                  <img
                    // src="../assets/logo_sponsors/Devfolio_Logo-Colored.png"
                    // src="../assets/logo_sponsors/Devfolio_Logo-White.svg"
                    src="https://drive.google.com/uc?export=view&id=1dlWFRAQ9btrZxXNO0DnbghJaOrfADMps"
                    //   title={sponsor.name}
                    alt="Sponsor Image"
                    //   key={sponsor.id}
                  />
                  <img
                    // src="../assets/logo_sponsors/Devfolio_Logo-Colored.png"
                    src="https://drive.google.com/uc?export=view&id=1oNsLi1garvuatbkdnMw2wR7MXOz5DzpV"
                    //   title={sponsor.name}
                    alt="Sponsor Image"
                    //   key={sponsor.id}
                  />
                </div>
              </div>
              <div className="sponsor_metal2">
                <div className="sponsor_metal2_name">Gold Sponsors</div>
                <div className="event_sponsors_image2">
                  <img
                    // src="../assets/logo_sponsors/Devfolio_Logo-Colored.png"
                    src="https://drive.google.com/uc?export=view&id=1Ehq2SEFjT8tUY_QqH23yp2WHi-l9Q3XF"
                    //   title={sponsor.name}
                    alt="Sponsor Image"
                    //   key={sponsor.id}
                  />
                  <img
                    // src="../assets/logo_sponsors/Devfolio_Logo-Colored.png"
                    src="https://drive.google.com/uc?export=view&id=1twz-NvQkg8F4_0RnA6S9fQW8eNYIEw7j"
                    //   title={sponsor.name}
                    alt="Sponsor Image"
                    //   key={sponsor.id}
                  />
                  <img
                    // src="../assets/logo_sponsors/Devfolio_Logo-Colored.png"
                    src="https://drive.google.com/uc?export=view&id=1Ci9qGZs9QdNCWHp9nmxqBstp0iQ9aqTY"
                    //   title={sponsor.name}
                    alt="Sponsor Image"
                    //   key={sponsor.id}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        {eventSponsor.length > 0 &&
          eventTerm.name !== "Blockchain Hackathon" && (
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
            {/* <Link id="eventRegis-button">Register</Link> */}

            {/* {eventTerm.name == "Blockchain Hackathon" ? 
						{/* {eventTerm.name == "Blockchain Hackathon" ? 
            {/* {eventTerm.name == "Blockchain Hackathon" ? 
              <a
                href={eventTerm.external_link || ""}
                className="event-details-register button-64"
              >
                <span>REGISTER</span>
              </a>: "" } */}
            {/* {console.log(eventTerm.name)} */}

            {eventTerm.name === "Speed Cubing" ||
            eventTerm.name === "Bridge making competition" ? (
              eventTerm.name === "Speed Cubing" ? (
                <a
                  id="ca-register-button"
                  className="event-details-register button-64"
                  // value={eventTerm.name}
                  onClick={handleSubmit}
                >
                  <span className="">
                    {false ? "Already Registered" : "REGISTER!"}
                  </span>
                </a>
              ) : (
                <>
                  <button
                    id="rw-create-button"
                    className="event-details-register button-64"
                    onClick={() => {
                      if (props.user === null) {
                        toast.error("Please login to create a team");
                        // navigate("/login");
                      }
                    }}
                  >
                    <Link
                      to={{
                        pathname: "/event_createTeam",
                        search: `?id=${event_number}&name=${event_name}`,
                      }}
                      className="bridge-button-text"
                    >
                      CREATE TEAM
                    </Link>
                  </button>
                  <button
                    id="rw-join-button"
                    className="event-details-register button-64"
                  >
                    <Link
                      to={{
                        pathname: "/event_joinTeam",
                        search: `?id=${event_number}&name=${event_name}`,
                      }}
                      className="bridge-button-text"
                    >
                      JOIN TEAM
                    </Link>
                  </button>
                </>
              )
            ) : (
              eventTerm.external_link && (
                <a
                  href={eventTerm.external_link || ""}
                  target="_blank"
                  className="event-details-register button-64"
                >
                  <span>REGISTER</span>
                </a>
              )
            )}
            {eventTerm.rulebook &&
              // (
              //   <Link
              //     to={{
              //       pathname: "/competition-rulebook",
              //       search: `?id=${eventTerm.id}&name=${eventTerm.name}`,
              //       state: {eventTerm}
              //     }}
              //     // target="_blank"
              //     className="event-details-rulebook button-64"
              //   >
              //     <span>RULEBOOK</span>
              //   </Link>
              // )
              (PDFObject.supportsPDFs ? (
                <a
                  href={
                    eventTerm.rulebook.replace(
                      "http://0.0.0.0:8888",
                      "https://apiv.prometeo.in"
                    ) || ""
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="event-details-rulebook button-64"
                >
                  <span>RULEBOOK</span>
                </a>
              ) : (
                <div
                  className="event-details-rulebook button-64"
                  onClick={() =>
                    handleDownload(
                      eventTerm.rulebook.replace(
                        "http://0.0.0.0:8888",
                        "https://apiv.prometeo.in"
                      )
                    )
                  }
                >
                  <span>RULEBOOK</span>
                </div>
              ))}
          </div>
        </div>

        <div className="event-details__body__right">
          <div className="event-details__body__right__top">
            <ul className="tabs">
              <li className="">
                <a href="#tab1">Event Description</a>
              </li>
              {/* <li className={tabHeading}>
                                <a href="#tab2">Other Details</a>
                            </li> */}
              {/* <li><a href="#tab3">Contact Us</a></li> */}
            </ul>

            <div className="tab-content default-active" id="tab1">
              <div className="top-event-mains">
                <div className="event-details__body__right__top__on">
                  On <span id="event-details-text">{eventTerm.date}</span>
                </div>
                <div className="event-details__body__right__top__prize">
                  Prize Money{" "}
                  <span id="event-details-text">{eventTerm.prize}</span>
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
                    {eventTerm.min_team_size === eventTerm.max_team_size ? (
                      <span id="event-details-text">
                        {eventTerm.max_team_size}
                      </span>
                    ) : (
                      <span id="event-details-text">
                        {eventTerm.min_team_size}-{eventTerm.max_team_size}
                      </span>
                    )}
                  </div>
                )}
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
                    <p id="event-content-heading">
                      Description
                      {eventTerm.name === "Game Jam" ? (
                        <a href="https://rb.gy/xcxyiq">
                          Themes are released please click here!
                        </a>
                      ) : (
                        ""
                      )}
                    </p>
                    <div className="event-details__body__right__bottom2">
                      {eventTerm.description}
                    </div>
                    <hr className="event-details__body__right__bottom1__hr" />
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="tab-content" id="tab2">
            {/* <h2>Tab 2 Content</h2> */}

            <hr className="event-details__body__right__bottom1__hr" />
            <div className="event-details__body__right__bottom">
              {eventTerm.problem_statement && (
                <>
                  <p id="event-content-heading">Problem Statement</p>
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

function EventDetails() {
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

export default EventDetails;
