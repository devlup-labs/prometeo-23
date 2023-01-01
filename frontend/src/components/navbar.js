// import { useState, useEffect } from 'react';
import { useRef, useEffect, useState, useContext } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";

import AuthContext from "../context/AuthContext";

import "./navbar.css";

import logo from "../assets/navbar/logo.gif";

const navBarLinks = [
  {
    name: "theme",
    text: "Theme",
    path: "/#theme",
    section: "left",
    tabIndex: 2,
  },
  {
    name: "speakers",
    text: "Speakers",
    path: "/past-speakers",
    section: "left",
    tabIndex: 3,
  },
  {
    name: "sponsors",
    text: "Sponsors",
    path: "/past-sponsors",
    section: "left",
    tabIndex: 4,
  },
  {
    name: "team",
    text: "Team",
    path: "/team",
    section: "left",
    tabIndex: 5,
  },
  {
    name: "ca",
    text: "CA",
    path: "/campus-ambassador",
    section: "right",
    tabIndex: 6,
  },
  {
    name: "accommodation",
    text: "Accommodation",
    path: "/accommodation",
    section: "right",
    tabIndex: 7,
  },
  {
    name: "events",
    text: "Competitions",
    path: "/competitions",
    section: "right",
    tabIndex: 8,
  },
  {
    name: "flagshipEvents",
    text: "Events",
    // path: "/robowar",
    section: "right",
    tabIndex: 9,
  },
  // {
  //   name: "robowars",
  //   text: "Robowars",
  //   path: "/robowars",
  //   section: "right",
  //   tabIndex: 9,
  // },
  // {
  // 	name: "drone_race",
  // 	text: "Drone Race",
  // 	path: "/drone_race",
  // 	section: "right",
  // 	tabIndex: 10,
  // },
  {
    name: "gallery",
    text: "Gallery",
    path: "/gallery",
    section: "right",
    tabIndex: 10,
  },
  // {
  //     name: "register",
  //     text: "Register",
  //     path: "/register",
  //     section: "right",
  //     tabIndex: 7,
  // },
  // {
  //     name: "preregister",
  //     text: "Pre-Register",
  //     path: "/pre-register",
  //     section: "right",
  //     tabIndex: 9,
  // },
  {
    name: "login",
    text: "Login",
    path: "/login",
    section: "right",
    tabIndex: 11,
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
const flagshipEventTypes = [
  { name: "RoboWars", type: "robowar", path: "/robowars" },
  { name: "Drone Race", type: "drone_race", path: "/dronerace" },
];

function Navbar() {
  const navbarRef = useRef(null);
  const [showIcons, setShowIcons] = useState(false);
  const { user, logoutUser } = useContext(AuthContext);
  // console.log("User: ", user);

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
        <div className="navbar-logo">
          <Link to="/" tabIndex={1}>
            <img
              id="navbar-logo-img"
              src={logo}
              alt="Prometeo Logo"
              onClick={() => {
                if (showIcons) {
                  setShowIcons(false);
                }
              }}
            />
          </Link>
        </div>
      </nav>

      <nav className="navbar-right-section">
        {navBarLinks.map((link) => {
          if (link.name === "theme") {
            return (
              <a href={link.path} key={link.name}>
                <div
                  className={`navbar-right-section-${link.name} navbar-link`}
                  tabIndex={link.tabIndex}
                >
                  {link.text}
                </div>
              </a>
            );
          } else if (link.name === "flagshipEvents") {
            /* else if (link.name === "events") {
									  return (
										  <div
											  className="dropdown dropdown-5"
											  key={link.name}
										  >
											  <div className="navbar-link">{link.text}</div>
											  <ul className="dropdown_menu dropdown_menu-5">
												  {eventTypes.map((item, index) => (
													  <Link
														  to={{
															  pathname: link.path,
															  search: `?type=${item.type}`,
														  }}
														  key={index}
													  >
														  <li
															  className={`dropdown_item-${
																  index + 1
															  }`}
														  >
															  {item.name}
														  </li>
													  </Link>
												  ))}
											  </ul>
										  </div>
									  );
								  } */
            return (
              <div className="dropdown dropdown-5" key={link.name}>
                <div className="navbar-link">{link.text}</div>
                <ul className="dropdown_menu dropdown_menu-5">
                  {flagshipEventTypes.map((item, index) => (
                    <Link
                      to={{
                        pathname: item.path,
                        // search: `{item.type}`,
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
          } else if (link.name === "preregister") {
            // return user ? null : (
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
            // );
          } else if (link.name === "login") {
            // console.log("While creating: ", user)
            return user ? (
              <Link to={"/dashboard"} key={"profile"}>
                <div
                  className={`navbar-right-section-profile navbar-link`}
                  tabIndex={link.tabIndex}
                >
                  {"Profile"}
                </div>
              </Link>
            ) : (
              <Link to={link.path} key={link.name}>
                <div
                  className={`navbar-right-section-${link.name} navbar-link`}
                  tabIndex={link.tabIndex}
                >
                  {link.text}
                </div>
              </Link>
            );
          } else {
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
          }
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
            if (link.name === "flagshipEvents")
              return (
                <div
                  style={{
                    width: "100%",
                    overflowX: "hidden",
                  }}
                  key={link.name}
                >
                  <div
                    className="dropdown dropdown-5"
                    key={link.name}
                    tabIndex={link.tabIndex}
                    // onClick={() => setShowIcons(false)}
                  >
                    <input type="checkbox" id="navbar-mobile-eventCheckbox" />
                    <label
                      id="navbar-mobile-eventLabel"
                      htmlFor="navbar-mobile-eventCheckbox"
                      className="navbar-mobile-link navbar-link"
                    >
                      {link.text}
                      {/* <label >{link.text}</label> */}
                    </label>
                    {/* {link.text} */}
                    <ul className="dropdown_menu dropdown_menu-5">
                      {flagshipEventTypes.map((item, index) => (
                        <Link
                          to={{
                            pathname: item.path,
                            // search: `?type=${item.type}`,
                          }}
                          key={index}
                          onClick={() => setShowIcons(false)}
                        >
                          <li
                            className={`dropdown_item-${index + 1}`}
                            onClick={() => {
                              const el = document.getElementsByClassName(
                                `dropdown_item-${index + 1}`
                              )[0];
                              el.classList.toggle("navbar-link-active");
                            }}
                          >
                            {item.name}
                          </li>
                        </Link>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            else if (link.name === "login") {
              return user ? (
                <Link to={"/dashboard"} key={"profile"}>
                  <div
                    className={`navbar-right-section-profile navbar-link`}
                    tabIndex={link.tabIndex}
                    onClick={() => setShowIcons(false)}
                  >
                    {"Profile"}
                  </div>
                </Link>
              ) : (
                <Link to={link.path} key={link.name}>
                  <div
                    className={`navbar-mobile-link navbar-link`}
                    tabIndex={link.tabIndex}
                    onClick={() => setShowIcons(false)}
                  >
                    {link.text}
                  </div>
                </Link>
              );
            } else if (link.name === "preregister") {
              return user ? null : (
                <Link to={link.path} key={link.name}>
                  <div
                    className={`navbar-mobile-link navbar-link`}
                    tabIndex={link.tabIndex}
                    onClick={() => setShowIcons(false)}
                  >
                    {link.text}
                  </div>
                </Link>
              );
            } else
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
          })}
      </div>
    </div>
  );
}

{
  /* <input type="checkbox" id="drop-1"/>
					  <ul>
						  {eventTypes.map((item, index) => (
							  <Link to={{ pathname: link.path, search: `?type=${item.type}` }} key={index}>
								  <li>{item.name}</li>
							  </Link>
						  ))}
					  </ul>  */
}

export default Navbar;
