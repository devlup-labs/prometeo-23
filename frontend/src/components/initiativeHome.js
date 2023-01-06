import { useEffect } from "react";
import { Link } from "react-router-dom";

import "./initiativeHome.css";

import initiativePageImg from "../assets/homePage/umang.png";

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
                        Prometeo's vision is to raise awareness in society
                        through social upliftment activities. We believe that it
                        is the societal responsibility of the forefront of the
                        nation to balance and empower those who are less
                        fortunate. In post, we organized blood donation drives
                        and year-long problem statements related to
                        sustainability with big prize money, Continuing this
                        legacy, In this edition of Prometeo, we aim to acquaint
                        underprivileged women to new technologies and raise
                        awareness about the heights they can achieve with the
                        help of it. We plan to collaborate with several NGOs ond
                        hold workshops for indigent children which will
                        instigate their interest towards several domains of
                        technology and inspire to pursue them.
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
