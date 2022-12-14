import { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import "./Login.css";
import FadeIn from "../components/fadein";

import loginImg from "../assets/backgrounds/circularRing.png";
import googleImg from "../assets/icons/google.png";

import { backendURL } from "../backendURL";

function Login() {
    useEffect(() => {
        const navBarEle = document.getElementById("navbar");
        navBarEle.style.opacity = 1;
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            name: e.target.full_name.value,
            email: e.target.email.value,
            contact: e.target.phone_number.value,
            college: e.target.college_name.value,
            state: e.target.state.value,
            year: e.target.collegeYear.value,
            // por: e.target.position_of_responsibility.value,
            // poc_por: e.target.contact_of_any_por_holder.value,
        };

        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Accept", "application/json");
        headers.append("Origin", "http://localhost:3000");

        const requestOptions = {
            method: "POST",
            headers: headers,
            body: JSON.stringify(data),
        };

        console.log("Submitted");

        fetch(`${backendURL}/login/`, requestOptions)
            .then((response) => {
                console.log(response.status);
                if (response.status === 201) {
                    toast.success("Registered Successfully!");
                } else {
                    toast.error("Something went wrong!");
                }

                return response.json();
            })
            .then((data) => {
                console.log("Data: ", data);
            })
            .catch((error) => {
                console.log("Error: ", error);
            });
    };

    return (
        <FadeIn duration={500}>
            <div className="login">
                <div className="login-container">
                    <div
                        className="login-container-left"
                        style={
                            {
                                // backgroundImage: `url(${loginImg})`,
                            }
                        }
                    >
                        <img src={loginImg} alt="Login Image" />
                    </div>
                    <div className="login-container-right">
                        <div className="login-container-right-title">LOGIN</div>
                        <form className="login-form" onSubmit={handleSubmit}>
                            {/* <input type="text" placeholder="Full Name" name="full_name" required /> */}
                            <input
                                type="email"
                                placeholder="Email"
                                name="email"
                                required
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                required
                            />
                            <input
                                type="submit"
                                value="Submit"
                                id="login-form-submit"
                            />
                            <br />
                            <div className="google-button parent">
                                <input
                                    type="submit"
                                    value="Log In Using Google"
                                    id="google-login-form-submit"
                                    className="form-google-signin"
                                />
                                <img
                                    src={googleImg}
                                    className="google-img child"
                                ></img>
                            </div>
                        </form>
                        <div className="login-noaccount">
                            Don't have an account?{" "}
                            <Link to="/sign-up">Sign Up</Link>
                        </div>
                    </div>
                </div>
            </div>
        </FadeIn>
    );
}

export default Login;
