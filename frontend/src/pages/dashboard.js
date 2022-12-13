import { useEffect } from 'react';

import './dashboard.css';

function Dashboard() {
    useEffect(() => {
        const navBarEle = document.getElementById('navbar');
        navBarEle.style.opacity = 1;
    });

    return (
        <div className="dashboard">
            <div className="dashboard__container">
                <h1 style={{color: "white"}}>Dashboard</h1>
            </div>
        </div>
    );
}

export default Dashboard;
