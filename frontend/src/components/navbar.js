// import { useState, useEffect } from 'react';
import { useRef, useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import "./navbar.css";

import PrometeoLogo from "../assets/navbar/prometeo_logo_23.png";

const navBarLinks = [
  {
    name: "theme",
    text: "Theme",
    path: "#theme",
    section: "left",
    tabIndex: 2,
  },
  {
    name: "speakers",
    text: "Past Speakers",
    path: "/past-speakers",
    section: "left",
    tabIndex: 3,
  },
  {
    name: "sponsors",
    text: "Past Sponsors",
    path: "/past-sponsors",
    section: "left",
    tabIndex: 4,
  },
  // {
  //   name: "team",
  //   text: "Team",
  //   path: "/team",
  //   section: "left",
  //   tabIndex: 5,
  // },
  {
    name: "events",
    text: "Events",
    path: "/events",
    section: "right",
    tabIndex: 6,
  },
  {
    name: "gallery",
    text: "Gallery",
    path: "/gallery",
    section: "right",
    tabIndex: 7,
  },
  // { name: 'register', text: 'Register', path: '/register', section: 'right', tabIndex: 7 },
  {
    name: "preregister",
    text: "Pre-Register",
    path: "/pre-register",
    section: "right",
    tabIndex: 8,
  },
  {
    name: "login",
    text: "Login",
    path: "/login",
    section: "right",
    tabIndex: 9,
  },
];

// live technical informal entrepreneurial workshops poster_presentation panel_discussion exhibition
const eventTypes = [
  // { name: "Live events", type: "live" },
  { name: "Technical events", type: "technical" },
  { name: "Informal events", type: "informal" },
  { name: "Entrepreneurial events", type: "entrepreneurial" },
  { name: "Workshops", type: "workshop" },
  { name: "Poster Presentation", type: "poster_presentation" },
  { name: "Panel Discussion", type: "panel_discussion" },
  { name: "Tech Carnival", type: "exhibition" },
];

function Navbar() {
  const navbarRef = useRef(null);
  const [showIcons, setShowIcons] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setShowIcons(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navbarRef, showIcons, setShowIcons]);

  return (
    <div id="navbar" ref={navbarRef}>
      <nav className="navbar-left-section">
        {/* theme, speakers, sponsors */}
        {navBarLinks
          .filter((link) => link.section === "left")
          .map((link) => {
            if (link.name === "theme") {
              return (
                <a href={link.path} key={link.name}>
                  <div
                    className={`navbar-left-section-${link.name} navbar-link`}
                    tabIndex={link.tabIndex}
                  >
                    {link.text}
                  </div>
                </a>
              )
            } else return (
              <Link to={link.path} key={link.name}>
                <div
                  className={`navbar-left-section-${link.name} navbar-link`}
                  tabIndex={link.tabIndex}
                >
                  {link.text}
                </div>
              </Link>
            );
          })}
      </nav>

      <div className="navbar-logo">
        <a href="#home" tabIndex={1}>
          <img
            id="navbar-logo-img"
            src={PrometeoLogo}
            alt="Prometeo Logo"
            onClick={() => {
              if (showIcons) {
                setShowIcons(false);
              }
            }}
          />
        </a>
      </div>

      <nav className="navbar-right-section">
        {/* past events, gallery, pre-register, login */}

        {navBarLinks
          .filter((link) => link.section === "right")
          .map((link) => {
            if (link.name !== "events")
              return (
                <Link to={link.path} key={link.name}>
                  <div
                    className={`navbar-right-section-${link.name} navbar-link`}
                    tabIndex={link.tabIndex}
                  >
                    {link.text}
                  </div>
                </Link>
              );
            else
              return (
                <div className="dropdown dropdown-5" key={link.name}>
                  <div className="navbar-link">{link.text}</div>
                  {/* {link.text} */}
                  <ul className="dropdown_menu dropdown_menu-5">
                    {eventTypes.map((item, index) => (
                      <Link
                        to={{
                          pathname: link.path,
                          search: `?type=${item.type}`,
                        }}
                        key={index}
                      >
                        <li className={`dropdown_item-${index + 1}`}>
                          {item.name}
                        </li>
                      </Link>
                    ))}
                  </ul>
                </div>
              );
          })}
      </nav>

      <div className="hamburger-menu">
        <GiHamburgerMenu
          className="hamburger-menu-svg"
          onClick={() => setShowIcons(!showIcons)}
        />
      </div>

		{/* helooooo */}

      <div className="navbar-mobile">
        {showIcons &&
          navBarLinks.map((link) => {
            if (link.name !== "events")
              return (
                <Link
                  to={link.path}
                  key={link.name}
                  onClick={() => setShowIcons(false)}
                >
                  <div className={`navbar-mobile-link navbar-link`}>
                    {link.text}
                  </div>
                </Link>
              );
            else
              return (
                <div key={link.name}>
                  <div className="dropdown dropdown-5" key={link.name}>
                  <div className="navbar-mobile-link navbar-link">{link.text}</div>
                  {/* {link.text} */}
                  <ul className="dropdown_menu dropdown_menu-5">
                    {eventTypes.map((item, index) => (
                      <Link
                        to={{
                          pathname: link.path,
                          search: `?type=${item.type}`,
                        }}
                        key={index}
						onClick={() => setShowIcons(false)}
                      >
                        <li className={`dropdown_item-${index + 1}`} onClick={() => {
                          const el = document.getElementsByClassName(`dropdown_item-${index + 1}`)[0];
                          el.classList.toggle('navbar-link-active');
                        }}>
                          {item.name}
                        </li>
                      </Link>
                    ))}
                  </ul>
                </div>
                </div>
              );
          })}
      </div>
    </div>
  );
}

{/* <input type="checkbox" id="drop-1"/>
                    <ul>
                        {eventTypes.map((item, index) => (
							<Link to={{ pathname: link.path, search: `?type=${item.type}` }} key={index}>
								<li>{item.name}</li>
							</Link>
						))}
                    </ul>  */}

export default Navbar;
