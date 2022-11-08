import React from "react";
import { useState, useEffect } from 'react';

import "./speaker.css";
import speakerDetails from "./speakerDetails";

import spinner from '../assets/loading/loading3.gif';

function About(props) {
	return (
		<div className="blog-slider">
			<div className="blog-slider__wrp">
				<div className="blog-slider__item swiper-slide">
					<div className="blog-slider__img container">
						<img src={props.img} alt="" />
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
	return (
		<About
			key={term.id}
			img={term.imgURL}
			name={term.name}
			designation={term.designation}
			description={term.description}
		/>
	);
}

function Speaker() {
    const [isLoading, setIsLoading] = useState(true);
    
    const handleLoading = () => {
        setIsLoading(false);
        const navBarEle = document.getElementById("navbar")
        navBarEle.style.opacity = 1;
		console.log("Speaker page loaded")
    }

	useEffect(  // when the component has rendered then add the event listener to it
      () => {
		// const speakerPageEle = document.getElementById("speakerPage");
		// speakerPageEle.addEventListener("load", handleLoading);
        const navBarEle = document.getElementById("navbar")
        navBarEle.style.opacity = 1;
		document.body.style.overflow = "auto";
		document.body.style.overflowX = "hidden";
      },[]
    )

	return (
			<div id="speakerPage">
				<h2 className="section-header">SPEAKERS</h2>
				<dl className="dictionary">{speakerDetails.map(createEntry)}</dl>
			</div>
	);
}
export default Speaker;
