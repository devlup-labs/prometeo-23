import { useEffect } from "react";
import { Link } from "react-router-dom";

import "./initiativeHome.css";

import initiativePageImg from "../assets/homePage/computer.png";

export default function InitiativeHome() {
    return (
        <div id="initiativeHome-container">
            <div id="initiativeHome">
                <div id="initiativeHome-left-section">
                    <div id="initiativeHome-left-section-top">
                        <div id="initiativeHome-title">
                            INITIATIVE
                        </div>
                        <div id="initiativeHome-description">
                            {/* lorem 100 */}
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Nullam auctor, nisl eget ultricies tincidunt, nunc
                            tortor lacinia nisl, nec ultricies nunc nisl nec
                            libero. Sed euismod, nisl nec tincidunt lacinia, nunc
                        </div>
                    </div>
                    <div id="initiativeHome-left-section-links">
                        <Link to="/initiative">
                            <button id="preregister-button" className="button-29">
                                View More
                            </button>
                        </Link>
                    </div>
                </div>
                <div id="initiativeHome-right-section">
                    <div id="initiativeHome-image">
                        <img id="initiativeHome-image-img" src={initiativePageImg} alt="image" />
                    </div>
                </div>
            </div>
        </div>
    );
}
