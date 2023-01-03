import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
// import "../pages/Competitions/event.css";
// import "../pages/Competitions/eventsTabs.css";
import "./workshop.css";

import FadeIn from "../components/fadein";
import { backendURL } from "../backendURL";


const tabsName = [
{
    name: "Workshops",
    id: "Workshops",
    data_content: "Workshops",
    data_title: "Workshops",
    status: "workshop",
  }]
function createEntry(eventTerm) {
  if (eventTerm.name !== "Tedx" && eventTerm.type !== "talk") {
    return <Entry key={eventTerm.id} event={eventTerm} />;
  } else return null;
}
function Entry(props) {
  const event = props.event;
  // console.log("Event:", event)

  return (
    <div className="workshop_card">
      <Link
        to={{
          pathname: "/workshop-details/",
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
              <h3 className="event_Card-prize">
                Registration Fee
                <br />
                <span className="event_Card-prize-val">
                  {event.prize.split(" ").slice(1).join(" ")}
                </span>
              </h3>
            )}
          </div>
        </div>
      </Link>

      <div id="buttons">
        <div id="button1">{event.date}</div>
        <Link
          id="button2"
          to={{
            pathname: "/workshop-details/",
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

function Workshop() {
  const [urlParams] = useSearchParams();

  const [eventData, setEventData] = useState([]);

  const [status, setStatus] = useState("technical");
  // const [DataTransferItemList, setDatalist]= useState(data);
  const setStatusFilter = (status) => {
    setStatus(status);
  };
  // console.log(status);

  useEffect(() => {
    if (urlParams.get("type")) {
      setStatusFilter(urlParams.get("type"));
    } else {
      setStatusFilter("technical");
    }
  }, [urlParams]);

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
      const fetchURL = `${backendURL}/events/`;
      // urlParams.get("type")
      //   ? `${backendURL}/events/?type=${urlParams.get("type")}`
      //   : `${backendURL}/events/`;

      await fetch(fetchURL, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          if (data.length === 0) setEventData([...[{ name: "no data" }]]);
          // else if (status !== "") setEventData([...data.filter( e => e.type===status)]);
          // else if (data.type !== "") console.log(status);
          else {
            data.forEach((data) => {
              var datePart = data.date.match(/\d+/g),
                year = datePart[0].substring(2), // get only two digits
                month = datePart[1],
                day = datePart[2];

              data.date = day + "-" + month + "-" + year;
            }, data);
            // console.log(data);
            setEventData([...data]);
          }

          // console.log("Data:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
          setEventData([...[{ name: "no data" }]]);
        });
    }
    fetchData();
  }, []);



  return (
    <FadeIn duration={500}>
      <div id="workshopPage" key={urlParams.get("type")}>
        <h2 className="section-header">Workshops</h2>

        <section id="wrapper">
          <div class="taabs_content">
            {/* <!-- taab content --> */}
            <div class="wrapper_taabcontent">
              <div class="workshop_taabcontent active_taab">
                <section className="workshop_Hero-section">
                  <div className="workshop-Card-grid">
                    {eventData
                      .filter((e) => e.type === "workshop")
                      .map(createEntry)}
                    {/* {console.log(e)} */}
                  </div>
                </section>
              </div>
            </div>
            <a href="#" id="go-to-top-button" className="">
              ^
            </a>
          </div>
        </section>
      </div>
    </FadeIn>
  );
}

export default Workshop;
