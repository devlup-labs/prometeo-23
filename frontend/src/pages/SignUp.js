import { useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import './Signup.css';

import FadeIn from '../components/fadein';

import signInImg from '../assets/backgrounds/peeking.png';

import AuthContext from '../context/AuthContext';
import { backendURL } from '../backendURL';

function SignUp() {
    const { registerUser } = useContext(AuthContext);
    const navigate = useNavigate();
    // console.log(registerUser)

    useEffect(() => {
        const navBarEle = document.getElementById('navbar');
        navBarEle.style.opacity = 1;
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const first_name = e.target.first_name.value;
        const last_name = e.target.last_name.value;
        const city = e.target.city.value;
        const college = e.target.college.value;
        const contact = e.target.phone.value;
        const gender = e.target.gender.value;
        const referral_code = e.target.referral_code.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const ambassador = false;
        // const ambassador = e.target.ca.value === "on";
        const accommodation = e.target.acc.value === "on";

        // console.log(ambassador)
        const myPromise = new Promise((resolve, reject) => {            
            registerUser(first_name, last_name, city, college, contact, gender, referral_code, email, password, ambassador, accommodation)
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
                pending: 'Creating your account...',
                success: 'Registered Successfully!',
                error: 'Something went wrong!',
            }
        )
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
    };

    const handleConfirmPassword = (e) => {
        let passEle = document.getElementById('signup-form-password');
        let confPassEle = document.getElementById('signup-form-confirmpassword');
        let confPassWarningEle = document.getElementById('signup-form-confirmpassword-warning');
        if (confPassEle.value != "") {
            if (passEle.value == confPassEle.value) {
                confPassEle.style.color = 'green';
                confPassWarningEle.style.visibility = 'hidden';
            } else {
                confPassEle.style.color = 'red';
                confPassWarningEle.style.visibility = 'visible';
            }
        }
        else {
            confPassEle.style.color = 'black';
            confPassWarningEle.style.visibility = 'hidden';
        }
    }


    return (
        <FadeIn duration={500}>
            <div className="signup">
                <div className="signup-container">
                    <div className="signup-container-left">
                        <img src={signInImg} alt="sign in" />
                    </div>
                    <div className="signup-container-right">
                        <div className="signup-container-right-title">
                            SIGN UP
                        </div>
                        <form
                            className="signup-form"
                            onSubmit={handleSubmit}
                        >
                            <div className="signup-form-name">
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
                            </div>
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
                                required
                            />
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Phone Number *"
                                pattern="[6-9]{1}[0-9]{9}"
                                onInput={(e) => {
                                    e.target.setCustomValidity('');
                                }}
                                onInvalid={(e) => {
                                    e.target.setCustomValidity('Please enter a valid phone number e.g. 9876543210');
                                }}
                                required
                            />
                            <div className="signup-gender-dropdown">
                                <label htmlFor="gender" className="signup-gender-dropdown-label">Gender</label>
                                <select name="gender" id="gender" className="signup-gender-dropdown-select">
                                    <option className="signup-gender-option" selected disabled hidden>-- Select --</option>
                                    <option className="signup-gender-option" value="Male">Male</option>
                                    <option className="signup-gender-option" value="Female">Female</option>
                                    <option className="signup-gender-option" value="Other">Other</option>
                                </select>
                            </div>
                            {/* <div className="signup-ca-checkbox">
                                <input type="checkbox" name="ca" id="signup-ca-checkbox-input" />
                                <label htmlFor="ca" className="signup-ca-checkbox-label">I want to signup for <Link to="/ca">CA Program</Link></label>
                            </div> */}
                            <div className="signup-acc-checkbox">
                                <input type="checkbox" name="acc" id="signup-acc-checkbox-input" />
                                <label htmlFor="acc" className="signup-acc-checkbox-label">I'd like to avail accommodation at IIT Jodhpur campus.</label>
                            </div>
                            <input
                                type="text"
                                name="referral_code"
                                placeholder="Referral Code (If any)"
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email *"
                                required
                            />
                            <input
                                id="signup-form-password"
                                type="password"
                                name="password"
                                placeholder="Password *"
                                onKeyUp={handleConfirmPassword} 
                                required
                            />
                            <div className="signup-form-confirmpassword-container">
                                <input
                                    id="signup-form-confirmpassword"
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm Password *"
                                    onKeyUp={handleConfirmPassword} 
                                    required
                                />
                                <div id="signup-form-confirmpassword-warning">
                                    Passwords do not match!
                                </div>                                
                            </div>
                            <input
                                type="submit"
                                value="Submit"
                                id="signup-form-submit"
                            />
                            <br />
                        </form>
                        <div className="signup-alreadyAccount">
                            Already have an account?{" "}
                            <Link to="/login">Login</Link>
                        </div>
                    </div>
                </div>
            </div>
        </FadeIn>
    );
}

export default SignUp;
