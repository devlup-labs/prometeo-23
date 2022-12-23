import { Link } from "react-router-dom";

import "./eventHome.css";

import eventPageImg from "../assets/backgrounds/roboguy.jpg";

import img1 from "../assets/homePage/technical.jpg";
import img2 from "../assets/homePage/informal.jpg";
import img3 from "../assets/homePage/entre.jpg";

export default function EventHome() {
    return (
        <div id="eventHome-container">
            <img id="eventHome-image-img" src={eventPageImg} alt="bgImage" />
            <div id="eventHome">
                {/* <div id="eventHome-left-section">
                </div> */}
                <div id="eventHome-right-section">
                    <div id="eventHome-title">
                        EVENTS
                        <div id="eventHome-hr"></div>
                    </div>
                    <div id="eventHome-eventCircles">
                        <Link
                            to={{
                                pathname: "/events",
                                search: "?type=technical",
                            }}
                            id="eventHome-eventCircle1"
                        >
                            <div className="eventHome-eventCircle-gradient">
                                <span>Technical Events</span>
                            </div>
                            <img src={img1} alt="Technical Events" />
                            {/* <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <pattern id="img1" patternUnits="userSpaceOnUse" width="100%" height="100%">
                                        <image href={img1} x="0" y="0" width="100%" height="100%" />
                                    </pattern>
                                </defs>
                                <path fill="url('#img1')" d="M22.5,-39.9C32.4,-33.3,46,-33.8,57.5,-28.4C69,-22.9,78.6,-11.4,77.4,-0.7C76.3,10.1,64.4,20.2,57,32.8C49.5,45.3,46.4,60.2,37.7,65.9C28.9,71.7,14.4,68.3,1,66.6C-12.5,64.9,-25,65,-39,62.2C-53,59.5,-68.4,54,-70.6,43.1C-72.7,32.3,-61.5,16.1,-55.1,3.7C-48.7,-8.8,-47.1,-17.5,-47,-31.8C-46.8,-46,-48.1,-65.8,-40.5,-73.7C-32.9,-81.6,-16.5,-77.7,-5.1,-68.9C6.3,-60.1,12.6,-46.4,22.5,-39.9Z" transform="translate(100 100)" />
                            </svg> */}
                        </Link>
                        <Link
                            to={{
                                pathname: "/events",
                                search: "?type=entrepreneurial",
                            }}
                            id="eventHome-eventCircle3"
                        >
                            <div className="eventHome-eventCircle-gradient">
                                <span>Entrepreneurial Events</span>
                            </div>
                            <img src={img3} alt="Entrepreneurial Events" />
                        </Link>
                        <Link
                            to={{
                                pathname: "/events",
                                search: "?type=informal",
                            }}
                            id="eventHome-eventCircle2"
                        >
                            <div className="eventHome-eventCircle-gradient">
                                <span>Informals</span>
                            </div>
                            <img src={img2} alt="Informal Events" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
