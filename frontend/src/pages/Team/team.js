import React from "react";
import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
// 1) first install npm install bootstrap
// 2) Put any other imports below so that CSS from your components takes precedence over default styles.
import "./team.css";
import FadeIn from "../../components/fadein";
import team_data from "./team_info";
import mail from "../../assets/icons/mail.png";

function createEntry(team) {
    return (
        <Entry
            id={team.id}
            image={team.image}
            name={team.name}
            por={team.por}
            mail={team.mail}
        />
    );
}

function Entry(props) {
    return (
        <div className="col-sm-6 col-lg-4 col-xl-3">
            <div className="single-person">
                <div className="person-image">
                    <img className="card-image" src={props.image} alt="" />
                    <a href={`mailto: ${props.mail}`}>
                        <span class="icon blueCircle">
                            <i class="fab fa-html5">
                                <img
                                    id="mail-icon"
                                    src={mail}
                                    alt="Email"
                                ></img>
                            </i>
                        </span>
                    </a>
                </div>
                <div className="person-info">
                    <h3 className="full-name">{props.name}</h3>
                    <span className="speciality">{props.por}</span>
                </div>
            </div>
        </div>
    );
}

function createTeam(props) {
    return (
        <>
            <h2 className="team-title">{props.teamName}</h2>
            <div className="row justify-content-center text-center">
                {props.team.map(createEntry)}
            </div>
        </>
    );
}

function Team(props) {
    useEffect(() => {
        const navBarEle = document.getElementById("navbar");
        navBarEle.style.opacity = 1;
        // document.body.style.overflow = "auto";
    });
    return (
        <FadeIn duration={500}>
            <section className="section-team">
                <div className="container">
                    {/* <!-- Start Header Section --> */}
                    <div className="row justify-content-center text-center">
                        <div className="col-md-8 col-lg-6">
                            <div className="header-section">
                                <h2 className="title">Our Team </h2>
                                <h2 className="small-title">
                                    Meet the people behind the festival!
                                </h2>
                                <br />
                            </div>
                        </div>
                    </div>
                    {/* End header */}
                    {/* map all teams to createTeam */}
                    {team_data.map(createTeam)}
                </div>
            </section>
        </FadeIn>
    );
}

export default Team;
