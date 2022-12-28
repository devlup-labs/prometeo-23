import { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

import "./dashboard.css";

import { backendURL } from "../backendURL";
import AuthContext from "../context/AuthContext";
import useAxios from "../context/context_useAxios";

import rocketImg from "../assets/icons/rocket.png";
import { Navigate } from "react-router-dom";

const eventImages = {
    robowars:
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

    // once user data is loaded
    useEffect(() => {
        // perform get request to check if user is registered in robowars
        async function fetchData() {
            try {
                const response = await api.post(`${backendURL}/robowars/`, {
                    user: userData.user_id,
                });

                if (response.status === 200) {
                    const data = response.data;
                    // console.log("Registered Events:", data);
                    if (data.length > 0) {
                        setRegisteredEvents({
                            ...registeredEvents,
                            Robowars: data,
                        });
                    }
                } else {
                    throw response.statusText;
                }
            } catch (err) {
                console.log(err);
            }
        }
    }, [userData]);

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
                        <div id="dashboard-pass-container">
                            <div id="dashboard-pass-left">
                                <div id="dashboard-pass-left-title">TICKET</div>
                                <div id="dashboard-pass-left-image">
                                    <img src={rocketImg} alt="pass" />
                                </div>
                            </div>
                            <div id="dashboard-pass-right">
                                <div id="dashboard-pass-right-title">
                                    {"Prometeo  '23"}
                                </div>
                                <div id="dashboard-pass-right-content">
                                    {"You have not purchased any pass :("}
                                </div>
                            </div>
                        </div>
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
                                                src={eventImages[key]}
                                                alt="Event Image"
                                            />
                                        </div>
                                        <div className="dashboard-registeredEvents-content-event-details">
                                            {registeredEvents[key]
                                                .event_name && (
                                                <div className="dashboard-registeredEvents-content-event-title">
                                                    {
                                                        registeredEvents[key]
                                                            .event_name
                                                    }
                                                </div>
                                            )}
                                            {registeredEvents[key].date && (
                                                <div className="dashboard-registeredEvents-content-event-date">
                                                    {registeredEvents[key].date}
                                                </div>
                                            )}
                                            {registeredEvents[key].team_id && (
                                                <div className="dashboard-registeredEvents-content-event-team-id">
                                                    Team ID:{" "}
                                                    <strong
                                                        onClick={() => {
                                                            navigator.clipboard.writeText(
                                                                registeredEvents[
                                                                    key
                                                                ].team_id
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
                                                            ].team_id
                                                        }
                                                    </strong>
                                                </div>
                                            )}
                                            {/* view more button */}
                                            {key === "robowars" && (
                                                <div className="dashboard-registeredEvents-content-event-view-more">
                                                    <Link
                                                        to="/robowars"
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
