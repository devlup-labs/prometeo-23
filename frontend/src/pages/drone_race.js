// import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import flagshipEvents_data from "./dummy_dronerace";
import "./dronerace.css";

// import logo from "../assets/navbar/prometeo_logo_23.png";
// import Footer from "../components/footer";
import FadeIn from "../components/fadein";
import useOnScreen from "../components/useOnScreen";
import { useEffect, useState, useRef } from "react";
import $ from "jquery";

import prizeImg from "../assets/icons/prize.png";
// import { backendURL } from "../backendURL";

function createEntry(term) {
	return (
		<Entry
			key={term.id}
			bg={term.bg_image}
			fontColor={term.fontColor}
			image={term.image}
			name={term.name}
			sponsors={term.sponsors}
			cardbg1={term.cardbg1}
			cardbg2={term.cardbg2}
			// reach={term.reach}
			// category={term.category}
			// sponsor={term.sponsor}
			description={term.description}
		/>
	);
}

function Entry(props) {
	useEffect(
		// when the component has rendered then add the event listener to it
		() => {
			const navBarEle = document.getElementById("navbar");
			navBarEle.style.opacity = 1;
		},
		[]
	);
	const ref = useRef();
	const onScreen = useOnScreen(ref);

	const [countDone, setCountDone] = useState(false);
	function countUp() {
		var num = $(this).text();
		var decimal = 0;
		if (num.indexOf(".") > 0) {
			decimal = num.toString().split(".")[1].length;
		}
		$(this)
			.prop("Counter", 0.0)
			.animate(
				{
					Counter: $(this).text(),
				},
				{
					duration: 2000,
					easing: "swing",
					step: function (now) {
						$(this).text(parseFloat(now).toFixed(decimal));
					},
				}
			);
	}

	useEffect(() => {
		const counters = document.querySelectorAll(".counter");
		const speed = 200;

		if (!countDone && onScreen) {
			$(".js-num").each(countUp);
			setCountDone(true);
		}
	}, [onScreen]);

	return (
		<div className="dronerace_flag">
			<div
				id="dronerace_flagTop-bg"
				className="dronerace_flagTop-DroneContainer-bg"
				style={{
					backgroundImage: `url(${props.bg})`,
				}}
			>
				{/* <img src={props.image} /> */}
			</div>
			<div className="dronerace_flagTop-DroneContainer">
				<h1 data-title={props.name}>{props.name}</h1>
				{/* <div class="dronerace_table center">
          <div class="dronerace_monitor-wrapper center">
            <div class="dronerace_monitor center">
              <p>Ready for war</p>
            </div>
          </div>
        </div> */}

				{/* <img src={props.image} /> */}
			</div>
			<section className="dronerace_flag-bottom-bg">
				<div className="dronerace_flagAbout">
					<h3 className="dronerace_title-shadow">ABOUT</h3>
					<section className="dronerace_Abouttable">
						<div id="dronerace_flag_prize">
							<img src={prizeImg} alt="icon" id="dronerace_flag_prize-icon" />
							<div id="dronerace_flagPrize-description">
								<span className="dronerace_js-num" data-target="12000">
									60
								</span>
								<span>K+</span>
								<br />
								<span ref={ref}>Prize Pool</span>
							</div>
						</div>
						<div id="dronerace_about-text">
							<p className="dronerace_about-description">{props.description}</p>
							{/* <Link id="dronerace_flagAbout-button">Registrations Opening Soon</Link> */}
						</div>
					</section>
					{/* <p>{props.description}</p> */}
				</div>
				{/* <div className="dronerace_flagSponsors">
					<h3 className="dronerace_title-shadow">SPONSORS</h3>
					<img src="https://apiv.prometeo.in/media/sponsors/smasung_sWRoaY5.webp" />
				</div> */}
				<div className="dronerace_flagContactUs">
					<h3 className="dronerace_title-shadow">CONTACT US</h3>
					<div class="dronerace_canvas">
						<div id="dronerace_contact-card" class="dronerace_contact-card">
							<div>
								<p className="dronerace_flagContactUs-name">
									Rahul Gopathi
								</p>
								<p className="dronerace_flagContactUs-mail">
									gopathi.1@iitj.ac.in
								</p>
								<a href="https://wa.me/918919430577" className="dronerace_flagContactUs-phone">
									+91 8919430577
								</a>
							</div>
							<div>
								<p className="dronerace_flagContactUs-name">
									Likhith Ayinala
								</p>
								<p className="dronerace_flagContactUs-mail">
									ayinala.1@iitj.ac.in
								</p>
								<a href="https://wa.me/918927857887" className="dronerace_flagContactUs-phone">
									+91 8927857887
								</a>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}

function DroneRace() {
	return (
		<FadeIn duration={500}>
			<div id="dronerace_flagshipEventsPage">{flagshipEvents_data.map(createEntry)}</div>
		</FadeIn>
	);
}

export default DroneRace;
