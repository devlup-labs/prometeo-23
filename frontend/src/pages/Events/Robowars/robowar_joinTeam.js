import { useState, useEffect, useContext } from 'react';
import { useSearchParams, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import './robowar_joinTeam.css';

import { backendURL } from '../../../backendURL';
import AuthContext from "../../../context/AuthContext";
import useAxios from "../../../context/context_useAxios";
import FadeIn from '../../../components/fadein';

export default function Robowar_joinTeam() {
    const { user } = useContext(AuthContext);

    const location = useLocation();
    const api = useAxios();
    const navigate = useNavigate();
    
    useEffect(() => {
        const navBarEle = document.getElementById("navbar");
        navBarEle.style.opacity = 1;
        document.body.style.overflow = "auto";
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // const rw_id = e.target.team_id.value;
        const rw_name = e.target.rw_name.value;
        // const rw_country = e.target.country.value;
        // const bot_name = e.target.bot_name.value;
        // const rw_category = e.target.category.value;
        // const rw_leader = user.email;
        // const rw_team_size = e.target.team_size.value;

        const postTeam = async (rw_name) => {
            const requestData = { rw_name}
            
            // try {
                // console.log("Request Data:", requestData)
                const response = await api.post(
                    `${backendURL}/updateteamrw/`,
                    requestData
                );
                if (response.status === 200) {
                    navigate("/robowars");
                    return response;
                } else {
                    throw(response.statusText)
                }
            // } catch (err) {
            //     console.log(err);
            // }
        }

        const myPromise = new Promise((resolve, reject) => {
            postTeam(rw_name)
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
            loading: "Joining Team...",
            success: "Joined Successfully!",
            // on error show response message
            error: (err) => {
                return err;
            },
        })
    }

    // const deleteMember = (val) => {
    //     setMembersCount(membersCount.filter((item) => item !== val));
    // }

    return (
        <FadeIn duration={500}>
            <div className="robowar_joinTeam">
                <div className="robowar_joinTeam-container">
                    <div className="robowar_joinTeam-container-left">
                        <img src={
                            "https://cdn.dribbble.com/users/2217210/screenshots/11335904/media/db21aab2bd4867c51c4a0382f7c384ae.jpg"
                        } alt="Event Image" />
                    </div>
                    <div className="robowar_joinTeam-container-right">
                        <div className="robowar_joinTeam-container-right-title">
                            Join Team
                        </div>
                        <div className="robowar_joinTeam-container-right-subtitle">
                            Robowar
                        </div>
                        <form className="robowar_joinTeam-form" onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="rw_name"
                                placeholder="Enter team ID *"
                                required
                            />
                            <input
                                type="submit"
                                value="Submit"
                                id="robowar_joinTeam-form-submit"
                            />
                            <br />
                        </form>
                    </div>
                </div>
            </div>
        </FadeIn>
    )
}
