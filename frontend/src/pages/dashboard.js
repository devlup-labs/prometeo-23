import { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

import "./dashboard.css";

import { backendURL } from "../backendURL";
import AuthContext from "../context/AuthContext";
import useAxios from "../context/context_useAxios";

import rocketImg from "../assets/icons/rocket.png";
// import PrometeoLogo from "../assets/homePage/prometeo-updated.png";
import { Navigate } from "react-router-dom";
import domtoimage from "dom-to-image";
import PrometeoLogo from "../assets/homePage/prometeo-updated2.png";
import Gmap from "../assets/homePage/maps.png";
import passBg from "../assets/homePage/pass_bg2.jpg";
import downIcon from "../assets/homePage/download_icon.png";
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

    let maxNameLen = 10;
    // if (user.username[0] === 'P') {
    //     user.username = "Test " + user.username
    // }
    user.username.split('_').forEach((name) => {
        name.split(' ').forEach((n) => {
            maxNameLen = Math.max(maxNameLen, n.length)
        })
    })

    // if (user.email[0] === 't') {
    //     user.email = "abc " + user.email;
    // }

    let emailLength = 10;
    emailLength = Math.max(emailLength, user.email.split('@')[0].length)
    emailLength = Math.max(emailLength, user.email.split('@')[1].length + 1)
    // console.log("MaxNameLen:", maxNameLen, " emailLength:", emailLength, " ", window.innerWidth)

    // console.log("User(dashboard):", user)
    const api = useAxios();

    var tickets = [ticket1, ticket2, ticket3, ticket4]

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

    function load(src) {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.addEventListener("load", resolve);
            image.addEventListener("error", reject);
            image.src = src;
        });
    }

    const [ticketLoaded, setTicketLoaded] = useState(false);

    // useEffect(() => {
    //     // if (userData) {
    //     // console.log(userData);
    //     // if (userData.pass_type === 0) {
    //     load(ticket1).then(() => {
    //         document.getElementById(
    //             "dashboard-pass-container"
    //         ).style.background = "url(" + ticket1 + ")";
    //         document.getElementById(
    //             "dashboard-pass-container"
    //         ).style.backgroundSize = "contain";
    //         setTicketLoaded(true);
    //     });
    //     if (userData.pass_type === 1) {
    //         load(ticket2).then(() => {
    //             document.getElementById(
    //                 "dashboard-pass-container"
    //             ).style.background = "url(" + ticket2 + ")";
    //             document.getElementById(
    //                 "dashboard-pass-container"
    //             ).style.backgroundSize = "contain";
    //             setTicketLoaded(true);
    //         });
    //     } else if (userData.pass_type === 2) {
    //         load(ticket3).then(() => {
    //             document.getElementById(
    //                 "dashboard-pass-container"
    //             ).style.background = "url(" + ticket3 + ")";
    //             document.getElementById(
    //                 "dashboard-pass-container"
    //             ).style.backgroundSize = "contain";
    //             setTicketLoaded(true);
    //         });
    //     } else if (userData.pass_type === 3) {
    //         load(ticket4).then(() => {
    //             document.getElementById(
    //                 "dashboard-pass-container"
    //             ).style.background = "url(" + ticket4 + ")";
    //             document.getElementById(
    //                 "dashboard-pass-container"
    //             ).style.backgroundSize = "contain";
    //             setTicketLoaded(true);
    //         });
    //     }
    //     // }
    // }, [userData]);

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

    async function downloadTicket(ticket_num) {
        // if (!ticketLoaded) return;
        // domtoimage
        //     .toJpeg(document.getElementById("dashboard-pass-container"), { quality: 1 })
        //     .then(function (dataUrl) {
        //         var link = document.createElement("a");
        //         link.download = userData.registration_id + "_ticket.jpeg";
        //         link.href = dataUrl;
        //         link.click();
        //     });
        await load(tickets[ticket_num])
            .then(() => {
                domtoimage
                    .toBlob(document.getElementById("dashboard-download-ticket"))
                    .then(function (blob) {
                        var link = document.createElement("a");
                        link.download = userData.registration_id + "_ticket.png";
                        link.href = URL.createObjectURL(blob);
                        link.click();
                    });
            })
            .catch((err) => {
                console.log(err);
                throw (err)
            })
    }

    const handleDownload = (ticket_num) => {
        const myPromise = new Promise((resolve, reject) => {
            downloadTicket(ticket_num)
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                })
        })

        toast.promise(myPromise, {
            pending: "Starting download...",
            success: "Download started!",
            error: "Error downloading ticket"
        })

    }

    const [download, setDownload] = useState(false);

    useEffect(() => { }, [download]);

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
                        {
                            (userData && userData.pass_type !== 0) ? (
                                <img id="dashboard-pass-download-btn" src={downIcon} alt="Download Button" onClick={() => handleDownload(userData.pass_type)} />
                            ) : (
                                <div id="dashboard-pass-noPassPurchased">
                                    <div>
                                        You have not purchased any pass.{" "}<Link to="/buy-pass">Buy Now!</Link>
                                    </div>
                                </div>
                            )
                        }
                        <img id="dashboard-pass-image" src={passBg} alt="ticket" style={{
                            filter: `sepia(${(userData && userData.pass_type) ? 0 : 0.9}) blur(${(userData && userData.pass_type) ? 0 : 2}px)`
                        }}>
                        </img>
                        {/* without container */}
                        {/* {
								userData && userData.pass_type !== 0 && (
									<div className="dashboard-pass-registrationID">
										Registration ID: {userData.registration_id}
									</div>
								)
						} */}


                        {/* <div
                            id="dashboard-pass-container"
                            onClick={() => handleDownload(userData.pass_type)}
							style={{
								backgroundImage: `url(${userData ? tickets[userData.pass_type] : ticket1})`,
							}}
                        >
							{
								userData && userData.pass_type !== 0 && (
									<div className="dashboard-pass-registrationID">
										Registration ID: {userData.registration_id}
									</div>
								)
							}
						</div> */}
                        <div className="dashboard-pass-left-side" style={{
                            filter: `sepia(${(userData && userData.pass_type) ? 0 : 0.9}) blur(${(userData && userData.pass_type) ? 0 : 2}px)`
                        }}>
                            {/* <img id="dashboard-logo-img" src={PrometeoLogo} alt="Logo"></img> */}
                            {
                                userData && userData.pass_type !== 0 && (
                                    <div className="dashboard-pass-registrationID">
                                        <div className="registration-text">Registration ID: </div>{userData.registration_id}
                                    </div>
                                )
                            }
                            {/* {
                                user.username[0] === 'P' ? user.username = "Test " + user.username : null
                            } */}
                            <div className="pass-details">
                                <div className="middle-text" style={{
                                    fontSize: window.innerWidth > 800 ? `calc((11 / ${maxNameLen}) * 0.022 * 0.67 * 92vw)` : `calc((11 / ${maxNameLen}) * 0.022 * 92vw)`
                                }}>{user.username.replace("_", " ")}</div>
                                <div className="middle-text-mail" style={{
                                    fontSize: window.innerWidth > 800 ? `calc((10 / ${emailLength}) * 0.02 * 0.67 * 92vw)` : `calc((10 / ${emailLength}) * 0.02 * 92vw)`
                                }}>{user.email.replace('@', ' @')}</div>
                            </div>
                        </div>
                        {/* <div id="dashboard-pass-left-side"></div> */}
                        {/* linear-gradient(90deg, rgb(175 197 8 / 70%) 0%, rgb(200 128 14 / 70%) 65%, rgb(204 59 12 / 70%) 100%) center center / cover no-repeat,  */}
                        {/* <div id="dashboard-pass-right-side" style={{
                            background: "rgb(226,31,181)",
                            background: `linear-gradient(90deg, rgba(175 197 8 / 70%) 0%, rgba(200 128 14 / 70%) 65%, rgba(204 59 12 / 70%) 100%), url(https://i.pinimg.com/564x/cb/e4/2c/cbe42c0f273e6cd3acfd1de180ba5224.jpg)`,
                            background: `linear-gradient(90deg, rgba(118,133,0,0.7) 0%, rgba(121,78,9,0.7) 65%, rgba(129,37,7,0.7) 100%), url(https://i.pinimg.com/564x/cb/e4/2c/cbe42c0f273e6cd3acfd1de180ba5224.jpg)`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                            }}>
                            <h3 id="prometeo-date">20th-23rd Jan 2023</h3>
                            <div id="pass-middle-details">
                                {
                                    userData && userData.pass_type !== 0 && (
                                        <h4 className="middle-text">{user.username.replace("_", " ")}</h4>
                                    )
                                }
                                {
                                    userData && userData.pass_type !== 0 && (
                                        <h4 className="middle-text">{user.email}</h4>
                                    )
                                }
                                
                                
                            </div> */}
                        {/* <div id="pass-bottom-right">
                            <div id="location-container">
                                <h3 id="prometeo-location"><img id="dashboard-map" src={Gmap} alt="map"/> IIT Jodhpur</h3>
                            </div>
                            <h6 id="prometeo-valid">VALID TILL 23rd Jan 11:59 PM</h6>
                            </div> */}

                        {/* </div> */}


                        {/* <div id="dashboard-download-ticket-wrapper">
							<div 
								id="dashboard-download-ticket"
								style={{
									backgroundImage: `url(${userData ? tickets[userData.pass_type] : ticket1})`,
								}}
							>
								{
									userData && userData.pass_type !== 0 && (
										<div className="dashboard-pass-registrationID" style={{
											fontSize: "calc(0.0125 * 1200px * 100 / 45)",
										}}>
											Registration ID: {userData.registration_id}
										</div>
									)
								}
							</div>
						</div> */}
                    </div>
                </div>
                <div id="dashboard-download-ticket-wrapper">
                    <div 
                        id="dashboard-download-ticket"
                        style={{
                            backgroundImage: `url(${passBg})`,
                        }}
                    >
                        <div className="dashboard-pass-left-side">
                            {
                                userData && userData.pass_type !== 0 && (
                                    <div className="dashboard-pass-registrationID" style={{
                                        fontSize: "calc(0.025 * 1771px)",
                                    }}>
                                        <div className="registration-text" style={{
                                            fontSize: "calc(0.014 * 1771px)"
                                        }}>Registration ID: </div>{userData.registration_id}
                                    </div>
                                )
                            }
                            <div className="pass-details">
                                <div className="middle-text" style={{
                                    fontSize: `calc((11 / ${maxNameLen}) * 0.022 * 1771px)`,
                                }}>{user.username.replace("_", " ")}</div>
                                <div className="middle-text-mail" style={{
                                    fontSize: `calc((10 / ${emailLength}) * 0.02 * 1771px)`,
                                }}>{user.email.replace('@', ' @')}</div>
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
                                console.log(registeredEvents[key], key)
                                return (
                                    <div
                                        className="dashboard-registeredEvents-content-event"
                                        key={index}
                                    >
                                        <div className="dashboard-registeredEvents-content-event-image">
                                            <img
                                                src={
                                                    registeredEvents[key].image
                                                        ? registeredEvents[key].image
                                                        : eventImages[key]
                                                }
                                                alt="Event Image"
                                            />
                                        </div>
                                        <div className="dashboard-registeredEvents-content-event-details">
                                            {key && (
                                                <div className="dashboard-registeredEvents-content-event-title">
                                                    {key}
                                                </div>
                                            )}
                                            {registeredEvents[key].date && (
                                                <div className="dashboard-registeredEvents-content-event-date">
                                                    {registeredEvents[key].date}
                                                </div>
                                            )}
                                            {registeredEvents[key].team_name && (
                                                <div className="dashboard-registeredEvents-content-event-team-id">
                                                    Team Name:{" "}
                                                    <strong
                                                        onClick={() => {
                                                            navigator.clipboard.writeText(
                                                                registeredEvents[key].team_name
                                                            );
                                                            toast.info(
                                                                "Copied to clipboard",
                                                                {
                                                                    position: "bottom-right",
                                                                }
                                                            );
                                                        }}
                                                    >
                                                        {
                                                            registeredEvents[key].team_name
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