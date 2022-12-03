// import { useState, useEffect } from 'react';
import { useRef, useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from 'react-router-dom'
import './navbar.css'

import PrometeoLogo from '../assets/navbar/prometeo_logo_23.png'

const navBarLinks = [
	{ name: 'theme', text: 'Theme', path: '/theme', section: 'left', tabIndex: 2 },
	{ name: 'speakers', text: 'Past Speakers', path: '/past-speakers', section: 'left', tabIndex: 3 },
	{ name: 'sponsors', text: 'Past Sponsors', path: '/past-sponsors', section: 'left', tabIndex: 4 },
	{ name: 'events', text: 'Past Events', path: '/past-events', section: 'right', tabIndex: 5 },
	{ name: 'gallery', text: 'Gallery', path: '/gallery', section: 'right', tabIndex: 6 },
	// { name: 'register', text: 'Register', path: '/register', section: 'right', tabIndex: 7 },
	{ name: 'preregister', text: 'Pre-Register', path: '/pre-register', section: 'right', tabIndex: 7 },
	{ name: 'login', text: 'Login', path: '/login', section: 'right', tabIndex: 8 },
]

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
				{/* speakers, sponsors, events */}
				{
					navBarLinks.filter(link => link.section === 'left').map(link => (
						<Link to={link.path} key={link.name} >
							<div className={`navbar-left-section-${link.name} navbar-link`} tabIndex={link.tabIndex}>
								{link.text}
							</div>
						</Link>
					))
				}
			</nav>

			<div className="navbar-logo">
				<Link to="/" tabIndex={1}>
					<img id="navbar-logo-img" src={PrometeoLogo} alt="Prometeo Logo" onClick={() => {
						if (showIcons) {
							setShowIcons(false);
						}
					}} />
				</Link>
			</div>

			<nav className="navbar-right-section">
				{/* gallery, theme, register, login */}
				{
					navBarLinks.filter(link => link.section === 'right').map(link => (
						<Link to={link.path} key={link.name} >
							<div className={`navbar-right-section-${link.name} navbar-link`} tabIndex={link.tabIndex}>
								{link.text}
							</div>
						</Link>
					))
				}
			</nav>

			<div className="hamburger-menu">
				<GiHamburgerMenu className="hamburger-menu-svg" onClick={() => setShowIcons(!showIcons)} />
			</div>

			<div className="navbar-mobile">
				{
					showIcons
					&&
					navBarLinks.map(link => (
						<Link to={link.path} key={link.name} onClick={() => setShowIcons(false)}>
							<div className={`navbar-mobile-link navbar-link`}>
								{link.text}
							</div>
						</Link>
					))
				}
			</div>
		</div>
	);
}

export default Navbar;