import { useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "./completeProfile.css";

import FadeIn from "../components/fadein";

import signInImg from "../assets/backgrounds/peeking.png";

import AuthContext from "../context/AuthContext";
import useAxios from "../context/context_useAxios";
import { backendURL } from "../backendURL";

function CompleteProfile() {
    const { user, logoutUser } = useContext(AuthContext);
    const api = useAxios();
    const navigate = useNavigate();

    async function checkWhetherProfileComplete() {
        try {
            const response = await api.post(
                `${backendURL}/logindashboard/`,
                {
                    email: user.email,
                }
            );

            if (response.status === 200) {
                const data = response.data;
                // console.log("Login Dashboard Data:", data);
                if (data.isProfileCompleted === true) {
                    navigate("/dashboard");
                }
            } else {
                logoutUser();
                throw response.statusText;
            }
        } catch (err) {
            console.log(err);
        }
    }
    checkWhetherProfileComplete();
    // console.log(registerUser)

    useEffect(() => {
        const navBarEle = document.getElementById("navbar");
        navBarEle.style.opacity = 1;
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const completeProfileGoogleUser = async (city, college, contact, gender, referral_code, email, ambassador, accomodation) => {
            const requestData = { city, college, contact, gender, referral_code, email, ambassador, accomodation }
            
            try {
                // console.log("Request Data:", requestData)
                const response = await api.post(
                    `${backendURL}/google/completeprofile/`,
                    requestData
                );
                if (response.status === 200) {
                    navigate("/dashboard");
                    return response;
                } else {
                    throw(response.statusText)
                }
            } catch (err) {
                console.log(err);
            }
        }

        // const first_name = e.target.first_name.value;
        // const last_name = e.target.last_name.value;
        const city = e.target.city.value;
        const college = e.target.college.value;
        const contact = e.target.phone.value;
        const gender = e.target.gender.value;
        const referral_code = e.target.referral_code.value === "" ? "none" : e.target.referral_code.value;
        const email = user.email;
        // const password = e.target.password.value;
        // const ambassador = false;
        const ambassador = e.target.ca.checked;
        const accomodation = e.target.acc.checked;
        // const  accomodation = e.target.acc.value === "on";

        // console.log(city, college, contact, gender, referral_code, email, ambassador, accomodation)
        const myPromise = new Promise((resolve, reject) => {
            completeProfileGoogleUser(
                // first_name,
                // last_name,
                city,
                college,
                contact,
                gender,
                referral_code,
                email,
                // password,
                ambassador,
                accomodation
            )
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
            pending: "Updating profile details...",
            success: "Updated successfully!",
            error: "Something went wrong!",
        });
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

        // fetch(`${backendURL}/completeProfile/`, requestOptions)
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
    };

    const handleConfirmPassword = (e) => {
        let passEle = document.getElementById("completeProfile-form-password");
        let confPassEle = document.getElementById(
            "completeProfile-form-confirmpassword"
        );
        let confPassWarningEle = document.getElementById(
            "completeProfile-form-confirmpassword-warning"
        );
        if (confPassEle.value != "") {
            if (passEle.value == confPassEle.value) {
                confPassEle.style.color = "green";
                confPassWarningEle.style.visibility = "hidden";
            } else {
                confPassEle.style.color = "red";
                confPassWarningEle.style.visibility = "visible";
            }
        } else {
            confPassEle.style.color = "black";
            confPassWarningEle.style.visibility = "hidden";
        }
    };

    return (
        <FadeIn duration={500}>
            <div className="completeProfile">
                <div className="completeProfile-container">
                    <div className="completeProfile-container-left">
                        <img src={signInImg} alt="sign in" />
                    </div>
                    <div className="completeProfile-container-right">
                        <div className="completeProfile-container-right-title">
                            COMPLETE PROFILE
                        </div>
                        <form className="completeProfile-form" onSubmit={handleSubmit}>
                            {/* <div className="completeProfile-form-name">
                                <input
                                    type="text"
                                    name="first_name"
                                    placeholder="First Name *"
                                    required
                                />
                                <input
                                    type="text"
                                    name="last_name"
                                    placeholder="Last Name *"
                                    required
                                />
                            </div> */}
                            <input
                                type="text"
                                name="city"
                                placeholder="City *"
                                required
                            />
                            <input
                                type="text"
                                name="college"
                                placeholder="College *"
                                maxLength={60}
                                required
                            />
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Phone Number *"
                                pattern="[6-9]{1}[0-9]{9}"
                                onInput={(e) => {
                                    e.target.setCustomValidity("");
                                }}
                                onInvalid={(e) => {
                                    e.target.setCustomValidity(
                                        "Please enter a valid phone number e.g. 9876543210"
                                    );
                                }}
                                required
                            />
                            <div className="completeProfile-gender-dropdown">
                                <label
                                    htmlFor="gender"
                                    className="completeProfile-gender-dropdown-label"
                                >
                                    Gender
                                </label>
                                <select
                                    name="gender"
                                    id="gender"
                                    className="completeProfile-gender-dropdown-select"
                                >
                                    <option
                                        className="completeProfile-gender-option"
                                        selected
                                        disabled
                                        hidden
                                    >
                                        -- Select --
                                    </option>
                                    <option
                                        className="completeProfile-gender-option"
                                        value="Male"
                                    >
                                        Male
                                    </option>
                                    <option
                                        className="completeProfile-gender-option"
                                        value="Female"
                                    >
                                        Female
                                    </option>
                                    <option
                                        className="completeProfile-gender-option"
                                        value="Other"
                                    >
                                        Other
                                    </option>
                                </select>
                            </div>
                            <div className="completeProfile-ca-checkbox">
                                <input
                                    type="checkbox"
                                    name="ca"
                                    id="completeProfile-ca-checkbox-input"
                                />
                                <label
                                    htmlFor="ca"
                                    className="completeProfile-ca-checkbox-label"
                                >
                                    I want to signup for{" "}
                                    <Link to="/campus-ambassador">
                                        CA Program
                                    </Link>
                                </label>
                            </div>
                            <div className="completeProfile-acc-checkbox">
                                <input
                                    type="checkbox"
                                    name="acc"
                                    id="completeProfile-acc-checkbox-input"
                                />
                                <label
                                    htmlFor="acc"
                                    className="completeProfile-acc-checkbox-label"
                                >
                                    I would like to avail accommodation at IIT
                                    Jodhpur campus and agree to abide by the <Link to="/accommodation">guidelines</Link> of the same.
                                </label>
                            </div>
                            <input
                                type="text"
                                name="referral_code"
                                placeholder="Referral Code (If any)"
                            />
                            {/* <input
                                type="email"
                                name="email"
                                placeholder="Email *"
                                required
                            />
                            <input
                                id="completeProfile-form-password"
                                type="password"
                                name="password"
                                placeholder="Password *"
                                onKeyUp={handleConfirmPassword}
                                required
                            />
                            <div className="completeProfile-form-confirmpassword-container">
                                <input
                                    id="completeProfile-form-confirmpassword"
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm Password *"
                                    onKeyUp={handleConfirmPassword}
                                    required
                                />
                                <div id="completeProfile-form-confirmpassword-warning">
                                    Passwords do not match!
                                </div>
                            </div> */}
                            <input
                                type="submit"
                                value="Submit"
                                id="completeProfile-form-submit"
                            />
                            <br />
                        </form>
                        {/* <div className="completeProfile-alreadyAccount">
                            Already have an account?{" "}
                            <Link to="/login">Login</Link>
                        </div> */}
                    </div>
                </div>
            </div>
        </FadeIn>
    );
}

export default CompleteProfile;
