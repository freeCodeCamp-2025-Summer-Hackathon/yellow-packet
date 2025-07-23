/* 
	This is a grouping of pet cards.
	You should USE the <PetCard /> component to build a resizable grid of petcards.
	You should use the Pet Filter function to determine which pets to show in the grid. Consider making those functions in a separate file, but not necessary.
*/

import { useState, useEffect } from "react";
import axios from "axios";
import PetCard from "./PetCard";
import "../styles/BrowsePets.css"
import { useNavigate } from "react-router-dom";

const fake_image_url_1 = "https://plus.unsplash.com/premium_photo-1694819488591-a43907d1c5cc?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y3V0ZSUyMGRvZ3xlbnwwfHwwfHx8MA%3D%3D";

const fake_image_url_12 = "https://images.unsplash.com/photo-1611003228941-98852ba62227?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFieSUyMGRvZ3xlbnwwfHwwfHx8MA%3D%3D";

const fake_image_url_2 = "https://cst.brightspotcdn.com/dims4/default/9e04f85/2147483647/strip/false/crop/5000x2813+0+263/resize/1200x675!/quality/90/?url=https%3A%2F%2Fchorus-production-cst-web.s3.us-east-1.amazonaws.com%2Fbrightspot%2F91%2F13%2Fdd3ccd65438eaec555522479705d%2Fadobestock-236992283.jpg"

const fake_image_url_22 = "https://images.unsplash.com/photo-1529778873920-4da4926a72c2?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y3V0ZSUyMGNhdHxlbnwwfHwwfHx8MA%3D%3D";

export default function PetGrid({ filters, user, setUser }) {

	// Static fallback data
	const staticPets = Array.from({ length: 22 }, (_, i) => ({
		// Calculated Data, so that we would have a little bit of everything :)
		id: i,
		species: i % 2 === 0 ? 'dog' : 'cat',
		shelter: i % 3 === 0 ? 'Colorado Shelter' : 'Cali Shelter',
		age: (i % 10) + 1,
		size: ['small', 'medium', 'large'][i % 3],
		sex: i % 2 === 0 ? 'male' : 'female',
		favorites: [],
		name: `Pet ${i + 1}`, // Generic name so I don't have to make each profile individually
		pics: i % 2 === 0 ? [fake_image_url_1, fake_image_url_12] : [fake_image_url_2, fake_image_url_22] // Alternate images for dogs and cats,
	}));
	// Start with static data as default
	const [petList, setPetList] = useState(staticPets);

	const fetchPets = async () => {
		try {
			const res = await axios.get(`${import.meta.env.VITE_SERVER_URI}/api/pets`);
			// Only update if we got valid data
			if (res.data?.data?.length > 0) {
				setPetList(res.data.data);
			}
			// If no data or empty array, keep using static data
		} catch (err) {
			console.error("Failed to fetch pets, using static data:", err);
			// Keep using static data (no need to do anything)
		}
	};

	useEffect(() => {
		fetchPets();
	}, []);

	const navigate = useNavigate();

    const handleClick = (pet) => {
        navigate(`/pet-profile/${pet.id}`, { state: { pet } });
    };

	// This toggles whether or not a given pet is favorited
	function toggleFavorite(event, petId) {
		event.stopPropagation();
		if (!user) return alert("Login to favorite pets!"); // If no user, just return (can't favorite without being logged in)
		// updates the pet favorites array to toggle the favorite status of the pet with the given petId and user ID
		setPetList(prev =>
			prev.map(pet => {
				if (pet.id === petId) {
					if (pet.favorites.includes(user?.id)) {
						return { ...pet, favorites: pet.favorites.filter(id => id !== user?.id) };
					} else {
						return { ...pet, favorites: [...pet.favorites, user?.id] };
					}
				}
				return pet;
			})
		);

		// Update user's favorites array	
		setUser(prev => {
			if (prev) {
				return { ...prev, favorites: prev.favorites.includes(petId) ? prev.favorites.filter(id => id !== petId) : [...prev.favorites, petId] };
			}
			return prev;
		});
	}

	// filter pets based on active filter values
	const filteredPets = petList.filter((pet) => {
		for (const key in filters) {
			const filterValue = filters[key];
			if (filterValue === '' || filterValue === false) continue;

			if (key === "age_stage") {
				if (filterValue.toLowerCase() === "youth" && pet.age >= 2) return false;
				if (filterValue.toLowerCase() === "adult" && (pet.age < 2 || pet.age > 6)) return false;
				if (filterValue.toLowerCase() === "senior" && pet.age <= 6) return false;
			} else if (key === "favorites") {
				// Show only pets where the logged-in user's ID is in pet.favorites
				if (!user.favorites.includes(pet.id)) return false;
			} else {
				if (pet[key] !== filterValue) return false;
			}
		}
		return true;
	});

	return (
		<section className="pet-grid-section">
			<div className="pet-grid">
				{
					filteredPets.map((pet, idx) => {
						return (
							<PetCard
								id={pet.id}
								name={pet.name}
								age={pet.age}
								gender={pet.sex}
								location={pet.shelter}
								type={pet.type}
								pics={pet.pics ? pet.pics : [fake_image_url_1]}
								isFav={user ? user.favorites.includes(pet.id) : false}
								onToggleFav={(event) => toggleFavorite(event, pet.id)}
								key={idx}
								handleClick={() => handleClick(pet)}
							/>
						)
					})
				}
			</div>
		</section>
	);
};
