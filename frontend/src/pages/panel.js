import "./panel.css";

import FadeIn from "../components/fadein";
import { useEffect, useState, useRef, useReducer } from "react";
import { backendURL } from "../backendURL";

import panel_data from "./panel_info";
// import user from "../../assets/icons/user.png";

function CreatePerson(person) {
  return (
    <div className="panel-card" key={person.id}>
      <div
        className="panel-profile-card panel-profile-card-mobile"
        id={person.id}
        key={person.id}
      >
        <div className="panel-img">
          {person.image && (
            <img
              src={`${person.image.replace(
                "0.0.0.0:8888",
                "apiv.prometeo.in"
              )}`}
            ></img>
          )}
        </div>
      </div>
      <h3 className="panel-person-name">
        {person.name}
        <p className="panel-por">{person.description}</p>
      </h3>
    </div>
  );
}
function PanelDiscussion() {
  const [panelData, setPanelData] = useState([]);
  useEffect(
    // when the component has rendered then add the event listener to it
    () => {
      const navBarEle = document.getElementById("navbar");
      navBarEle.style.opacity = 1;
    },
    []
  );
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

      await fetch(`${backendURL}/events/?type=panel_discussion`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          setPanelData([...data]);
          console.log(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
    fetchData();
  }, []);

  return (
    <FadeIn duration={500}>
      <section class="panel-dark">
        <div class="container">
          <div class="panel-title">
            <h2>Panel Discussion</h2>
          </div>
          <article class="panel blue" data-aos="fade-up">
            <div class="panel__text">
              <h1 class="panel__title blue">
                Healthy, Economically wealthy & Evolutionaly wise
              </h1>
              <div class="panel__bar"></div>
              <p>20-22 Jan, 2023</p>
              <div class="panel__preview-txt">
                Origin to infinity is the theme that is inspired from the
                thinking of understanding and innovating everything ranging from
                zero to infinity. Origin is where we began from and infinity is
                where we have to reach till after crossing over a number of
                horizons. Right from the beginning we have been taught health is
                wealth and thus innovating and developing in that field is
                extremely necessary. There is no future without good health. One
                health focuses on integrating the health of individuals, animals
                and the environment around us. But will we be able to maintain
                our health along with animals and everything around us, i.e. One
                health intact till infinity is a point of concern that we need
                to ponder. <br />
              </div>
              <div className="panelist">Panelists</div>
              {/* {console.log(panelData)} */}
              <div>
                <div className="panel-main">
                  {panelData.map((person) => {
                    if (person.designation === null)
                      return CreatePerson(person);
                  })}
                </div>
                <div className="moderator">Moderator</div>
                <div className="panel-main">
                  {panelData.map((person) => {
                    if (person.designation === "Moderator")
                      return CreatePerson(person);
                  })}
                </div>
                {/* {panelData.designation === "Moderator" ? (
                      <div className="panel-main">
                        {panelData.map((person) => {
                          return CreatePerson(person);
                        })}
                      </div>
                    ) : (
                      ""
                    )} */}
              </div>
            </div>
          </article>
        </div>
      </section>
    </FadeIn>
  );
}

export default PanelDiscussion;
