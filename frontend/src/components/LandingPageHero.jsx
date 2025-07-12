import React from "react";
import "../styles/LandingHero.css";

export default function LandingPageHero() {
	return (
		<section className="hero-section">
			<div className="hero-content">
				<div className="hero-text">
					<h1 className="hero-title">
						Take home a new furry friend
						<span className="paw-prints">
							<span className="paw-print">🐾</span>
							<span className="paw-print">🐾</span>
						</span>
					</h1>
					<p className="hero-subtitle">
						Find your perfect companion from local shelters and give a loving pet a forever home.
					</p>
				</div>
				<div className="hero-image">
					<div className="pet-illustration">
						<div className="pet-shape pet-head"></div>
						<div className="pet-shape pet-ear-left"></div>
						<div className="pet-shape pet-ear-right"></div>
						<div className="pet-shape pet-body"></div>
						<div className="pet-shape pet-paw"></div>
					</div>
				</div>
			</div>
		</section>
	);
};
