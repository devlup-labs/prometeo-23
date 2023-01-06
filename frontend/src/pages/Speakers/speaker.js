import React from "react";
import { useState, useEffect } from 'react';

import { backendURL } from "../../backendURL";
import "./speaker.css";
import speakerDetails from "./speakerDetails";

import spinner from '../../assets/loading/loading3.gif';
import FadeIn from "../../components/fadein";

function About(props) {
	return (
		<div className="blog-slider">
			<div className="blog-slider__wrp">
				<div className="blog-slider__item swiper-slide">
					<div className="blog-slider__img blog-container">
						<img src={props.image} alt="" />
					</div>
					<div className="blog-slider__content">
						<div className="blog-slider__title">{props.name}</div>
						<span className="blog-slider__code">{props.designation}</span>
						<div className="projcard-bar"></div>
						<div className="blog-slider__text">{props.description} </div>
					</div>
				</div>
			</div>
		</div>
	);
}

function createEntry(term) {
	// if (term.type === "talk") {
		return (
			<About
				key={term.id}
				image={term.image.replace("0.0.0.0:8888", "apiv.prometeo.in")}
				name={term.name}
				designation={term.designation}
				description={term.description}
			/>
		);
	// }
	// else return null;
}

function Speaker() {
    const [isLoading, setIsLoading] = useState(true);
	const [speakerData, setSpeakerData] = useState([]);

	useEffect(  // when the component has rendered then add the event listener to it
      () => {
        const navBarEle = document.getElementById("navbar")
        navBarEle.style.opacity = 1;
      },[]
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

			await fetch(`${backendURL}/events/?type=talk`, requestOptions)
				.then((response) => response.json())
				.then((data) => {
					setSpeakerData([
						...speakerData,
						...data
					]);
					// console.log(data);
				})
				.catch((error) => {
					console.error("Error:", error);
				});
		}
		fetchData();
	}, [])

	return (
		<FadeIn duration={500}>
			<div id="speakerPage">
				<h2 className="speakerHeading">PAST SPEAKERS</h2>
				<div className="speakerCard">{speakerData.map(createEntry)}</div>	
			</div>
		</FadeIn>
	);
}
export default Speaker;
