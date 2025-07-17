/* PetProfile.jsx */

import Header from '../components/Header';
import Navbar from '../components/Navbar';
import "../styles/PetProfile.css";
import { Link } from "react-router-dom";
import cat_1 from "../images/cat_1.jpg"
import cat_2 from "../images/cat_2.jpg"
import cat_3 from "../images/cat_3.jpg"
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function PetProfile(user) {

	console.log("Welcome this pet to your home, ", user); // if you need to know who the user is?
	
	// sample data for testing
	const pet = {
		name: "Leo",
		id: 2048,
		species: "Cat",
		sex: "Male",
		birthday: "3/15/2022",
		age: 3,
		shelter: "Shelter Name Here",
		disabilities: "None",
		personality: "Social Butterfly",
		about1: "I’m just a silly cat who is very smart, and friendly!",
		about2: "I am nice and I love to play with kids!",
		images: [cat_1, cat_2, cat_3],
	}

	const [isFavorite, setIsFavorite] = useState(true);

	const [currentIndex, setCurrentIndex] = useState(0);

	const handlePrev = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === 0 ? pet.images.length - 1 : prevIndex - 1
		);
	};

	const handleNext = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === pet.images.length - 1 ? 0 : prevIndex + 1
		);
	};

	const toggleFavorite = () => {
		setIsFavorite((prev) => !prev);
	};

	const navigate = useNavigate();

	const handleEdit = () => {
		navigate(`/edit/${pet.id}`);
	};

	const handleDelete = () => {
		navigate(`/delete/${pet.id}`);
	};

	return (
		<>
			<div>
				<Header />
				<Navbar />
				<div className="pet-profile-container">
					<Link to="/browse" className="back-link">← Back to Browse</Link>
					
					<div className="pet-profile-grid">
						{/* Left Side */}
						<div className="pet-profile-left">
							<div className="image-carousel">
								<div className="carousel-wrapper">
									<button className="left-arrow" onClick={handlePrev} aria-label="Previous Image">‹</button>
									<img src={pet.images[currentIndex]} alt={pet.name} className="pet-photo" />
									<button className="right-arrow" onClick={handleNext} aria-label="Next Image">›</button>
									</div>
									<div className="carousel-controls">
										<div className="dots">
											{pet.images.map((_, index) => (
												<span key={index} style={{ fontSize: "1.5rem", color: index === currentIndex ? "#000" : "#aaa" }}>
												●
												</span>
											))}				
									</div>
								</div>
							</div>
						

							<ul className="pet-info">
								<li><strong>Pet ID:</strong> #{pet.id}</li>
								<li><strong>Species:</strong> {pet.species}</li>
								<li><strong>Sex:</strong> {pet.sex}</li>
								<li><strong>Birthday:</strong> {pet.birthday}</li>
								<li><strong>Disabilities:</strong> {pet.disabilities}</li>
								<li><strong>Personality:</strong> {pet.personality}</li>
							</ul>
						</div>

						{/* Right Side */}
						<div className="pet-profile-right">
							<div className="icon-buttons">
								<button className="icon-button" aria-label="Edit" onClick={handleEdit}>✏️</button>
  								<button className="icon-button" aria-label="Delete" onClick={handleDelete}>🗑️</button>
							</div>
							<div className="pet-header">
								<h1 className="pet-name">{pet.name}</h1>
								<button className="favorite-button" aria-label="Toggle favorite" onClick={toggleFavorite}>
									{isFavorite ? '❤️' : '🤍'}
								</button>
							</div>
								<h2 className="pet-subtitle">{pet.age} year old {pet.species}</h2>
								<p className="shelter-name">{pet.shelter}</p>

								<div className="about-box">
									<h3>About Me</h3>
									<p>{pet.about1}</p>
									<p>{pet.about2}</p>
								</div>

								<Link to="/shelters" className="contact-shelter-button">Contact Shelter!</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default PetProfile;
