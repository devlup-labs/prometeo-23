import { useEffect } from "react";

import "./newTeam.css";
import FadeIn from "../components/fadein";
import team_data from "./team_info";
import user from "../assets/icons/user.png";
import Footer from "../components/footer";

function createSocialLinks(props) {
    return (
        <>
            {props.facebook && (
                <a href={props.facebook} target="_blank">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="48"
                        height="48"
                        viewBox="0 0 48 48"
                        className="team-social-icon team-facebook"
                    >
                        <linearGradient
                            id="Ld6sqrtcxMyckEl6xeDdMa_uLWV5A9vXIPu_gr1"
                            x1="9.993"
                            x2="40.615"
                            y1="9.993"
                            y2="40.615"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop offset="0" stopColor="#2aa4f4"></stop>
                            <stop offset="1" stopColor="#007ad9"></stop>
                        </linearGradient>
                        <path
                            fill="url(#Ld6sqrtcxMyckEl6xeDdMa_uLWV5A9vXIPu_gr1)"
                            d="M24,4C12.954,4,4,12.954,4,24s8.954,20,20,20s20-8.954,20-20S35.046,4,24,4z"
                        ></path>
                        <path
                            fill="#fff"
                            d="M26.707,29.301h5.176l0.813-5.258h-5.989v-2.874c0-2.184,0.714-4.121,2.757-4.121h3.283V12.46 c-0.577-0.078-1.797-0.248-4.102-0.248c-4.814,0-7.636,2.542-7.636,8.334v3.498H16.06v5.258h4.948v14.452 C21.988,43.9,22.981,44,24,44c0.921,0,1.82-0.084,2.707-0.204V29.301z"
                        ></path>
                    </svg>
                </a>
            )}
            {props.instagram && (
                <a href={props.instagram} target="_blank">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="102"
                        height="102"
                        viewBox="0 0 102 102"
                        className="team-social-icon team-instagram"
                    >
                        <defs>
                            <radialGradient
                                id="a"
                                cx="6.601"
                                cy="99.766"
                                r="129.502"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop offset=".09" stopColor="#fa8f21" />
                                <stop offset=".78" stopColor="#d82d7e" />
                            </radialGradient>
                            <radialGradient
                                id="b"
                                cx="70.652"
                                cy="96.49"
                                r="113.963"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop
                                    offset=".64"
                                    stopColor="#8c3aaa"
                                    stopOpacity="0"
                                />
                                <stop offset="1" stopColor="#8c3aaa" />
                            </radialGradient>
                        </defs>
                        <path
                            fill="url(#a)"
                            d="M25.865,101.639A34.341,34.341,0,0,1,14.312,99.5a19.329,19.329,0,0,1-7.154-4.653A19.181,19.181,0,0,1,2.5,87.694,34.341,34.341,0,0,1,.364,76.142C.061,69.584,0,67.617,0,51s.067-18.577.361-25.14A34.534,34.534,0,0,1,2.5,14.312,19.4,19.4,0,0,1,7.154,7.154,19.206,19.206,0,0,1,14.309,2.5,34.341,34.341,0,0,1,25.862.361C32.422.061,34.392,0,51,0s18.577.067,25.14.361A34.534,34.534,0,0,1,87.691,2.5a19.254,19.254,0,0,1,7.154,4.653A19.267,19.267,0,0,1,99.5,14.309a34.341,34.341,0,0,1,2.14,11.553c.3,6.563.361,8.528.361,25.14s-.061,18.577-.361,25.14A34.5,34.5,0,0,1,99.5,87.694,20.6,20.6,0,0,1,87.691,99.5a34.342,34.342,0,0,1-11.553,2.14c-6.557.3-8.528.361-25.14.361s-18.577-.058-25.134-.361"
                            data-name="Path 16"
                        />
                        <path
                            fill="url(#b)"
                            d="M25.865,101.639A34.341,34.341,0,0,1,14.312,99.5a19.329,19.329,0,0,1-7.154-4.653A19.181,19.181,0,0,1,2.5,87.694,34.341,34.341,0,0,1,.364,76.142C.061,69.584,0,67.617,0,51s.067-18.577.361-25.14A34.534,34.534,0,0,1,2.5,14.312,19.4,19.4,0,0,1,7.154,7.154,19.206,19.206,0,0,1,14.309,2.5,34.341,34.341,0,0,1,25.862.361C32.422.061,34.392,0,51,0s18.577.067,25.14.361A34.534,34.534,0,0,1,87.691,2.5a19.254,19.254,0,0,1,7.154,4.653A19.267,19.267,0,0,1,99.5,14.309a34.341,34.341,0,0,1,2.14,11.553c.3,6.563.361,8.528.361,25.14s-.061,18.577-.361,25.14A34.5,34.5,0,0,1,99.5,87.694,20.6,20.6,0,0,1,87.691,99.5a34.342,34.342,0,0,1-11.553,2.14c-6.557.3-8.528.361-25.14.361s-18.577-.058-25.134-.361"
                            data-name="Path 17"
                        />
                        <path
                            fill="#fff"
                            d="M461.114,477.413a12.631,12.631,0,1,1,12.629,12.632,12.631,12.631,0,0,1-12.629-12.632m-6.829,0a19.458,19.458,0,1,0,19.458-19.458,19.457,19.457,0,0,0-19.458,19.458m35.139-20.229a4.547,4.547,0,1,0,4.549-4.545h0a4.549,4.549,0,0,0-4.547,4.545m-30.99,51.074a20.943,20.943,0,0,1-7.037-1.3,12.547,12.547,0,0,1-7.193-7.19,20.923,20.923,0,0,1-1.3-7.037c-.184-3.994-.22-5.194-.22-15.313s.04-11.316.22-15.314a21.082,21.082,0,0,1,1.3-7.037,12.54,12.54,0,0,1,7.193-7.193,20.924,20.924,0,0,1,7.037-1.3c3.994-.184,5.194-.22,15.309-.22s11.316.039,15.314.221a21.082,21.082,0,0,1,7.037,1.3,12.541,12.541,0,0,1,7.193,7.193,20.926,20.926,0,0,1,1.3,7.037c.184,4,.22,5.194.22,15.314s-.037,11.316-.22,15.314a21.023,21.023,0,0,1-1.3,7.037,12.547,12.547,0,0,1-7.193,7.19,20.925,20.925,0,0,1-7.037,1.3c-3.994.184-5.194.22-15.314.22s-11.316-.037-15.309-.22m-.314-68.509a27.786,27.786,0,0,0-9.2,1.76,19.373,19.373,0,0,0-11.083,11.083,27.794,27.794,0,0,0-1.76,9.2c-.187,4.04-.229,5.332-.229,15.623s.043,11.582.229,15.623a27.793,27.793,0,0,0,1.76,9.2,19.374,19.374,0,0,0,11.083,11.083,27.813,27.813,0,0,0,9.2,1.76c4.042.184,5.332.229,15.623.229s11.582-.043,15.623-.229a27.8,27.8,0,0,0,9.2-1.76,19.374,19.374,0,0,0,11.083-11.083,27.716,27.716,0,0,0,1.76-9.2c.184-4.043.226-5.332.226-15.623s-.043-11.582-.226-15.623a27.786,27.786,0,0,0-1.76-9.2,19.379,19.379,0,0,0-11.08-11.083,27.748,27.748,0,0,0-9.2-1.76c-4.041-.185-5.332-.229-15.621-.229s-11.583.043-15.626.229"
                            data-name="Path 18"
                            transform="translate(-422.637 -426.196)"
                        />
                    </svg>
                </a>
            )}
            {props.linkedin && (
                <a href={props.linkedin} target="_blank">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="48"
                        height="48"
                        viewBox="0 0 48 48"
                        className="team-social-icon team-linkedin"
                    >
                        <path
                            fill="#0288d1"
                            d="M24 4A20 20 0 1 0 24 44A20 20 0 1 0 24 4Z"
                        ></path>
                        <path
                            fill="#fff"
                            d="M14 19H18V34H14zM15.988 17h-.022C14.772 17 14 16.11 14 14.999 14 13.864 14.796 13 16.011 13c1.217 0 1.966.864 1.989 1.999C18 16.11 17.228 17 15.988 17zM35 24.5c0-3.038-2.462-5.5-5.5-5.5-1.862 0-3.505.928-4.5 2.344V19h-4v15h4v-8c0-1.657 1.343-3 3-3s3 1.343 3 3v8h4C35 34 35 24.921 35 24.5z"
                        ></path>
                    </svg>
                </a>
            )}
            {props.github && (
                <a href={props.github} target="_blank">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="48"
                        height="48"
                        viewBox="0 0 48 48"
                        className="team-social-icon team-github"
                    >
                        <path d="M44,24c0,8.96-5.88,16.54-14,19.08V38c0-1.71-0.72-3.24-1.86-4.34c5.24-0.95,7.86-4,7.86-9.66c0-2.45-0.5-4.39-1.48-5.9 c0.44-1.71,0.7-4.14-0.52-6.1c-2.36,0-4.01,1.39-4.98,2.53C27.57,14.18,25.9,14,24,14c-1.8,0-3.46,0.2-4.94,0.61 C18.1,13.46,16.42,12,14,12c-1.42,2.28-0.84,4.74-0.3,6.12C12.62,19.63,12,21.57,12,24c0,5.66,2.62,8.71,7.86,9.66 c-0.67,0.65-1.19,1.44-1.51,2.34H16c-1.44,0-2-0.64-2.77-1.68c-0.77-1.04-1.6-1.74-2.59-2.03c-0.53-0.06-0.89,0.37-0.42,0.75 c1.57,1.13,1.68,2.98,2.31,4.19C13.1,38.32,14.28,39,15.61,39H18v4.08C9.88,40.54,4,32.96,4,24C4,12.95,12.95,4,24,4 S44,12.95,44,24z"></path>
                    </svg>
                </a>
            )}
            {props.mail && (
                <a href={`mailto:${props.mail}`} target="_blank">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        data-name="Layer 1"
                        viewBox="0 0 32 32"
                        className="team-social-icon team-mail"
                    >
                        <path
                            fill="#ea4435"
                            d="M16.58,19.1068l-12.69-8.0757A3,3,0,0,1,7.1109,5.97l9.31,5.9243L24.78,6.0428A3,3,0,0,1,28.22,10.9579Z"
                        />
                        <path
                            fill="#00ac47"
                            d="M25.5,5.5h4a0,0,0,0,1,0,0v18a3,3,0,0,1-3,3h0a3,3,0,0,1-3-3V7.5a2,2,0,0,1,2-2Z"
                            transform="rotate(180 26.5 16)"
                        />
                        <path
                            fill="#ffba00"
                            d="M29.4562,8.0656c-.0088-.06-.0081-.1213-.0206-.1812-.0192-.0918-.0549-.1766-.0823-.2652a2.9312,2.9312,0,0,0-.0958-.2993c-.02-.0475-.0508-.0892-.0735-.1354A2.9838,2.9838,0,0,0,28.9686,6.8c-.04-.0581-.09-.1076-.1342-.1626a3.0282,3.0282,0,0,0-.2455-.2849c-.0665-.0647-.1423-.1188-.2146-.1771a3.02,3.02,0,0,0-.24-.1857c-.0793-.0518-.1661-.0917-.25-.1359-.0884-.0461-.175-.0963-.267-.1331-.0889-.0358-.1837-.0586-.2766-.0859s-.1853-.06-.2807-.0777a3.0543,3.0543,0,0,0-.357-.036c-.0759-.0053-.1511-.0186-.2273-.018a2.9778,2.9778,0,0,0-.4219.0425c-.0563.0084-.113.0077-.1689.0193a33.211,33.211,0,0,0-.5645.178c-.0515.022-.0966.0547-.1465.0795A2.901,2.901,0,0,0,23.5,8.5v5.762l4.72-3.3043a2.8878,2.8878,0,0,0,1.2359-2.8923Z"
                        />
                        <path
                            fill="#4285f4"
                            d="M5.5,5.5h0a3,3,0,0,1,3,3v18a0,0,0,0,1,0,0h-4a2,2,0,0,1-2-2V8.5a3,3,0,0,1,3-3Z"
                        />
                        <path
                            fill="#c52528"
                            d="M2.5439,8.0656c.0088-.06.0081-.1213.0206-.1812.0192-.0918.0549-.1766.0823-.2652A2.9312,2.9312,0,0,1,2.7426,7.32c.02-.0475.0508-.0892.0736-.1354A2.9719,2.9719,0,0,1,3.0316,6.8c.04-.0581.09-.1076.1342-.1626a3.0272,3.0272,0,0,1,.2454-.2849c.0665-.0647.1423-.1188.2147-.1771a3.0005,3.0005,0,0,1,.24-.1857c.0793-.0518.1661-.0917.25-.1359A2.9747,2.9747,0,0,1,4.3829,5.72c.089-.0358.1838-.0586.2766-.0859s.1853-.06.2807-.0777a3.0565,3.0565,0,0,1,.357-.036c.076-.0053.1511-.0186.2273-.018a2.9763,2.9763,0,0,1,.4219.0425c.0563.0084.113.0077.169.0193a2.9056,2.9056,0,0,1,.286.0888,2.9157,2.9157,0,0,1,.2785.0892c.0514.022.0965.0547.1465.0795a2.9745,2.9745,0,0,1,.3742.21A2.9943,2.9943,0,0,1,8.5,8.5v5.762L3.78,10.9579A2.8891,2.8891,0,0,1,2.5439,8.0656Z"
                        />
                    </svg>
                </a>
            )}
        </>
    );
}

