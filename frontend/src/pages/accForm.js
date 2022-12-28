import { useEffect, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "./accForm.css";

import FadeIn from "../components/fadein";

import signInImg from "../assets/backgrounds/peeking.png";

import useAxios from "../context/context_useAxios";
import { backendURL } from "../backendURL";
import AuthContext from "../context/AuthContext";

function AccForm() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({});
    const { user, logoutUser } = useContext(AuthContext);
    const api = useAxios();
    // console.log(registerUser)

    // useEffect(() => {
    //     console.log(user);
    // }, [user]);


    useEffect(() => {
        const navBarEle = document.getElementById("navbar");
        navBarEle.style.opacity = 1;
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        async function fetchData() {
            try {
                // console.log("Fetching data for user:", user.email);
                const obj = {
                    user: user.user_id,
                    // email: user.email,
                    full_name: e.target.full_name.value,
                    aadhar_card: e.target.aadhar.value,
                    dob: e.target.dob.value,
                    address: e.target.address.value,
                    // ambassador: user.ambassador,
                    // referral: user.referral_code,
                };
                // console.log(obj);
                const response = await api.post(
                    `${backendURL}/accomodationpasses/`,
                    obj
                );
                if (response.status === 201) {
                    let data = response.data;
                    document.getElementById("acc-success").style.display =
                        "flex";
                    // console.log(data);
                    // let invite_code;
                    // // toast.success("Registered Successfully!");
                    // invite_code = data.invite_referral;
                    // document.getElementById("ca-register-button").disabled = true;
                    // document.getElementById("ca-register-button").innerHTML =
                    //     "Registered!";
                    // document.getElementById("ca-referral-info").innerHTML =
                    //     "Your referral code is: <span id='ca-yellow' onClick={copyText}>" +
                    //     invite_code +
                    //     "</span> (click to copy!). Share it with your friends and get them to register using your referral code to get a chance to win exciting prizes!";
                    // }
                } else {
                    // console.log(response)
                    // toast.error("Error: " + response.statusText);
                }
            } catch (error) {
                console.log("Error:", error);
            }
        }

        // if (user === null) {
        //     toast.error("Please login to register as Campus Ambassador!");
        // } else {
            const myPromise = new Promise((resolve, reject) => {
                fetchData()
                    .then((res) => {
                        // console.log(res)
                        resolve(res);
                    })
                    .catch((err) => {
                        // console.log(err)
                        reject(err);
                    });
            });

            toast.promise(myPromise, {
                pending: "Registering...",
                success: "Registered successfully!",
                error: {
                    render: ({ data }) => {
                        return "Something went wrong!";
                    },
                },
            });
        // }
    };

    const [accData, setAccData] = useState([]);

    useEffect(() => {
        // perform get request to check if user is already registered
        async function fetchData() {
            try {
                // console.log("Fetching data for user:", user.email);
                const response = await api.get(
                    `${backendURL}/accomodationpasses/?user=${user.user_id}`
                );
                if (response.status === 200) {
                    let data = response.data;
                    console.log(data);
                    setAccData(data);
                    // if (paymentPending(data)) {
                    //     document.getElementById("acc-pay-button").style.display = "block";
                    // }
                    // else {
                    //     document.getElementById("acc-pay-button").style.display = "none";
                    // }
                    if (data.length > 0) {
                        document.getElementById("acc-success").style.display =
                        "flex";
                    }
                    // console.log(data);
                    else {
                        document.getElementById("acc-success").style.display =
                        "none";
                    }
                            // console.log(userData
                } else {
                    // console.log(response)
                    // toast.error("Error: " + response.statusText);
                }
            } catch (error) {
                console.log("Error:", error);
            }
        }

        if (user !== null) {
            // console.log("Fetching data for user:", user.email)
            fetchData();
        }
        else {
            document.getElementById("acc-success").style.display = "none";
        }
    }, []);

    // useEffect(() => {
    //     console.log(accData);
    // }, [accData]);

    function paymentPending(data) {
        if (data.length > 0) {
            for (let i = 0; i < data.length; i++) {
                if (data[i].pass_type === 0) {
                    return true;
                }
            }
            return false; 
        } else {
            return false;
        }
    }

    return (
        <FadeIn duration={500}>
            <div className="acc-form">
                <div className="acc-container">
                    <div id="acc-success" className="acc-success">
                        <div>
                            Congratulations! You are now eligible for the Early
                            Bird discount! Please select the Jumbo Pass option
                            in the payment checkout form which includes
                            accommodation at 50% discount and Cultural Night
                            pass, all for ₹ 999 only!<br></br>
                            <br></br>
                            Note:
                            <ul>
                                <li>
                                    Don't forget to enter your CA referral code
                                    (if you have one) in the payment checkout
                                    form.
                                </li>
                                <li>
                                    The Early Bird discount is only for a few
                                    days, so inform your friends to register as
                                    soon as possible!
                                </li>
                            </ul>
                        </div>
                        <a
                            href="https://forms.eduqfix.com/prometeo/add"
                            target="_blank"
                            id="acc-pay-button"
                        >
                                <button
                                    type="submit"
                                    className="acc-pay-button"
                                >
                                    Pay Now
                                </button>
                        </a>
                    </div>
                    <div className="acc-container-left">
                        <img src={signInImg} alt="sign in" />
                    </div>
                    <div className="acc-container-right">
                        <div className="acc-container-right-title">
                            Register for Accommodation
                        </div>
                        <form className="acc-form" onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="full_name"
                                placeholder="Full Name (as on Aadhar Card) *"
                                required
                            />
                            <input
                                type="text"
                                name="aadhar"
                                placeholder="Aadhar Card Number *"
                                pattern="[2-9]{1}[0-9]{3} [0-9]{4} [0-9]{4}"
                                required
                            />
                            <input
                                type="text"
                                name="dob"
                                placeholder="Date of Birth *"
                                required
                                onFocus={(e) => (e.target.type = "date")}
                                onBlur={(e) => (e.target.type = "text")}
                            />
                            <input
                                type="text"
                                name="address"
                                placeholder="Full Address *"
                                required
                            />
                            <input
                                type="submit"
                                value="Submit"
                                id="acc-form-submit"
                            />
                            <br />
                        </form>
                    </div>
                </div>
            </div>
        </FadeIn>
    );
}

export default AccForm;
