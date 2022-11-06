import './navbar.css'

import PrometeoLogo from '../assets/navbar/prometeo_logo_23.png'

export default function Navbar() {
    return (
        <div id="navbar">
            <div className="navbar-left-section">
                {/* speakers, sponsors, events */}
                <div className="navbar-left-section-speakers">Speakers</div>
                <div className="navbar-left-section-sponsors">Sponsors</div>
                <div className="navbar-left-section-events">Events</div>
            </div>
            <div className="navbar-logo">
                <img id="navbar-logo-img" src={PrometeoLogo} alt="Prometeo Logo" />
            </div>
            <div className='navbar-right-section'>
                {/* gallery, theme, register, login */}
                <div className="navbar-right-section-gallery">Gallery</div>
                <div className="navbar-right-section-theme">Theme</div>
                <div className="navbar-right-section-register">Register</div>
                <div className="navbar-right-section-login">Login</div>
            </div>
        </div>
    )
}