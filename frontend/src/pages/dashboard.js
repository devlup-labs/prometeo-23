import { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

import "./dashboard.css";

import { backendURL } from "../backendURL";
import AuthContext from "../context/AuthContext";
import useAxios from "../context/context_useAxios";

import rocketImg from "../assets/icons/rocket.png";
import PrometeoLogo from "../assets/homePage/prometeo-updated.png";
import { Navigate } from "react-router-dom";

import ticket1 from "../assets/ticket1.png";
import ticket2 from "../assets/ticket2.png";
import ticket3 from "../assets/ticket3.png";
import ticket4 from "../assets/ticket4.png";

const eventImages = {
    Robowars:
        "https://i0.wp.com/roboticsindia.live/wp-content/uploads/2021/03/SAVE_20210324_194657.jpg",
};

const test = {
    robowars: {
        event_name: "Robowars",
        team_id: "RW232525",
    },
};

function Dashboard() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({});
    const [registeredEvents, setRegisteredEvents] = useState({});
    const { user, logoutUser } = useContext(AuthContext);
    // console.log("User(dashboard):", user)
    const api = useAxios();

    useEffect(() => {
        const navBarEle = document.getElementById("navbar");
        navBarEle.style.opacity = 1;
    });

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await api.post(
                    `${backendURL}/logindashboard/`,
                    {
                        email: user.email,
                    }
                );

                if (response.status === 200) {
                    const data = response.data;
                    // console.log("Login Dashboard Data:", data);
                    if (data.isProfileCompleted === false) {
                        navigate("/complete-profile");
                    } else {
                        setUserData({
                            ...data,
                        });
                    }
                } else {
                    throw response.statusText;
                }
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await api.get(`${backendURL}/checkteamrw/`);

                if (response.status === 200) {
                    //   console.log(response.data);
                    let data = response.data;
                    // console.log("Check Team RW:", data.team_name);
                    if (data.team_name) {
                        // setRegisteredEvents({
                        // 	...registeredEvents,
                        // 	"Robowars": data,
                        // });
                        setRegisteredEvents((registeredEvents) => {
                            return {
                                ...registeredEvents,
                                Robowars: data,
                            };
                        });
                    }
                    //   if (data.team_name) {
                    //     // setTeamName(data.team_name);
                    //     // hide buttons
                    //     document.getElementById("rw-create-button").style.display = "none";
                    //     document.getElementById("rw-join-button").style.display = "none";
                    //     if (data.team_leader === true) {
                    //       document.getElementById("rw-pay-button").style.display = "block";
                    //       document.getElementById("rw-info").innerHTML = "Your Team is <strong>" + data.team_name + "</strong>. Payment will be available soon.";
                    //     }
                    //     else {
                    //       document.getElementById("rw-pay-button").style.display = "none";
                    //       document.getElementById("rw-info").innerHTML = "Your Team is <strong>" + data.team_name + "</strong>.";
                    //     }
                    //   }
                    //   else {
                    //     document.getElementById("rw-create-button").style.display = "block";
                    //     document.getElementById("rw-join-button").style.display = "block";
                    //     document.getElementById("rw-pay-button").style.display = "none";
                    //     document.getElementById("rw-info").innerHTML = "You are not in a team yet.";
                    //   }
                } else {
                    throw response.statusText;
                }
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await api.get(`${backendURL}/getmyevents/`);

                if (response.status === 200) {
                    // console.log(response.data);
                    let data = response.data;
                    data.forEach((event) => {
                        event.image = "https://apiv.prometeo.in" + event.image;
                        setRegisteredEvents((registeredEvents) => {
                            return {
                                ...registeredEvents,
                                [event.name]: event,
                            };
                        });
                    });
                } else {
                    throw response.statusText;
                }
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        if (userData) {
            // console.log(userData);
            if (userData.pass_type === 1) {
                document.getElementById("dashboard-pass-container").style.background =
                    "url(" + ticket2 + ")";
                document.getElementById("dashboard-pass-container").style.backgroundSize = "contain";
                // document.getElementById(
                //     "dashboard-pass-container-right-content-pass-status-value"
                // ).style.color = "#ffbb00";
            }
            else if (userData.pass_type === 2) {
                document.getElementById("dashboard-pass-container").style.backgroundImage =
                    "url(" + ticket3 + ")";
                document.getElementById("dashboard-pass-container").style.backgroundSize = "contain";
                // document.getElementById(
                //     "dashboard-pass-container-right-content-pass-status-value"
                // ).style.color = "#000000";
            }
            else if (userData.pass_type === 3) {
                document.getElementById("dashboard-pass-container").style.backgroundImage =
                    "url(" + ticket4 + ")";
                document.getElementById("dashboard-pass-container").style.backgroundSize = "contain";
                // document.getElementById(
                //     "dashboard-pass-container-right-content-pass-status-value"
                // ).style.color = "#ffbb00";
                // document.getElementById(
                //     "dashboard-pass-container-right-content-pass-status-value"
                // ).style.textShadow = "0 0 8px rgb(0, 0, 0);";
            }
            else {
                document.getElementById("dashboard-pass-container").style.backgroundImage =
                    "url(" + ticket1 + ")";
                document.getElementById("dashboard-pass-container").style.backgroundSize = "contain";
                // document.getElementById(
                //     "dashboard-pass-container-right-content-pass-status-value"
                // ).style.color = "#ffbb00";
            }
        }
    }, [userData]);

    const [accPass, setAccPass] = useState(false);

    useEffect(() => {
        // perform get request to check if user is already registered
        async function fetchData() {
            try {
                // console.log("Fetching data for user:", user.email);
                const response = await api.get(
                    `${backendURL}/accomodationpasses/?user=${user.user_id}`
                );
                if (response.status === 200) {
                    let data = response.data;
                    // console.log(data);
                    if (data.length > 0) {
                        setAccPass(true);
                    }
                } else {
                    // console.log(response)
                    // toast.error("Error: " + response.statusText);
                }
            } catch (error) {
                console.log("Error:", error);
            }
        }

        if (user !== null) {
            // console.log("Fetching data for user:", user.email)
            fetchData();
        } else {
            // document.getElementById("acc-success").style.display = "none";
        }
    }, []);

    return (
        <div id="dashboard-container">
            <div id="dashboard">
                <div id="dashboard-top">
                    <div id="dashboard-top-left">Dashboard</div>
                    <div id="dashboard-top-right" onClick={logoutUser}>
                        Logout
                    </div>
                </div>
                <div id="dashboard-pass-and-details">
                    <div id="dashboard-personalDetails">
                        <div id="dashboard-personalDetails-title">
                            Personal Details
                        </div>
                        <div id="dashboard-personalDetails-content">
                            <div className="dashboard-personalDetails-content-title">
                                Name:{" "}
                                <span className="dashboard-personalDetails-content-value">
                                    {user.username.replace("_", " ")}
                                </span>
                            </div>
                            <div className="dashboard-personalDetails-content-title">
                                Email:{" "}
                                <span className="dashboard-personalDetails-content-value">
                                    {user.email}
                                </span>
                            </div>
                            {userData.contact && (
                                <div className="dashboard-personalDetails-content-title">
                                    Phone:{" "}
                                    <span className="dashboard-personalDetails-content-value">
                                        {userData.contact}
                                    </span>
                                </div>
                            )}
                        </div>
                        {userData.ambassador && (
                            <div id="dashboard-caDetails">
                                <div id="dashboard-caDetails-title">
                                    Campus Ambassdor Status
                                </div>
                                <div id="dashboard-caDetails-content">
                                    <div className="dashboard-caDetails-content-title">
                                        Invite code:{" "}
                                        <span className="dashboard-caDetails-content-value">
                                            {userData.invite_referral}
                                        </span>
                                        <svg
                                            className="fa fa-copy"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 512 512"
                                            onClick={() => {
                                                navigator.clipboard.writeText(
                                                    userData.invite_referral
                                                );
                                                toast.info(
                                                    "Copied to clipboard",
                                                    {
                                                        position:
                                                            "bottom-right",
                                                    }
                                                );
                                            }}
                                        >
                                            <path d="M502.6 70.63l-61.25-61.25C435.4 3.371 427.2 0 418.7 0H255.1c-35.35 0-64 28.66-64 64l.0195 256C192 355.4 220.7 384 256 384h192c35.2 0 64-28.8 64-64V93.25C512 84.77 508.6 76.63 502.6 70.63zM464 320c0 8.836-7.164 16-16 16H255.1c-8.838 0-16-7.164-16-16L239.1 64.13c0-8.836 7.164-16 16-16h128L384 96c0 17.67 14.33 32 32 32h47.1V320zM272 448c0 8.836-7.164 16-16 16H63.1c-8.838 0-16-7.164-16-16L47.98 192.1c0-8.836 7.164-16 16-16H160V128H63.99c-35.35 0-64 28.65-64 64l.0098 256C.002 483.3 28.66 512 64 512h192c35.2 0 64-28.8 64-64v-32h-47.1L272 448z" />
                                        </svg>
                                    </div>
                                    <div className="dashboard-caDetails-content-title">
                                        Registrations:{" "}
                                        <span className="dashboard-caDetails-content-value">
                                            {userData.ca_count}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div id="dashboard-pass">
                        <div id="dashboard-pass-container"></div>
                    </div>
                </div>
                <div id="dashboard-registeredEvents">
                    <div id="dashboard-registeredEvents-title">
                        Registered Events
                    </div>
                    <div id="dashboard-registeredEvents-content">
                        {Object.keys(registeredEvents).length > 0 ? (
                            // console.log(registeredEvents),
                            Object.keys(registeredEvents).map((key, index) => {
                                // console.log(registeredEvents[key], key)
                                return (
                                    <div
                                        className="dashboard-registeredEvents-content-event"
                                        key={index}
                                    >
                                        <div className="dashboard-registeredEvents-content-event-image">
                                            <img
                                                src={
                                                    registeredEvents[key].image
                                                        ? registeredEvents[key]
                                                              .image
                                                        : eventImages[key]
                                                }
                                                alt="Event Image"
                                            />
                                        </div>
                                        <div className="dashboard-registeredEvents-content-event-details">
                                            {/* {registeredEvents[key]
                                                .event_name && ( */}
                                            <div className="dashboard-registeredEvents-content-event-title">
                                                {key}
                                            </div>
                                            {/* )} */}
                                            {registeredEvents[key].date && (
                                                <div className="dashboard-registeredEvents-content-event-date">
                                                    {registeredEvents[key].date}
                                                </div>
                                            )}
                                            {registeredEvents[key]
                                                .team_name && (
                                                <div className="dashboard-registeredEvents-content-event-team-id">
                                                    Team Name:{" "}
                                                    <strong
                                                        onClick={() => {
                                                            navigator.clipboard.writeText(
                                                                registeredEvents[
                                                                    key
                                                                ].team_name
                                                            );
                                                            toast.info(
                                                                "Copied to clipboard",
                                                                {
                                                                    position:
                                                                        "bottom-right",
                                                                }
                                                            );
                                                        }}
                                                    >
                                                        {
                                                            registeredEvents[
                                                                key
                                                            ].team_name
                                                        }
                                                    </strong>
                                                </div>
                                            )}
                                            {/* view more button */}
                                            {key === "Robowars" && (
                                                <div className="dashboard-registeredEvents-content-event-view-more">
                                                    <Link
                                                        to="/robowars"
                                                        className="dashboard-registeredEvents-content-event-view-more-button"
                                                    >
                                                        View More
                                                    </Link>
                                                </div>
                                            )}
                                            {key === "Drone Race" && (
                                                <div className="dashboard-registeredEvents-content-event-view-more">
                                                    <Link
                                                        to="/dronerace"
                                                        className="dashboard-registeredEvents-content-event-view-more-button"
                                                    >
                                                        View More
                                                    </Link>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div id="dashboard-registeredEvents-noEvent">
                                Please check your UnStop account!
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
