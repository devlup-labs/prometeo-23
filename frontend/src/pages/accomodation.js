import { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import "./accomodation.css";

import useAxios from "../context/context_useAxios";
import { backendURL } from "../backendURL";
import AuthContext from "../context/AuthContext";


import logo from "../assets/homePage/logo.png";

import FadeIn from "../components/fadein";
import { Navigate } from "react-router-dom";

export default function Accommodation() {


    useEffect(() => {
        const navBarEle = document.getElementById("navbar");
        navBarEle.style.opacity = 1;
        // document.body.style.overflow = "hidden";
    }, []);

    return (
        <FadeIn duration={1000}>
            <div id="acc-container">
                <div id="acc-title">
                    <div id="acc-title-text">
                         Accommodation In <span>Prometeo</span>
                    </div>

                </div>
                <div className="acc-content">
                    <div className="acc-content-title" id="acc-title-left">
                        About Us
                    </div>
                    <div className="acc-content-text acc-left">
                        <span className="acc-content-desc-left">
                        Prometeo has been an example in achieving huge feats with unparalleled figures ever since its inception in 2020. Prometeo has grown in stature in terms of its content, infrastructure and logistics. The overwhelming crowd of such a high magnitude and a world-class technological display along with a tinge of enjoyment has made our dream a technological extravaganza. With such vastness and diversity, the hospitality of the guests is of paramount importance.
                      </span>
                      <br></br>
                      <br></br>
                      <span className="acc-content-desc-left">
                      Hope to see you at Prometeo 2022-23.
                      <br></br>
                      Please visit the Freqently Asked Questions (FAQ) section for to get most of your queries resolved. 
                      </span>
                        <br></br>
                        <br></br>
                        
                       
                    </div>
                </div>
                <div className="acc-content">
                    <div className="acc-content-title" id="acc-title-right">
                        Accommodation Policies
                    </div>
                    <div className="acc-content-text acc-right">
                        <span className="acc-content-desc-right">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                             <br></br>
                             Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

                            <br></br>
                        </span>
                    </div>
                </div>


                <div className="acc-content">
                    <div className="acc-content-title" id="acc-title-right">
                        Instructions
                    </div>
                    <div className="acc-content-text acc-right">
                        <span className="acc-content-desc-right">
                        <ol>
                        <li> All guests carrying electronic items of any kind will have to declare them at the IIT Jodhpur main gate through a ‘Gate Pass’. The belongings will also be checked on the way out of IIT Jodhpur along with the ‘Gate Pass’, failing to do so will result in the belongings being impounded.
                        </li>
                        <li>All guests will be provided with mattress. Prometeo will not provide mattress cover, blankets or pillows. The guests are encouraged to arrange them on their own (if required), since the weather might get cold during the night.
                        </li>
                        <li> Any commodities issued to the guests would have to be returned in sound condition to the organisers during check-out
                        </li>
                        <li> Random checks would be made to avoid any illegal stay at the campus. Any team failing to produce their electronic/physical receipts of accommodation would be heavily fined and disqualified.
                        </li>
                        <li>Entry will be only through the 'Main Gate' of IIT Jodhpur. All other gates will be closed for entry.
                        </li>
                        <li>All guests are required to carry their valid government photo id proofs at all times. In addition, the student participants are also required to carry their valid College photo id card. Any guest failing to produce their id card will not be permitted inside the campus during Prometeo 2023.
                        </li>
                        <li>Alcohol, drugs, sharp objects and explosives of any kind are strictly prohibited inside the campus. Any other item if deemed unsafe will be prohibited. The decision of Security and Prometeo team will be final in case of any disputes.
                        </li>
                        <li>No outside vehicles will be allowed into the campus during the Prometeo 2023."
                        </li>
                        <li> All guests are required to maintain the decorum and cleanliness of the campus, and follow the rules of the campus at all times.
                        </li>
                        <br></br>
                        
                        </ol>
                        Prometeo 2023 and IIT Jodhpur will not be responsible for any mishaps that occur through the duration of stay for Prometeo 2023
                        
                        </span>
                    </div>
                </div>

                <div className="acc-content">
                    <div className="acc-content-title" id="acc-title-right">
                        FAQ's
                    </div>
                    <div className="acc-content-text acc-right">
                        <span className="acc-content-desc-right">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                             <br></br>
                             Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

                            <br></br>
                        </span>
                    </div>
                </div>

                <div className="acc-content">
                    <div className="acc-content-title" id="acc-title-right">
                        Contact Us
                    </div>
                    <div className="acc-content-text acc-right">
                        <span className="acc-content-desc-right">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                             <br></br>
                             Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

                            <br></br>
                        </span>
                    </div>
                </div>
                {/* <div className="ca-content">
                    <div className="ca-content-title">INCENTIVES</div>
                    <div className="ca-content-text ca-incentive">
                        <div className="ca-content-incentive">
                            <div className="ca-content-incentive-title silver">
                                SILVER <span>Campus Ambassador</span>
                                <div>15+ Registrations</div>
                            </div>
                            <div className="ca-content-incentive-desc">
                                <div className="ca-content-incentive-desc-item">
                                    <img
                                        className="white-shadow2"
                                        src={concert}
                                        alt="concert"
                                    />
                                    Free Accommodation and Pronite Pass
                                </div>
                                <div className="ca-content-incentive-desc-item">
                                    <img
                                        className="yellow-shadow2"
                                        src={certificate}
                                        alt="certificate"
                                    />
                                    Certificate
                                </div>
                                <div className="ca-content-incentive-desc-item">
                                    <img
                                        className="blue-shadow2"
                                        src={goodies}
                                        alt="goodies"
                                    />
                                    Goodies (T-shirt)
                                </div>
                            </div>
                        </div>
                        <div className="ca-content-incentive">
                            <div className="ca-content-incentive-title gold">
                                GOLD <span>Campus Ambassador</span>
                                <div>25+ Registrations</div>
                            </div>
                            <div className="ca-content-incentive-desc">
                                <div className="ca-content-incentive-desc-item">
                                    <img
                                        className="white-shadow2"
                                        src={concert}
                                        alt="concert"
                                    />
                                    Free Accommodation and Pronite Pass
                                </div>
                                <div className="ca-content-incentive-desc-item">
                                    <img
                                        className="yellow-shadow2"
                                        src={certificate}
                                        alt="certificate"
                                    />
                                    Certificate
                                </div>
                                <div className="ca-content-incentive-desc-item">
                                    <img src={goodies} alt="goodies" />
                                    Goodies (Hoodie, Vouchers)
                                </div>
                                <div className="ca-content-incentive-desc-item">
                                    <img
                                        className="yellow-shadow2"
                                        src={tickets}
                                        alt="workshop"
                                    />
                                    Free Entry to 1 Workshop
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}

                <div className="acc-content">
                    <div className="acc-content-title" id="acc-title-left">
                        REGISTRATION
                    </div>
                    <div className="acc-content-text acc-left">
                        <span className="acc-content-desc-left acc-register">
                            So, grab the opportunity and register ASAP!
                            
                            <button
                                id="acc-register-button"
                                className="acc-button-48"
                                // onClick={handleSubmit}
                            >
                                <span className="button-text">Register Now !</span>
                            </button>
                        </span>
                        {/* <img
                            className="acc-content-img blue-shadow acc-pr-logo"
                            src={logo}
                            alt="social-media"
                        /> */}
                    </div>
                </div>
            </div>
        </FadeIn>
    );
}
