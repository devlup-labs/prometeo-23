import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify";

import "./dashboard.css";

import { backendURL } from "../backendURL";
import AuthContext from "../context/AuthContext";
import useAxios from "../context/context_useAxios";

import rocketImg from "../assets/icons/rocket.png";
import { Navigate } from "react-router-dom";

const registered_events = [
//     {
//         name: "Event 1",
//         date: "Date 1",
//         image: "https://cdn.dribbble.com/users/6234/screenshots/16070942/media/a810368884a6fba842788d144ff70a51.png?compress=1&resize=1000x750&vertical=top",
//     },
//     {
//         name: "Event 2",
//         date: "Date 2",
//         image: "https://cdn.dribbble.com/users/6234/screenshots/16070942/media/a810368884a6fba842788d144ff70a51.png?compress=1&resize=1000x750&vertical=top",
//     },
//     {
//         name: "Event 3",
//         date: "Date 3",
//         image: "https://cdn.dribbble.com/users/6234/screenshots/16070942/media/a810368884a6fba842788d144ff70a51.png?compress=1&resize=1000x750&vertical=top",
//     },
//     {
//         name: "Event 4",
//         date: "Date 4",
//         image: "https://cdn.dribbble.com/users/6234/screenshots/16070942/media/a810368884a6fba842788d144ff70a51.png?compress=1&resize=1000x750&vertical=top",
//     },
//     {
//         name: "Event 5",
//         date: "Date 5",
//         image: "https://cdn.dribbble.com/users/6234/screenshots/16070942/media/a810368884a6fba842788d144ff70a51.png?compress=1&resize=1000x750&vertical=top",
//     },
//     {
//         name: "Event 6",
//         date: "Date 6",
//         image: "https://cdn.dribbble.com/users/6234/screenshots/16070942/media/a810368884a6fba842788d144ff70a51.png?compress=1&resize=1000x750&vertical=top",
//     },
//     {
//         name: "Event 7",
//         date: "Date 7",
//         image: "https://cdn.dribbble.com/users/6234/screenshots/16070942/media/a810368884a6fba842788d144ff70a51.png?compress=1&resize=1000x750&vertical=top",
//     },
//     {
//         name: "Event 8",
//         date: "Date 8",
//         image: "https://cdn.dribbble.com/users/6234/screenshots/16070942/media/a810368884a6fba842788d144ff70a51.png?compress=1&resize=1000x750&vertical=top",
//     },
//     {
//         name: "Event 9",
//         date: "Date 9",
//         image: "https://cdn.dribbble.com/users/6234/screenshots/16070942/media/a810368884a6fba842788d144ff70a51.png?compress=1&resize=1000x750&vertical=top",
//     },
//     {
//         name: "Event 10",
//         date: "Date 10",
//         image: "https://cdn.dribbble.com/users/6234/screenshots/16070942/media/a810368884a6fba842788d144ff70a51.png?compress=1&resize=1000x750&vertical=top",
//     },
];

function Dashboard() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({});
    const { user, logoutUser } = useContext(AuthContext);
    console.log("User(dashboard):", user)
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
                    }
                    else {
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
                        {registered_events.length > 0 ? (
                            registered_events.map((event, index) => {
                                return (
                                    <div
                                        className="dashboard-registeredEvents-content-event"
                                        key={index}
                                    >
                                        <div className="dashboard-registeredEvents-content-event-image">
                                            <img
                                                src={event.image}
                                                alt="Event Image"
                                            />
                                        </div>
                                        <div className="dashboard-registeredEvents-content-event-details">
                                            <div className="dashboard-registeredEvents-content-event-title">
                                                {event.name}
                                            </div>
                                            <div className="dashboard-registeredEvents-content-event-date">
                                                {event.date}
                                            </div>
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
