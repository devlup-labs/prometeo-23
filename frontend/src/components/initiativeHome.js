import { useEffect } from "react";
import { Link } from "react-router-dom";

import "./initiativeHome.css";

// import initiativePageImg from "../assets/homePage/umang.png";
import initiativePageImg from "../assets/homePage/newumang0.png";

export default function InitiativeHome() {
    return (
      <div id="initiativeHome-container">
        <div id="initiativeHome">
          <div id="initiativeHome-title">
            <div id="initiativeHome-subheading">RADICAL SOCIAL INITIATIVE</div>
            <div id="initiativeHome-heading">UMANG</div>
          </div>
          <div id="initiativeHome-bottom-section">
            <div id="initiativeHome-description">
              {/* lorem 100 */}
              In this edition of Prometeo, we present to you "UMANG," it is the
              futuristic radical social project of Prometeo 23 with the goal of
              curating, fostering, and sponsoring up to three moonshot concepts
              ( which aim to resolve essential issues ) picked from Prometeo's
              events. We will keep in touch with the ideators, and they will be
              expected to demonstrate the status of their enterprises in the
              next Prometeo edition. Through this event we also aim to engender
              moonshot culture in the students.
            </div>

            <div id="initiativeHome-image">
              <img
                id="initiativeHome-image-img"
                src={initiativePageImg}
                alt="image"
              />
            </div>
          </div>
        </div>
      </div>
    );
}

{
    /* </div> */
}
{
    /* <div id="initiativeHome-left-section-links">
                        <Link to="/initiative">
                            <button
                                id="preregister-button"
                                className="button-29"
                            >
                                View More
                            </button>
                        </Link>
                    </div> */
}
