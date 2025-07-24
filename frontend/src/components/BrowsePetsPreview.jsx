/* BrowsePetsPreview.jsx */

import { Link, useNavigate} from "react-router-dom";
import "../styles/BrowsePetsPreview.css"
import pet_1 from "../images/pet_1.jpg";
import pet_2 from "../images/pet_2.jpg";
import pet_3 from "../images/pet_3.jpg";
import { useEffect, useState } from "react";
import axios from "axios";

export default function BrowsePetsPreview() {
	const [petList, setPetList] = useState([]);
	const [loading, setLoading] = useState(true); 
	// Use useNavigate hook from react-router-dom for navigation
	const navigate = useNavigate();

	const fallbackImages = [pet_1, pet_2, pet_3]; 

// Fetch pets from the backend
// If the fetch fails, we will use static data instead
	const fetchPets = async () => {
		try {
			const res = await axios.get(`${import.meta.env.VITE_SERVER_URI}/api/pets`);
			// Only update if we got valid data
			if (res.data?.data?.length > 0) {
				setPetList(res.data.data);
			}
			console.log(res.data.data)
			// If no data or empty array, keep using static data
		} catch (err) {
			console.error("Failed to fetch pets, using static data:", err);
			// Keep using static data (no need to do anything)
		} finally {
			setLoading(false); // Set loading to false after fetch attempt
		}
	};

	useEffect(() => {
		fetchPets();
	}, []);

	const handlePetClick = (pet) => {
		// Navigate to the pet profile page with the pet data
		if (!pet || !pet._id) {
			console.error("Invalid pet data:", pet);
			return;
		}
		navigate(`/pet-profile/${pet._id}`, { state: { pet } });
	};

	const getPetImage = (pet, fallback) => {
		return pet?.pics?.[0]?.trim() ? pet.pics[0] : fallback;
	};

	const displayedPets = [0, 1, 2].map((i) => petList[i] || null);

	return (
		<section className="browse-preview">
			<div className="browse-inner">
				<div className="preview-header">
					<Link to="/browse" className="browse-link">Browse Pets →</Link>
				</div>
				<div className="pet-buttons">
					{displayedPets.map((pet, idx) => (
						<button
							key={idx}
							onClick={() => pet && handlePetClick(pet)}
							disabled={!pet || loading}
							className={loading ? "pet-button loading" : "pet-button"}
						>
							<img
								src={getPetImage(pet, fallbackImages[idx])}
								alt={pet?.name || `Pet ${idx + 1}`}
								className="pet-img"
							/>
						</button>
					))}
				</div>
			</div>
		</section>
	);
};
