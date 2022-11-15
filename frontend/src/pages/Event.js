import React, { useEffect } from "react";
import event_data from "./event_info";
import './event_page.css';

import logo from '../assets/navbar/prometeo_logo_23.png';
import FadeIn from '../components/fadein';

// function logo(url){
//    return(
//     <img src={url} alt="sponsor_logo" />
//    );
// }

function createEntry(eventTerm) {
	return (
		<FadeIn duration={500}>
			<Entry
				key={eventTerm.id}
				name={eventTerm.name}
				img={eventTerm.image}
				desc={eventTerm.description}
			/>
		</FadeIn>
	);
}

function Entry(props) {
	// console.log(props)
	return (
		<div className="event_cards">
			<li className="card" aria-labelledby="event card">
				<div className="card__filter">
					<img className="card__photo" src={props.img} alt=" The image will be displayed here shortly " />
				</div>
				<div className="card__container">
					<h2>{props.name}</h2>
					{/* <time>Friday, July 10 • 7:00PM</time> */}
					<p>{props.desc}</p>
					{/* <a className="card__location" href="https://goo.gl/maps/dsPC54CdmnE2">Coral Sky Amphitheatre</a> */}
					<div className="card__buttons">
						<a href="#" className="card__buttons btn secondary" role="button" aria-haspopup="false">
							View More
							<i className="fas fa-arrow-right"></i>
						</a>
					</div>
				</div>
			</li>
		</div>
	);
}

function Events() {
	useEffect(() => {
		const navBarEle = document.getElementById("navbar")
		navBarEle.style.opacity = 1;
		document.body.style.overflow = "auto";
	});

	return (
		<div>
			<div id="eventsPage">
				<h2 className="section-header">PAST EVENTS</h2>
				<div className="event_cards">{event_data.map(createEntry)}</div>
			</div>
		</div>
	);
}

export default Events;
