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

    useEffect(() => {
        const navBarEle = document.getElementById("navbar");
        navBarEle.style.opacity = 1;
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        async function fetchData() {
        try {
            console.log("Fetching data for user:", user.email);
            const obj = {
                email: user.email,
                name: e.target.full_name.value,
                aadhar: e.target.aadhar.value,
                dob: e.target.dob.value,
                address: e.target.address.value
                // ambassador: user.ambassador,
                // referral: user.referral_code,
            };
            console.log(obj);
            const response = await api.post(
                `${backendURL}/accomodationpasses/`,
                obj
            );
            if (response.status === 200) {
                let data = response.data;
                console.log(data);
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
                console.log(response)
                // toast.error("Error: " + response.statusText);
            }
        } catch (error) {
            console.log("Error:", error);
        }
    }

    if (user === null) {
        toast.error("Please login to register as Campus Ambassador!");
    } else {
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
    }
};  

    // toast.onChange((state, toast) => {
    //     if (state === 'removed' && toast.type === 'success') {
    //         console.log("closed")
    //     }
    // });

    // registerUser(first_name, last_name, city, college, contact, gender, referral_code, email, password, ambassador)

    // const data = {
    //     first_name: e.target.first_name.value,
    //     last_name: e.target.last_name.value,
    //     city: e.target.city.value,
    //     college: e.target.college.value,
    //     contact: e.target.phone.value,
    //     gender: e.target.gender.value,
    //     email: e.target.email.value,
    //     password: e.target.password.value,
    // };

    // let headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    // headers.append('Accept', 'application/json');
    // headers.append('Origin', 'http://localhost:3000');

    // const requestOptions = {
    //     method: 'POST',
    //     headers: headers,
    //     body: JSON.stringify(data),
    // };

    // fetch(`${backendURL}/signup/`, requestOptions)
    //     .then((response) => {
    //         console.log(response.status);
    //         if (response.status === 201) {
    //             toast.success('Signed up Successfully!');
    //         } else {
    //             toast.error('Something went wrong!');
    //         }

    //         return response.json();
    //     })
    //     .then((data) => {
    //         console.log('Data: ', data);
    //     })
    //     .catch((error) => {
    //         console.log('Error: ', error);
    //     });

    return (
        <FadeIn duration={500}>
            <div className="acc-form">
                <div className="acc-container">
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