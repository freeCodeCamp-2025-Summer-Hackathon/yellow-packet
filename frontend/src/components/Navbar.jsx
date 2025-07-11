import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

export default function Navbar() {

	return (
		<div className="main-navbar">
			<nav>
				<ul className="nav-links">
					<li><Link to="/">Home</Link></li>
					<li><Link to="/browse">Browse Pets</Link></li>
					<li><Link to="/shelters">Shelters</Link></li>
					<li><Link to="/about">About</Link></li>
				</ul>
			</nav>
		</div>
	);
}
