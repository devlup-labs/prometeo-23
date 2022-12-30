import { useState, useEffect, useContext } from 'react';
import { useSearchParams, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import './dronerace_register.css';

import { backendURL } from '../../../backendURL';
import AuthContext from "../../../context/AuthContext";
import useAxios from "../../../context/context_useAxios";
import FadeIn from '../../../components/fadein';

export default function Dronerace_Register() {
    const { user } = useContext(AuthContext);
    
    const api = useAxios();
    const navigate = useNavigate();
    
    useEffect(() => {
        const navBarEle = document.getElementById("navbar");
        navBarEle.style.opacity = 1;
        document.body.style.overflow = "auto";
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const rw_name = e.target.drone_name.value;
        const email = user.email;

        const postTeam = async (rw_name, email) => {
            const requestData = { rw_name, email }
            
            // try {
                // console.log("Request Data:", requestData)
                const response = await api.post(
                    `${backendURL}/createteamrw/`,
                    requestData
                );
                if (response.status === 201) {
                    navigate("/dronerace");
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
            postTeam(rw_name, email)
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

    // const deleteMember = (val) => {
    //     setMembersCount(membersCount.filter((item) => item !== val));
    // }

    return (
        <FadeIn duration={500}>
            <div className="dronerace_register">
                <div className="dronerace_register-container">
                    <div className="dronerace_register-container-left">
                        <img src={
                            "https://cdn2.unrealengine.com/egs-thedroneracingleaguesimulator-thedroneracingleague-g1a-03-1920x1080-d178ef71f4cf.jpg"
                        } alt="Event Image" />
                    </div>
                    <div className="dronerace_register-container-right">
                        <div className="dronerace_register-container-right-title">
                            Register
                        </div>
                        <div className="dronerace_register-container-right-subtitle">
                            Drone Race
                        </div>
                        <form className="dronerace_register-form" onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="drone_name"
                                placeholder="Drone Name *"
                                required
                            />
                            <input
                                type="submit"
                                value="Submit"
                                id="dronerace_register-form-submit"
                            />
                            <br />
                        </form>
                    </div>
                </div>
            </div>
        </FadeIn>
    )
}