function createPerson(person) {
    return (
        <div className="team-card" key={person.id}>
            <div
                className="team-profile-card team-profile-card-mobile"
                id={person.id}
                key={person.id}
            >
                <div className="team-img">
                    {person.image && <img src={person.image}></img>}
                    {!person.image && <img src={user}></img>}
                </div>
                <div className="team-bottom">
                    <div className="team-caption">
                        <div>
                            {false && <p>{person.por}</p>}
                            {/* {person.por && <p>{person.por}</p>} */}
                        </div>
                        <div className="team-social-links">
                            {createSocialLinks(person)}
                        </div>
                    </div>
                </div>
            </div>
            <h3 className="team-person-name">{person.name}</h3>
        </div>
    );
}

function createFC(person) {
    return (
        <div className="team-card-fc" key={person.id}>
            <div
                className="team-profile-card-fc team-profile-card-fc-mobile"
                id={person.id}
                key={person.id}
            >
                <div className="team-img">
                    {person.image && <img src={person.image}></img>}
                    {!person.image && <img src={user}></img>}
                </div>
                <div className="team-bottom">
                    <div className="team-caption">
                        <div>
                            {person.por && <p>{person.por}</p>}
                        </div>
                        <div className="team-social-links">
                            {createSocialLinks(person)}
                        </div>
                    </div>
                </div>
            </div>
            <h3 className="team-person-name">{person.name}</h3>
        </div>
    );
}

export default function Team() {
    useEffect(() => {
        const navBarEle = document.getElementById("navbar");
        navBarEle.style.opacity = 1;
    });

    return (
        <FadeIn duration={500}>
            <div className="team-container">
                <div className="team-header">
                    <span id="team-title">
                        Our Team<span id="team-underline"></span>
                    </span>
                    <span id="team-subtitle">
                        Meet the people behind the festival!
                    </span>
                </div>
                {team_data.map((team, index) => {
                    return (
                        <div id={team.teamName} key={index}>
                            <span>{team.teamName}</span>
                            <div className="team-main">
                                {team.members.map((person) => {
                                    if (team.teamName === "Festival Chiefs")
                                        return createFC(person);
                                    else return createPerson(person);
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </FadeIn>
    );
}
