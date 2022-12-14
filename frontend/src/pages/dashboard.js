import { useEffect, useContext } from 'react';

import './dashboard.css';

import AuthContext from '../context/AuthContext'

import rocketImg from '../assets/icons/rocket.png';

const registered_events = [
    {
        name: 'Event 1',
        date: 'Date 1',
        image: 'https://cdn.dribbble.com/users/6234/screenshots/16070942/media/a810368884a6fba842788d144ff70a51.png?compress=1&resize=1000x750&vertical=top',
    },
    {
        name: 'Event 2',
        date: 'Date 2',
        image: 'https://cdn.dribbble.com/users/6234/screenshots/16070942/media/a810368884a6fba842788d144ff70a51.png?compress=1&resize=1000x750&vertical=top',
    },
    {
        name: 'Event 3',
        date: 'Date 3',
        image: 'https://cdn.dribbble.com/users/6234/screenshots/16070942/media/a810368884a6fba842788d144ff70a51.png?compress=1&resize=1000x750&vertical=top',
    },
    {
        name: 'Event 4',
        date: 'Date 4',
        image: 'https://cdn.dribbble.com/users/6234/screenshots/16070942/media/a810368884a6fba842788d144ff70a51.png?compress=1&resize=1000x750&vertical=top',
    },
    {
        name: 'Event 5',
        date: 'Date 5',
        image: 'https://cdn.dribbble.com/users/6234/screenshots/16070942/media/a810368884a6fba842788d144ff70a51.png?compress=1&resize=1000x750&vertical=top',
    },
    {
        name: 'Event 6',
        date: 'Date 6',
        image: 'https://cdn.dribbble.com/users/6234/screenshots/16070942/media/a810368884a6fba842788d144ff70a51.png?compress=1&resize=1000x750&vertical=top',
    },
    {
        name: 'Event 7',
        date: 'Date 7',
        image: 'https://cdn.dribbble.com/users/6234/screenshots/16070942/media/a810368884a6fba842788d144ff70a51.png?compress=1&resize=1000x750&vertical=top',
    },
    {
        name: 'Event 8',
        date: 'Date 8',
        image: 'https://cdn.dribbble.com/users/6234/screenshots/16070942/media/a810368884a6fba842788d144ff70a51.png?compress=1&resize=1000x750&vertical=top',
    },
    {
        name: 'Event 9',
        date: 'Date 9',
        image: 'https://cdn.dribbble.com/users/6234/screenshots/16070942/media/a810368884a6fba842788d144ff70a51.png?compress=1&resize=1000x750&vertical=top',
    },
    {
        name: 'Event 10',
        date: 'Date 10',
        image: 'https://cdn.dribbble.com/users/6234/screenshots/16070942/media/a810368884a6fba842788d144ff70a51.png?compress=1&resize=1000x750&vertical=top',
    },
]

function Dashboard() {
    const { user, logoutUser } = useContext(AuthContext);
    console.log(user)

    useEffect(() => {
        const navBarEle = document.getElementById('navbar');
        navBarEle.style.opacity = 1;
    });

    return (
        <div id="dashboard-container">
            <div id="dashboard">
                <div id="dashboard-top">
                    <div id="dashboard-top-left">
                        Dashboard
                    </div>
                    <div id="dashboard-top-right" onClick={logoutUser}>
                        Logout
                    </div>
                </div>
                <div id="dashboard-middle">
                    <div id="dashboard-middle-left">
                        <div id="dashboard-pass">
                            <div id="dashboard-pass-container">
                                <div id="dashboard-pass-left">
                                    <div id="dashboard-pass-left-title">
                                        TICKET
                                    </div>
                                    <div id="dashboard-pass-left-image">
                                        <img src={rocketImg} alt="pass" />
                                    </div>
                                </div>
                                <div id="dashboard-pass-right">
                                    <div id="dashboard-pass-right-title">
                                        {"Prometeo '23"}
                                    </div>
                                    <div id="dashboard-pass-right-content">
                                        {"You have not purchased any pass :("}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="dashboard-personalDetails">
                            <div id="dashboard-personalDetails-title">
                                Personal Details
                            </div>
                            <div id="dashboard-personalDetails-content">
                                <div className="dashboard-personalDetails-content-title">
                                    Name: <span className="dashboard-personalDetails-content-value">{user.username}</span>
                                </div>
                                <div className="dashboard-personalDetails-content-title">
                                    Email: <span className="dashboard-personalDetails-content-value">{user.email}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="dashboard-registeredEvents">
                        <div id="dashboard-registeredEvents-title">
                            Registered Events
                        </div>
                        <div id="dashboard-registeredEvents-content">
                            {
                                ([].length > 0) ?
                                registered_events.map((event, index) => {
                                    return (
                                        <div className="dashboard-registeredEvents-content-event" key={index}>  
                                            <div className="dashboard-registeredEvents-content-event-image">
                                                <img src={event.image} alt="Event Image" />
                                            </div>
                                            <div className="dashboard-registeredEvents-content-event-details">
                                                <div className="dashboard-registeredEvents-content-event-title">
                                                    {event.name}
                                                </div>
                                                <div className="dashboard-registeredEvents-content-event-date">
                                                    {event.date}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }) :
                                <div id="dashboard-registeredEvents-noEvent">
                                    You have not registered for any event!
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
