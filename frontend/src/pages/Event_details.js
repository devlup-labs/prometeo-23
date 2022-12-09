import React from "react";
import { useEffect } from 'react';
import "./EventDetails.css";
import event_data from "./event_info_dummy.js";
//  THIS FILE TEMPORARILY TAKES data FROM event_info_dummy.js ,MAIN FILE IS event_info.js
import FadeIn from '../components/fadein';



function createEntry(eventTerm) {
	return (
		<FadeIn duration={500}>
			<Details
				key={eventTerm.id}
				name={eventTerm.name}
				img={eventTerm.image}
				desc={eventTerm.description}
                team_size={eventTerm.max_team_size}
                prize={eventTerm.prize}
                date={eventTerm.date}
                rulebook={eventTerm.rulebook}
                sponsor={eventTerm.sponsor_image1}
			/>
		</FadeIn>
	);
}


function Details(props){
//    if(props.sponsor ===null){
//     document.getElementsByClassName("sponsor-title").style.display="none";
//    } 
   return(
        <div className="DetailsRow">
            <div className="DetailsColumn LeftColumn">
                <div className="image-box d-flex justify-content-center">
                    <div className="event-image-container">
                        <img alt="event_image"
                            className="responsive-image"
                            src={props.img}
                        ></img>
                    </div>
                </div>
                <div className="desc-links">

                    {/* <a href="" alt="register" className="individual_link">Register</a> */}
                    <form action="" className="link-form">
                        <input type="submit" value="Register" className="individual_link" />
                    </form>
                    {/* <a href="{props.rulebook}" alt="rulebook" className="individual_link">RuleBook</a> */}
                    <form action={props.rulebook} className="link-form">
                        <input type="submit" value="Rulebook" className="individual_link" />
                    </form>

                    <form action="" className="link-form contact-us ">
                        <input type="submit" value="Contact Us" className="individual_link" />
                    </form>
                </div>
                

            </div>
            <div className="DetailsColumn RightColumn">
                
                
                <div className="title-sponsor-card">
                {/* <h3 className="sponsor-title">Title Sponsor </h3> */}
                    <img src="https://store-images.s-microsoft.com/image/apps.22831.65366b28-c5ab-4d39-ac90-c216f32a7b40.4d3b9954-a5ad-45d2-8e6f-13814f1c29c1.62d5a420-2ae0-44f5-8d6d-f17213f8741c" className="title-sponsor-img" ></img>
                    <h3 className="sponsor-title">Presents</h3>
                </div>
                <div className="event-title">
                    <h1>{props.name} </h1>
                </div>

                <div className="event-other-details">
                    <h3 className="event-items">On </h3>
                    <p className="event-items event-date">{props.date}</p>
                </div>
                <div className="event-other-details ">
                    <h3 className="event-items">Prize Money </h3>
                    <p className="event-items event-prize">{props.prize}</p>
                </div>
                <br />
                

            

                

                <div className="event-other-details">
                    <h3 className="event-items">Team Size </h3>
                    <p className="event-items">{props.team_size}</p>
                </div>

                <div className="event-other-details right-detail">
                    <h3 className="event-items">Registration Fee </h3>{/*  THIS IS HARD CODED AS OF NOW */} 
                    <p className="event-items">NIL</p>
                </div>
                
                <div className="event-description">
                    {/* <h3>Description </h3> */}
                    <p>
                        {props.desc}

                    </p>
                </div>
               
            </div>
        </div>
    );
}



function EventDetails(){

    return(<div id="EventDetailsPage" className="contentDiv">
    <h2>EVENT DETAILS</h2>
    <div className="EventContent">
     {/* <Details /> */}
     {event_data.map(createEntry)}
    </div>
</div>);
}

export default EventDetails;