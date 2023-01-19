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
				{sponsorCategory.sponsors.map(logo)}
			</div>
		</div>
	);
}

const mapDesignationToType = {
	1: "Title Sponsor",
	16: "Co-Title Sponsor",
	17: "Associate Sponsor",
	18: "Powered By",
	19: "Learning Partner",
	20: "Logo Partner",
	21: "Accelerated By Partner",
	22: "E-Sports Partner",
	23: "Radio Partner",
	24: "Consultancy Partner",
	25: "Technical Events Partner",
	26: "VC Partner",
	27: "Workshops Partner",
	28: "Services Partner",
	29: "Entertainment Partner",
	30: "Gifting Partner",
	31: "Digital Media Partner",
	32: "Printing Partner",
	33: "Media Partner",
	34: "Merchandise Partner",
	35: "Coupon Partner",
	36: "Online Media Partner",
	37: "Education Partner",
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
					console.log(data)
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
