// import { useState, useEffect } from 'react';
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from 'react-router-dom'
import './navbar.css'

import PrometeoLogo from '../assets/navbar/prometeo_logo_23.png'


function Navbar() {
  const [showIcons, setShowIcons] = useState(false);
    return (
      <div id="navbar">
        <nav
          className={
            showIcons
              ? "mobile-left-menu-link"
              : "navbar-left-section"
          }
        >
          {/* speakers, sponsors, events */}
          <Link to="/theme">
            <div className="navbar-left-section-theme navbar-link">Theme</div>
          </Link>
          <Link to="/past-speakers">
            <div className="navbar-left-section-speakers navbar-link">
              Past Speakers
            </div>
          </Link>
          <Link to="/past-sponsors">
            <div className="navbar-left-section-sponsors navbar-link">
              Past Sponsors
            </div>
          </Link>
        </nav>

        <div className="navbar-logo">
          <Link to="/">
            <img id="navbar-logo-img" src={PrometeoLogo} alt="Prometeo Logo" />
          </Link>
        </div>

        <nav
          className={
            showIcons
              ? "mobile-right-menu-link"
              : "navbar-right-section"
          }
        >
          {/* gallery, theme, register, login */}
          <Link to="/past-events">
            <div className="navbar-right-section-events navbar-link">
              Past Events
            </div>
          </Link>
          <Link to="/gallery">
            <div className="navbar-right-section-gallery navbar-link">
              Gallery
            </div>
          </Link>
          <Link to="/register">
            <div className="navbar-right-section-register navbar-link">
              Register
            </div>
          </Link>
          <Link to="/login">
            <div className="navbar-right-section-login">Login</div>
          </Link>
        </nav>

        <div className="hamburger-menu">
          <a href="#" onClick={() => setShowIcons(!showIcons)}>
            <GiHamburgerMenu />
          </a>
        </div>
      </div>
    );
}

export default Navbar;