import { useEffect, useState, useRef, useContext } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import flagshipEvents_data from "./dummy_dronerace";
import "./dronerace.css";

// import logo from "../assets/navbar/prometeo_logo_23.png";
// import Footer from "../components/footer";
import FadeIn from "../../../components/fadein";
import useOnScreen from "../../../components/useOnScreen";
import $ from "jquery";

import { backendURL } from "../../../backendURL";
import AuthContext from "../../../context/AuthContext";
import useAxios from "../../../context/context_useAxios";

import prizeImg from "../../../assets/icons/prize.png";

function createEntry(term, droneName, setdroneName) {
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
			droneName={droneName}
			setdroneName={setdroneName}
		/>
	);
}

function Entry(props) {
    const { user } = useContext(AuthContext);
    const api = useAxios();

	useEffect(() => {
		const navBarEle = document.getElementById("navbar");
		navBarEle.style.opacity = 1;
	}, []);

	const ref = useRef();
	const onScreen = useOnScreen(ref);
    const navigate = useNavigate();

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
			$(".dronerace_js-num").each(countUp);
			setCountDone(true);
		}
	}, [onScreen]);

	
    const handleSubmit = () => {
        // e.preventDefault();

        const event_name = "Drone Race";
        const email = user.email;

        const postTeam = async (event_name, email) => {
            const requestData = { event_name, email }
            
            // try {
                // console.log("Request Data:", requestData)
                const response = await api.post(
                    `${backendURL}/registerevent/`,
                    requestData
                );
                if (response.status === 200) {
                    // navigate("/dashboard");
					props.setdroneName("registered");
					// console.log("Register event response:", response)
                    return response;
                } else {
                    throw(response.statusText)
                }
            // }
            //  catch (err) {
            //     console.log(err);
            // }
        }

        const myPromise = new Promise((resolve, reject) => {
            postTeam(event_name, email)
            .then((res) => {
                // console.log(res)
                resolve(res);
            })
            .catch((err) => {
                // console.log(err)
                reject(err);
            });            
        })

        toast.promise(myPromise, {
            loading: "Registering for the event...",
            success: "Registered for the event!",
            error: "Error registering for the event!",
        })
    }



	return (
		<div className="dronerace_flag">
			<div
				className="dronerace_flagTop-container"
				style={{
					backgroundImage: `url(${props.bg})`,
				}}
			>
				{/* <img src={props.image} /> */}
			</div>
			<div className="dronerace_flagTop-DroneContainer">
				<h1 data-title={props.name}>{props.name}</h1>
				<p id="dronerace_info"></p>
				<div className="dronerace_buttons">
                    <button
                        id="dronerace_create-button"
                        className="button-48"
                        onClick={() => {
                            if (props.user === null) {
                                toast.error("Please login to register");
                                navigate("/login");
                            }
							else {
								handleSubmit();
							}
                        }}
						disabled={props.droneName === "registered"}
                    >
						<div className="button-text">
							{
								props.droneName === "registered" ? 
								"Already Registered!" : 
								"Register"
							}
						</div>
                        {/* <Link
                            to="/dronerace-register"
                            className="button-text"
                        >
                            Register
                        </Link> */}
                    </button>
				</div>
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
	const [droneName, setdroneName] = useState("");
	const api = useAxios();
	const { user } = useContext(AuthContext);

	const updateDroneName = (newName) => {
		setdroneName(newName);
	};

	useEffect(() => {
		async function fetchData() {
			try {
				const response = await api.post(
					`${backendURL}/checkevent/`,
					{
						email: user.email,
						event_name: "Drone Race",
					}
				);

				if (response.status === 200) {
					const data = response.data;
					// console.log("Check event response:", data);
					if (data.status === "True") {
						setdroneName("registered");
					}
				} else {
					throw response.statusText;
				}
			} catch (err) {
				console.log(err);
			}
		}
		fetchData();
	}, []);
	
	return (
		<FadeIn duration={500}>
			<div id="dronerace_flagshipEventsPage">
				{/* {flagshipEvents_data.map(createEntry)} */}
				{flagshipEvents_data.map((data) => {
					return createEntry(data, droneName, updateDroneName)
				})}
			</div>
		</FadeIn>
	);
}



export default DroneRace;
