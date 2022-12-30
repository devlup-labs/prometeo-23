import React from "react";
import { useEffect, useState } from 'react';

import { backendURL } from "../../backendURL";
// import useAxios from "../context/context_useAxios";

import sponsor_data from "./sponsor_info";
import './sponsors.css';
import FadeIn from "../../components/fadein";

function logo(sponsor) {
	if (sponsor.sponsor_link) {
		return (
			<a href={sponsor.sponsor_link} target="_blank" rel="noreferrer" key={sponsor.id}>
				<img 
					src={sponsor.image.replace("0.0.0.0:8888", "apiv.prometeo.in")} 
					alt={sponsor.name ? sponsor.name : "Sponsor Logo"} 
					key={sponsor.id} 
				/>
			</a>
		);
	}
	else {
		return (
			<img 
				src={sponsor.image.replace("0.0.0.0:8888", "apiv.prometeo.in")} 
				alt={sponsor.name ? sponsor.name : "Sponsor Logo"} 
				key={sponsor.id} 
			/>
		);
	}
}

function createEntry(sponsorCategory) {
	return (
		<Entry sponsorCategory={sponsorCategory} key={sponsorCategory.designation} />
	);
}

function Entry(props) {
	const sponsorCategory = props.sponsorCategory;
	
	return (
		<div className="sponsorContainer" key={sponsorCategory.designation}>
			<div className="section-header">
				<span>{mapDesignationToType[sponsorCategory.designation]}</span>
			</div>

			<div className="sponsor-card">
				{sponsorCategory.sponsors.map(logo)};
			</div>
		</div>
	);
}

const mapDesignationToType = {
	1: "Title Sponsor",
	2: "Associate Sponsor",
	3: "Online Media Partner",
	4: "Consultancy Partner",
	5: "Technical Events Partner",
	6: "VC Partner",
	7: "Workshops Partner",
	8: "Services Partner",
	9: "Entertainment Partner",
	10: "Gifting Partner",
	11: "Digital Media Partner",
	12: "Printing Partner",
	13: "Media Partner",
	14: "Merchandise Partner",
}

function Sponsors() {
	const [sponsorsData, setSponsorsData] = useState([]);

	// const api = useAxios();

	useEffect(  // when the component has rendered then add the event listener to it
		() => {
			const navBarEle = document.getElementById("navbar")
			navBarEle.style.opacity = 1;
		}, []
	)
	
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

			await fetch(`${backendURL}/sponsors/`, requestOptions)
				.then((response) => response.json())
				.then((data) => {
					let newData = {}
					data.forEach((sponsor) => {
						newData[sponsor.designation] = newData[sponsor.designation] || {}
						newData[sponsor.designation].designation = sponsor.designation;
						newData[sponsor.designation].sponsors = [...newData[sponsor.designation].sponsors || [], sponsor]
					})

					data = []
					for (var key in newData) {
						data = [...data, newData[key]]
					}

					setSponsorsData([
						...data
					]);
					// console.log(data);
				})
				.catch((error) => {
					console.error("Error:", error);
				});
			// try {
			// 	const response = await api.get(`${backendURL}/sponsors/`);
			// 	// console.log(response)
			// 	let data = response.data;			
			// 	let newData = {}
			// 	data.forEach((sponsor) => {
			// 		newData[sponsor.designation] = newData[sponsor.designation] || {}
			// 		newData[sponsor.designation].designation = sponsor.designation;
			// 		newData[sponsor.designation].sponsors = [...newData[sponsor.designation].sponsors || [], sponsor]
			// 	})

			// 	data = []
			// 	for (var key in newData) {
			// 		data = [...data, newData[key]]
			// 	}

			// 	setSponsorsData([
			// 		...data
			// 	]);

			// 	// setSponsorsData(response.json());
			// }
			// catch(error) {
			// 	console.log("Error:", error)
			// }
		}
		fetchData();
	}, [])

	return (
		<FadeIn duration={500}>
			<div id="sponsors_body">
				<h1 className="sponsor_h1">
					<span className="sponsor_h1_span">PAST SPONSORS</span>
				</h1>
				<div>{sponsorsData.map(createEntry)}</div>
			</div>
		</FadeIn>
	);
}

export default Sponsors;
