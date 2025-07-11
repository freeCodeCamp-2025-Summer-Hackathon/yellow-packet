import React from "react";
import "../styles/Footer.css";
import { Link } from "react-router-dom";

export default function Footer() {
	return (
		<>
			<div className="main-footer">
				<div className="footer-left">
					<Link to="/contact">Contact Us</Link>
				</div>
				<div className="footer-right">
					<span>© 2025 Pet Match</span>
				</div>
			</div>
		</>
	);
};
