import { useState, useEffect, useContext } from 'react';
import { useSearchParams, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import './robowar_createTeam.css';

import { backendURL } from '../../../backendURL';
import AuthContext from "../../../context/AuthContext";
import useAxios from "../../../context/context_useAxios";
import FadeIn from '../../../components/fadein';

export default function Robowar_createTeam() {
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

        const rw_name = e.target.team_name.value;
        const rw_country = e.target.country.value;
        const bot_name = e.target.bot_name.value;
        const rw_category = e.target.category.value;
        const rw_leader = user.email;
        const rw_team_size = e.target.team_size.value;

        const postTeam = async (rw_name, rw_country, bot_name, rw_category, rw_leader, rw_team_size) => {
            const requestData = { rw_name, rw_country, bot_name, rw_category, rw_leader, rw_team_size }
            
            // try {
                // console.log("Request Data:", requestData)
                const response = await api.post(
                    `${backendURL}/createteamrw/`,
                    requestData
                );
                if (response.status === 201) {
                    navigate("/robowars");
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
            postTeam(rw_name, rw_country, bot_name, rw_category, rw_leader, rw_team_size)
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
            loading: "Creating Team...",
            success: "Team Created Successfully!",
            error: "Error Creating Team!",
        })
    }

    // const deleteMember = (val) => {
    //     setMembersCount(membersCount.filter((item) => item !== val));
    // }

    return (
        <FadeIn duration={500}>
            <div className="robowar_createTeam">
                <div className="robowar_createTeam-container">
                    <div className="robowar_createTeam-container-left">
                        <img src={
                            "https://cdn.dribbble.com/users/2217210/screenshots/11335904/media/db21aab2bd4867c51c4a0382f7c384ae.jpg"
                        } alt="Event Image" />
                    </div>
                    <div className="robowar_createTeam-container-right">
                        <div className="robowar_createTeam-container-right-title">
                            Create Team
                        </div>
                        <div className="robowar_createTeam-container-right-subtitle">
                            Robowars
                        </div>
                        <form className="robowar_createTeam-form" onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="team_name"
                                placeholder="Team Name *"
                                required
                            />
                            <input
                                type="text"
                                name="bot_name"
                                placeholder="Bot Name *"
                                required
                            />
                            <input
                                type="text"
                                name="country"
                                placeholder="Country *"
                                required
                            />
                            <div className="robowar_createTeam-category-dropdown">
                                <label
                                    htmlFor="category"
                                    className="robowar_createTeam-category-dropdown-label"
                                >
                                    Category
                                </label>
                                <select
                                    name="category"
                                    id="category"
                                    className="robowar_createTeam-category-dropdown-select"
                                >
                                    <option
                                        className="robowar_createTeam-category-option"
                                        selected
                                        disabled
                                        hidden
                                    >
                                        -- Select --
                                    </option>
                                    <option
                                        className="robowar_createTeam-category-option"
                                        value="15kg"
                                    >
                                        15 Kg
                                    </option>
                                    <option
                                        className="robowar_createTeam-category-option"
                                        value="60kg"
                                    >
                                        60 Kg
                                    </option>
                                </select>
                            </div>
                            <input
                                type="number"
                                name="team_size"
                                placeholder="Team Size *"
                                min={2}
                                max={20}
                                step={1}
                                required
                            />
                            {/* <div className='robowar_createTeam-members'>
                                <div className='robowar_createTeam-members-title'>
                                    Members
                                </div>
                                {membersCount.map((item, index) => MemberField(item, index+1, deleteMember))}
                                <div className='robowar_createTeam-members-add' onClick={() => setMembersCount([...membersCount, membersCount[membersCount.length-1] + 1])}>
                                    +
                                </div>
                            </div> */}
                            <input
                                type="submit"
                                value="Submit"
                                id="robowar_createTeam-form-submit"
                            />
                            <br />
                        </form>
                    </div>
                </div>
            </div>
        </FadeIn>
    )
}
