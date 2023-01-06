import { useEffect } from 'react';
import { toast } from 'react-toastify';

import './preRegistration.css';
import FadeIn from "../components/fadein";

import PreRegistrationImg from '../assets/preRegistrationPage/pre-registration.png';
import PreRegistrationSuccessGIF from '../assets/preRegistrationPage/pre-registration-success.gif';

import { backendURL } from '../backendURL';

function PreRegistration() {
    useEffect(
        () => {
            const navBarEle = document.getElementById("navbar")
            navBarEle.style.opacity = 1;
        }
    )

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
        }

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Origin', 'http://localhost:3000');

        const requestOptions = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data),
        }

        // console.log("Submitted")

        fetch(`${backendURL}/preregistration/`, requestOptions)
            .then(response => {
                // console.log(response.status)
                if (response.status === 201) {
                    toast.success("Registered Successfully!");
                    const formTitleEle = document.getElementsByClassName("preRegistration-container-right-title")[0];
                    const formEle = document.getElementsByClassName("preRegistration-form")[0];
                    const successEle = document.getElementsByClassName("preRegistration-form-success")[0];
                    formTitleEle.style.opacity = 0;
                    formEle.style.opacity = 0;
                    successEle.style.opacity = 1;

                    const successGIFEle = document.getElementsByClassName("preRegistration-form-success-gif")[0];
                    successGIFEle.src = PreRegistrationSuccessGIF;
                    
                    setTimeout(() => {
                        formEle.style.visibility = "hidden";
                        formTitleEle.style.visibility = "hidden";
                    }, 500);
                }
                else if (response.status === 400) {
                    toast.info("You have already registered!");
                }
                else {
                    toast.error("Something went wrong!");
                }

                return response.json();
            })
            .then(data => {
                // console.log("Data: ", data);
            })
            .catch(error => {
                console.log("Error: ", error);
            })
    }

    return (
        <FadeIn duration={500}>
            <div className="preRegistration">
                <div className="preRegistration-container">
                    <div className="preRegistration-container-left" style={{
                        // backgroundImage: `url(${PreRegistrationImg})`,
                    }}>
                        <img src={PreRegistrationImg} alt="Pre-Registration" />
                    </div>
                    <div className='preRegistration-container-right'>
                        <div className="preRegistration-container-right-title">
                            Pre-Registration
                        </div>
                        <form className="preRegistration-form" onSubmit={handleSubmit}>
                            <input type="text" placeholder="Full Name" name="full_name" required />
                            <input type="email" placeholder="Email" name="email" required />
                            <input type="tel" placeholder="Phone Number" name="phone_number" required
                                pattern="[6-9]{1}[0-9]{9}"
                                onInput={(e) => {
                                    e.target.setCustomValidity('');
                                }}
                                onInvalid={(e) => {
                                    e.target.setCustomValidity('Please enter a valid phone number e.g. 9876543210');
                                }}
                            />
                            <input type="text" placeholder="College Name" name="college_name" required />
                            <div className="preRegistration-state-dropdown">
                                <label htmlFor="state" className="preRegistration-state-dropdown-label">State</label>
                                <select name="state" id="state" className="preRegistration-state-dropdown-select">
                                    <option className="preRegistration-state-option" value="Andaman-and-Nicobar-Islands">Andaman and Nicobar</option>
                                    <option className="preRegistration-state-option" value="Andhra-Pradesh">Andhra Pradesh</option>
                                    <option className="preRegistration-state-option" value="Arunachal-Pradesh">Arunachal Pradesh</option>
                                    <option className="preRegistration-state-option" value="Assam">Assam</option>
                                    <option className="preRegistration-state-option" value="Bihar">Bihar</option>
                                    <option className="preRegistration-state-option" value="Chandigarh">Chandigarh</option>
                                    <option className="preRegistration-state-option" value="Chhattisgarh">Chhattisgarh</option>
                                    <option className="preRegistration-state-option" value="Dadra-and-Nagar-Haveli">Dadra and Nagar Haveli</option>
                                    <option className="preRegistration-state-option" value="Daman-and-Diu">Daman and Diu</option>
                                    <option className="preRegistration-state-option" value="Delhi">Delhi</option>
                                    <option className="preRegistration-state-option" value="Goa">Goa</option>
                                    <option className="preRegistration-state-option" value="Gujarat">Gujarat</option>
                                    <option className="preRegistration-state-option" value="Haryana">Haryana</option>
                                    <option className="preRegistration-state-option" value="Himachal-Pradesh">Himachal Pradesh</option>
                                    <option className="preRegistration-state-option" value="Jammu-and-Kashmir">Jammu and Kashmir</option>
                                    <option className="preRegistration-state-option" value="Jharkhand">Jharkhand</option>
                                    <option className="preRegistration-state-option" value="Karnataka">Karnataka</option>
                                    <option className="preRegistration-state-option" value="Kerala">Kerala</option>
                                    <option className="preRegistration-state-option" value="Lakshadweep">Lakshadweep</option>
                                    <option className="preRegistration-state-option" value="Madhya-Pradesh">Madhya Pradesh</option>
                                    <option className="preRegistration-state-option" value="Maharashtra">Maharashtra</option>
                                    <option className="preRegistration-state-option" value="Manipur">Manipur</option>
                                    <option className="preRegistration-state-option" value="Meghalaya">Meghalaya</option>
                                    <option className="preRegistration-state-option" value="Mizoram">Mizoram</option>
                                    <option className="preRegistration-state-option" value="Nagaland">Nagaland</option>
                                    <option className="preRegistration-state-option" value="Odisha">Odisha</option>
                                    <option className="preRegistration-state-option" value="Puducherry">Puducherry</option>
                                    <option className="preRegistration-state-option" value="Punjab">Punjab</option>
                                    <option className="preRegistration-state-option" value="Rajasthan">Rajasthan</option>
                                    <option className="preRegistration-state-option" value="Sikkim">Sikkim</option>
                                    <option className="preRegistration-state-option" value="Tamil-Nadu">Tamil Nadu</option>
                                    <option className="preRegistration-state-option" value="Telangana">Telangana</option>
                                    <option className="preRegistration-state-option" value="Tripura">Tripura</option>
                                    <option className="preRegistration-state-option" value="Uttar-Pradesh">Uttar Pradesh</option>
                                    <option className="preRegistration-state-option" value="Uttarakhand">Uttarakhand</option>
                                    <option className="preRegistration-state-option" value="West-Bengal">West Bengal</option>
                                </select>
                            </div>
                            <div className="preRegistration-collegeYear-dropdown">
                                <label htmlFor="collegeYear" className="preRegistration-collegeYear-dropdown-label">College Year</label>
                                <select name="collegeYear" id="collegeYear" className="preRegistration-collegeYear-dropdown-select">
                                    <option className="preRegistration-collegeYear-option" value="first-year">First Year</option>
                                    <option className="preRegistration-collegeYear-option" value="second-year">Second Year</option>
                                    <option className="preRegistration-collegeYear-option" value="third-year">Third Year</option>
                                    <option className="preRegistration-collegeYear-option" value="fourth-year">Fourth Year</option>
                                    <option className='preRegistration-collegeYear-option' value="not-applicable">Not Applicable</option>
                                </select>
                            </div>
                            {/* <input type="text" placeholder='Position of Responsibility (POR)' name="position_of_responsibility" />
                            <input type="text" placeholder='Contact of any POR Holder' name="contact_of_any_por_holder" /> */}

                            <input type="submit" value="Submit" id="preRegistration-form-submit" />
                        </form>
                        <div className="preRegistration-form-success">
                            <img className="preRegistration-form-success-gif"></img>
                            <div className="preRegistration-form-success-text">We're thrilled to have you onboard!</div>
                        </div>
                    </div>
                </div>
            </div>
        </FadeIn>
    );
}

export default PreRegistration;
