import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import event_data from "./event_info";
import "./event.css";
import "./eventsTabs.css";

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
const tabsName = [
  {
    name: "Technical",
    id: "Technical_events",
    data_content: "Technical_events",
    data_title: "Technical events",
    status: "technical",
  },
  {
    name: "Entrepreneurial",
    id: "Entrepreneurial_events",
    data_content: "Entrepreneurial_events",
    data_title: "Entrepreneurial events",
    status: "entrepreneurial",
  },
  {
    name: "Tech Carnival",
    id: "Tech_Carnival",
    data_content: "Tech_Carnival",
    data_title: "Tech Carnival",
    status: "exhibition",
  },
  {
    name: "Workshops",
    id: "Workshops",
    data_content: "Workshops",
    data_title: "Workshops",
    status: "workshop",
  },
  {
    name: "Informals",
    id: "Informals_events",
    data_content: "Informals_events",
    data_title: "Informals_events",
    status: "informal",
  },
  {
    name: "Poster Presentation",
    id: "Poster_Presentation",
    data_content: "Poster_Presentation",
    data_title: "Poster Presentation",
    status: "poster_presentation",
  },
  {
    name: "Panel Discussion",
    id: "Panel_Discussion",
    data_content: "Panel_Discussion",
    data_title: "Panel Discussion",
    status: "panel_discussion",
  },
];
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

function Events() {
  const [urlParams] = useSearchParams();
  // console.log("Type: ", urlParams.get("type"));

  const [eventData, setEventData] = useState([]);

    const [status, setStatus] = useState("");
    // const [DataTransferItemList, setDatalist]= useState(data);
    const setStatusFilter = (status) => {
      setStatus(status);
    };
    // console.log(status);

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
        if (status !== "")
      await fetch(fetchURL, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.length === 0) setEventData([...[{ name: "no data" }]]);
          else if (status !== "") setEventData([...data.filter( e => e.type===status)]);
          // else if (data.type !== "") console.log(status);
          else setEventData([...data]);

          // console.log("Data:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
          setEventData([...[{ name: "no data" }]]);
        });
    }
    fetchData();
  }, [urlParams,status]);

  // tabs

  var tabLinks = document.querySelectorAll(".taablinks");
  // var tabContent = document.querySelectorAll(".taabcontent");

  tabLinks.forEach(function (el) {
    el.addEventListener("click", openTabs);
  });

  function openTabs(el) {
    var btnTarget = el.currentTarget;
    var country = btnTarget.dataset.country;

    // tabContent.forEach(function (el) {
    //   el.classList.remove("active_taab");
    // });

    tabLinks.forEach(function (el) {
      el.classList.remove("active_taab");
    });

    document.querySelector("#" + country).classList.add("active_taab");

    btnTarget.classList.add("active_taab");
  }


  return (
    <FadeIn duration={500}>
      <div id="eventsPage" key={urlParams.get("type")}>
        {/* <h2 className="section-header">
          {urlParams.get("type")
            ? eventTypeToName[urlParams.get("type")]
            : "Events"}
        </h2> */}

        <section id="wrapper">
          <div class="taabs_content">
            {/* <!-- taab links --> */}
            <div class="taabs">
              {tabsName.map((item, index) => (
                <button
                  id={item.id}
                  class="taablinks"
                  // style={[status === item.status && styles.active]}
                  data-country={item.data_content}
                  onClick={() => setStatusFilter(item.status)}
                >
                  <p data-title={item.data_title}>{item.name}</p>
                </button>
              ))}
            </div>

            {/* <!-- taab content --> */}
            <div class="wrapper_taabcontent">
              <div class="taabcontent active_taab">
                <p>
                  <section className="event_Hero-section">
                    {eventData.length > 0 ? (
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
                      <div className="event_Card-coming-soon">Loading...</div>
                    )}
                  </section>
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* <section className="event_Hero-section">
          {eventData.length > 0 ? (
            <div className="event_Card-grid">{eventData.map(createEntry)}</div>
          ) : (
            <div className="event_Card-coming-soon">Coming Soon!</div>
          )}
        </section> */}
        {/* <div className="event_cards">{event_data.map(createEntry)}</div> */}
        {/* <Footer /> */}
      </div>
    </FadeIn>
  );
}

export default Events;
