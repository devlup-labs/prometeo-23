import React from "react";
import { useEffect } from 'react';

import sponsor_data from "./sponsor_info";
import './sponsor_style.css';
import FadeIn from "../components/fadein";

function logo(url) {
	return (
		<img src={url} alt="sponsor_logo" />
	);
}

function createEntry(sponsorTerm) {
	return (
		<Entry
			key={sponsorTerm.id}
			emoji={sponsorTerm.emoji}
			name={sponsorTerm.name}
			description={sponsorTerm.meaning}
			img={sponsorTerm.image}
		/>
	);
}

function Entry(props) {
	return (
		<div className="teamContainer" key={props.name}>
			<div className="section-header">
				<span>{props.name}</span>
			</div>

			<div className="team-card">
				{props.img.map(logo)};
			</div>
		</div>
	);
}

function Sponsors() {
	useEffect(  // when the component has rendered then add the event listener to it
		() => {
			const navBarEle = document.getElementById("navbar")
			navBarEle.style.opacity = 1;
			// document.body.style.overflow = "auto";
			// document.body.style.overflowX = "hidden";
		}, []
	)

	return (
		<FadeIn duration={500}>
			<div id="sponsors_body">
				<h1 className="sponsor_h1">
					<span className="sponsor_h1_span">PAST SPONSORS</span>
				</h1>
				<div>{sponsor_data.map(createEntry)}</div>
			</div>
		</FadeIn>
	);
}

export default Sponsors;
