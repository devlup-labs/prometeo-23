import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import event_data from "./event_info";
import "./event_page.css";

import logo from "../assets/navbar/prometeo_logo_23.png";
import FadeIn from "../components/fadein";
import { backendURL } from "../backendURL";

// function logo(url){
//    return(
//     <img src={url} alt="sponsor_logo" />
//    );
// }

const eventTypeToName = {
	"live": "Live Events",
	"technical": "Technical Events",
	"informal": "Informal Events",
	"entrepreneurial": "Entrepreneurial Events",
	"workshop": "Workshops",
	"poster_presentation": "Poster Presentation",
	"panel_discussion": "Panel Discussion",
	"exhibition": "Exhibition",
}

function createEntry(eventTerm) {
	if (
		eventTerm.name !== "Tedx"
		&& eventTerm.type !== "talk" 
	) {
		return (
			<Entry
				key={eventTerm.id}
				name={eventTerm.name}
				img={eventTerm.image.replace("0.0.0.0:8888", "apiv.prometeo.in")}
				prize={eventTerm.prize}
				date={eventTerm.date}
			/>
		)
	}
	else return null;
}

function Entry(props) {
	// console.log(props)
	return (
		<a className="event_Card" href="#">
			<div
				className="event_Card-background"
				style={{
					backgroundImage: `url(${props.img})`,
				}}
			>
				{/*  <div class="blue_layer"></div>     blue layer on hover*/}
			</div>
			<div className="event_Card-content">
				{/* <div className="card"></div> */}
				<h3 className="event_Card-heading">{props.name}</h3>

				<div className="event_Card-info">
					<h1 className="event_Card-date">{props.date}</h1>
					{
						(props.prize && props.prize !== "NA") && 
						<h3 className="event_Card-prize">Prize {props.prize}</h3>
					}
				</div>
			</div>
			{/* <button className="button1">Register</button>
			<button className="button2">View More</button> */}
		</a>
	);
}

function Events() {
	const [urlParams] = useSearchParams();
	console.log("Type: ", urlParams.get("type"));

	const [eventData, setEventData] = useState([])

	useEffect(() => {
		const navBarEle = document.getElementById("navbar");
		navBarEle.style.opacity = 1;
		document.body.style.overflow = "auto";
	});

	useEffect(() => {
		async function fetchData() {
			let headers = new Headers();
			headers.append('Content-Type', 'application/json');
			headers.append('Accept', 'application/json');
			headers.append('Origin', 'http://localhost:3000');

			const requestOptions = {
				method: 'GET',
				headers: headers,
			}
			
			const fetchURL = (urlParams.get("type")) 
				? `${backendURL}/api/events/?type=${urlParams.get("type")}` 
				: `${backendURL}/api/events/`;
			
			await fetch(fetchURL, requestOptions)
				.then((response) => response.json())
				.then((data) => {
					setEventData([
						...data
					]);
					console.log(data);
				})
				.catch((error) => {
					console.error("Error:", error);
				});
		}
		fetchData();
	}, [urlParams])

	return (
		<FadeIn duration={500}>
			<div id="eventsPage" key={urlParams.get("type")}>
				<h2 className="section-header">
					{
						urlParams.get("type") 
						? eventTypeToName[urlParams.get("type")]
						: "Past Events"
					}
				</h2>
				<section className="event_Hero-section">
					<div className="event_Card-grid">{eventData.map(createEntry)}</div>
				</section>
				{/* <div className="event_cards">{event_data.map(createEntry)}</div> */}
			</div>
		</FadeIn>
	);
}

export default Events;
