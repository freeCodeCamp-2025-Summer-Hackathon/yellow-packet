/* PetProfile.jsx */

import Header from '../components/Header';
import Navbar from '../components/Navbar';
import "../styles/PetProfile.css";
import { Link } from "react-router-dom";
import cat_1 from "../images/cat_1.jpg"
import cat_2 from "../images/cat_2.jpg"
import cat_3 from "../images/cat_3.jpg"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';


function PetProfile({ user, setUser }) {

const location = useLocation();
const givenPet = location.state?.pet;

const [pet, setPet] = useState(null);

useEffect(() => {
	// If we received a pet, merge with defaults
	const defaultPet = {
		name: "Leo",
		_id: 2048,
		species: "Cat",
		sex: "Male",
		birthday: "3/15/2022",
		age: 3,
		shelter: "Shelter Name Here",
		disabilities: "None",
		personality: "Social Butterfly",
		about1: "I’m just a silly cat who is very smart, and friendly!",
		about2: "I am nice and I love to play with kids!",
		pics: [cat_1, cat_2, cat_3],
	};

	if (givenPet) {
		setPet({ ...defaultPet, ...givenPet });
	} else {
		setPet(defaultPet);
	}
}, [givenPet]);


	const [currentIndex, setCurrentIndex] = useState(0);

	const handlePrev = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === 0 ? pet.pics.length - 1 : prevIndex - 1
		);
	};

	const handleNext = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === pet.pics.length - 1 ? 0 : prevIndex + 1
		);
	};

	function toggleFavorite() {
		if (!user) return alert("Login to favorite pets!"); // If no user, just return (can't favorite without being logged in)

		// update pet favorites array 
		if (pet.favorites.includes(user?.id)) {
			setPet({ ...pet, favorites: pet.favorites.filter(id => id !== user?.id) });
		} else {
			setPet({ ...pet, favorites: [...pet.favorites, user?.id] });
		}


		// Update user's favorites array
		setUser(prev => {
			if (prev) {
				return { ...prev, favorites: prev.favorites.includes(pet._id) ? prev.favorites.filter(id => id !== pet._id) : [...prev.favorites, pet._id] };
			}
			return prev;
		});
	}

	const navigate = useNavigate();

	const handleEdit = () => {
		navigate(`/edit/${pet._id}`);
	};

	const handleDelete = () => {
		navigate(`/delete/${pet._id}`);
	};
	if (!pet) return <div>Loading...</div>;


	return (
		<>
			<div>
				<Header user={user} setUser={setUser} />
				<Navbar />
				<div className="pet-profile-container">
					<Link to="/browse" className="back-link">← Back to Browse</Link>
					
					<div className="pet-profile-grid">
						{/* Left Side */}
						<div className="pet-profile-left">
							{ pet.pics && (
							<div className="image-carousel">
								<div className="carousel-wrapper">
									<button className="left-arrow" onClick={handlePrev} aria-label="Previous Image">‹</button>
									<img src={pet.pics[currentIndex]} alt={pet.name} className="pet-photo" />
									<button className="right-arrow" onClick={handleNext} aria-label="Next Image">›</button>
									</div>
									<div className="carousel-controls">
										<div className="dots">
											{pet.pics.map((_, index) => (
												<span key={index} style={{ fontSize: "1.5rem", color: index === currentIndex ? "#000" : "#aaa" }}>
												●
												</span>
											))}				
									</div>
								</div>
							</div>)}
							{ !pet.pics && (
								<div className="image-carousel">
									<div className="carousel-wrapper">
										<div className='pet-photo' style={{ color: "#111" }}>No images available</div>
									</div>
								</div>
							)}

							<ul className="pet-info">
								<li><strong>Pet ID:</strong> #{pet._id}</li>
								<li><strong>Species:</strong> {pet.species}</li>
								<li><strong>Sex:</strong> {pet.sex}</li>
								<li><strong>Birthday:</strong> {new Date(pet.birthday).toLocaleDateString()}</li>
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
									{pet?.favorites?.includes(user?.id) ? '❤️' : '🤍'}
								</button>
							</div>
								<h2 className="pet-subtitle">{pet.age} year old {pet.species}</h2>
								<p className="shelter-name">{pet.shelter}</p>

								{/* About Section: if there are things to say */}
								{ pet.bio || pet.about1 || pet.about2 ? (
								<div className="about-box">
									<h3>About Me</h3>
									{pet.bio && <p>{pet.bio}</p>}
									{pet.about1 && <p>{pet.about1}</p>}
									{pet.about2 && <p>{pet.about2}</p>}
								</div>
								): null}
								<Link to="/shelters" className="contact-shelter-button">Contact Shelter!</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default PetProfile;
