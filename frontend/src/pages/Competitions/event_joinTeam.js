import { useState, useEffect, useContext } from 'react';
import { useSearchParams, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import './event_joinTeam.css';

import { backendURL } from '../../backendURL';
import AuthContext from "../../context/AuthContext";
import useAxios from "../../context/context_useAxios";
import FadeIn from '../../components/fadein';

// function MemberField(val, id, handleDelete) {
//     return (
//         <div className="joinTeam-member-field" id={`joinTeam-member-${val}`} key={id}>
//             <div className="joinTeam-member-field__top">
//                 <div className="joinTeam-member-field__title">Member {id}</div>
//                 <div className="joinTeam-member-field__remove"
//                     onClick={() => {
//                         const memberField = document.getElementById(`joinTeam-member-${val}`);
//                         memberField.remove();
//                         handleDelete(val);
//                     }}
//                 >
//                     Remove
//                 </div>
//             </div>
//             <input
//                 type="text"
//                 name="member_name"
//                 id="member_name"
//                 placeholder="Member Name"
//             />
//             <input
//                 type="email"
//                 name="member_email"
//                 id="member_email"
//                 placeholder="Member Email"
//             />
//             <input
//                 type="text"
//                 name="member_phone"
//                 id="member_phone"
//                 placeholder="Member Phone"
//             />
//         </div>
//     );
// }

export default function Event_joinTeam() {
    const { user } = useContext(AuthContext);
    const [eventInfo, setEventInfo] = useState([]);
    // const [membersCount, setMembersCount] = useState([]);
    const [urlParams] = useSearchParams();

    const location = useLocation();
    const api = useAxios();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            let headers = new Headers();
            headers.append("Content-Type", "application/json");
            headers.append("Accept", "application/json");
            headers.append("Origin", "http://localhost:3000");

            const requestOptions = {
                method: "GET",
                headers: headers,
            };

            const fetchURL = `${backendURL}/events/?id=${urlParams.get("id")}`;

            await fetch(fetchURL, requestOptions)
                .then((response) => response.json())
                .then((data) => {
                    // data = data.filter(
                    //     (item) => item.id == urlParams.get("id")
                    // );
                    setEventInfo(data[0]);
                    // setMembersCount([...Array.from({length: Math.max(1, data[0].min_team_size - 1)}, (_, index) => index + 1)])
                    console.log("Data:", data[0]);
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        }

        const card = location.state;
        if (card) {
            setEventInfo(card);
        } else {
            fetchData();
        }
    }, []);
    
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
            
            try {
                // console.log("Request Data:", requestData)
                const response = await api.post(
                    `${backendURL}/robowars/`,
                    requestData
                );
                if (response.status === 200) {
                    navigate("/robowars");
                    return response;
                } else {
                    throw(response.statusText)
                }
            } catch (err) {
                console.log(err);
            }
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
            <div className="joinTeam">
                <div className="joinTeam-container">
                    <div className="joinTeam-container-left">
                        <img src={
                            eventInfo.image ?
                            eventInfo.image.replace("0.0.0.0:8888", "apiv.prometeo.in") :
                            "https://cdn.dribbble.com/users/2217210/screenshots/11335904/media/db21aab2bd4867c51c4a0382f7c384ae.jpg"
                        } alt="Event Image" />
                    </div>
                    <div className="joinTeam-container-right">
                        <div className="joinTeam-container-right-title">
                            Join Team
                        </div>
                        <div className="joinTeam-container-right-subtitle">
                            {eventInfo.name}
                        </div>
                        <form className="joinTeam-form" onSubmit={handleSubmit}>
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
                            <div className="joinTeam-category-dropdown">
                                <label
                                    htmlFor="category"
                                    className="joinTeam-category-dropdown-label"
                                >
                                    Category
                                </label>
                                <select
                                    name="category"
                                    id="category"
                                    className="joinTeam-category-dropdown-select"
                                >
                                    <option
                                        className="joinTeam-category-option"
                                        selected
                                        disabled
                                        hidden
                                    >
                                        -- Select --
                                    </option>
                                    <option
                                        className="joinTeam-category-option"
                                        value="15kg"
                                    >
                                        15 Kg
                                    </option>
                                    <option
                                        className="joinTeam-category-option"
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
                                min={1}
                                max={5}
                                step={1}
                                required
                            />
                            {/* <div className='joinTeam-members'>
                                <div className='joinTeam-members-title'>
                                    Members
                                </div>
                                {membersCount.map((item, index) => MemberField(item, index+1, deleteMember))}
                                <div className='joinTeam-members-add' onClick={() => setMembersCount([...membersCount, membersCount[membersCount.length-1] + 1])}>
                                    +
                                </div>
                            </div> */}
                            <input
                                type="submit"
                                value="Submit"
                                id="joinTeam-form-submit"
                            />
                            <br />
                        </form>
                    </div>
                </div>
            </div>
        </FadeIn>
    )
}
