import { Link } from 'react-router-dom'

import './navbar.css'

import PrometeoLogo from '../assets/navbar/prometeo_logo_23.png'

export default function Navbar() {
    return (
        <div id="navbar">
            <div className="navbar-left-section">
                {/* speakers, sponsors, events */}
                <Link to="/theme">
                    <div className="navbar-left-section-theme navbar-link">Theme</div>
                </Link>
                <Link to="/speakers">
                    <div className="navbar-left-section-speakers navbar-link">Speakers</div>
                </Link>
                <Link to="/sponsors">
                    <div className="navbar-left-section-sponsors navbar-link">Sponsors</div>
                </Link>
            </div>
            <div className="navbar-logo">
                <Link to="/">
                    <img id="navbar-logo-img" src={PrometeoLogo} alt="Prometeo Logo" />
                </Link>
            </div>
            <div className='navbar-right-section'>
                {/* gallery, theme, register, login */}
                <Link to="/events">
                    <div className="navbar-right-section-events navbar-link">Events</div>
                </Link>
                <Link to="/gallery">
                    <div className="navbar-right-section-gallery navbar-link">Gallery</div>
                </Link>
                <Link to="/register">
                    <div className="navbar-right-section-register navbar-link">Register</div>
                </Link>
                <Link to="/login">
                    <div className="navbar-right-section-login">Login</div>
                </Link>
            </div>
        </div>
    )
}