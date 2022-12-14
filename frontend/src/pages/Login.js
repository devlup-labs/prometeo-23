import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import "./Login.css";
import FadeIn from "../components/fadein";
import loginImg from "../assets/backgrounds/circularRing.png";
import googleImg from "../assets/icons/google.png";

import AuthContext from "../context/AuthContext";
import { backendURL } from "../backendURL";

function Login() {
    const { loginUser } = useContext(AuthContext);

    useEffect(() => {
        const navBarEle = document.getElementById("navbar");
        navBarEle.style.opacity = 1;
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        
        
        const myPromise = new Promise((resolve, reject) => {            
            loginUser(email, password)
                .then((res)=>{
                    // console.log(res)
                    resolve(res)
                })
                .catch((err)=>{
                    // console.log(err)
                    reject(err)
                })
        })
        
        toast.promise(myPromise, 
            {
                pending: 'Logging you in...',
                success: 'Logged in successfully!',
                error: {
                    render: ({ data }) => {
                        if (data == "Unauthorized") {
                            return "Invalid Credentials!"
                        }
                        return "Something went wrong!"
                    }
                },
            }
        )


        // const data = {
        //     email: e.target.email.value,
        //     password: e.target.password.value,
        // };

        // let headers = new Headers();
        // headers.append("Content-Type", "application/json");
        // headers.append("Accept", "application/json");
        // headers.append("Origin", "http://localhost:3000");

        // const requestOptions = {
        //     method: "POST",
        //     headers: headers,
        //     body: JSON.stringify(data),
        // };

        // fetch(`${backendURL}/login/`, requestOptions)
        //     .then((response) => {
        //         console.log(response.status);
        //         if (response.status === 201) {
        //             toast.success("Logged in Successfully!");
        //         } else {
        //             toast.error("Something went wrong!");
        //         }

        //         return response.json();
        //     })
        //     .then((data) => {
        //         console.log("Data: ", data);
        //     })
        //     .catch((error) => {
        //         console.log("Error: ", error);
        //     });
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
