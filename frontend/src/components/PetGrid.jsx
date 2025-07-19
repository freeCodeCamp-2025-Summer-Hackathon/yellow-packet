/* 
	This is a grouping of pet cards.
	You should USE the <PetCard /> component to build a resizable grid of petcards.
	You should use the Pet Filter function to determine which pets to show in the grid. Consider making those functions in a separate file, but not necessary.
*/

import { useState, useEffect } from "react";
import axios from "axios";
import PetCard from "./PetCard";
import "../styles/BrowsePets.css"

const fake_image_url_1 = "https://plus.unsplash.com/premium_photo-1694819488591-a43907d1c5cc?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y3V0ZSUyMGRvZ3xlbnwwfHwwfHx8MA%3D%3D";

const fake_image_url_2 = "https://cst.brightspotcdn.com/dims4/default/9e04f85/2147483647/strip/false/crop/5000x2813+0+263/resize/1200x675!/quality/90/?url=https%3A%2F%2Fchorus-production-cst-web.s3.us-east-1.amazonaws.com%2Fbrightspot%2F91%2F13%2Fdd3ccd65438eaec555522479705d%2Fadobestock-236992283.jpg"

export default function PetGrid({ filters }) {

	// Static fallback data
	const staticPets = Array.from({ length: 22 }, (_, i) => ({
		// Calculated Data, so that we would have a little bit of everything :)
		_id: i,
		species: i % 2 === 0 ? 'dog' : 'cat',
		shelter_name: i % 3 === 0 ? 'Colorado Shelter' : 'Cali Shelter',
		age: (i % 10) + 1,
		size: ['small', 'medium', 'large'][i % 3],
		sex: i % 2 === 0 ? 'male' : 'female',

		favorites: i % 5 === 0, // Will need to solve this problem later?

		name: `Pet ${i + 1}`, // Generic name so I don't have to make each profile individually
		pic: i % 2 === 0 ? fake_image_url_1 : fake_image_url_2,
	}));

	// Start with static data as default
	const [petList, setPetList] = useState(staticPets);

	const fetchPets = async () => {
		try {
			const res = await axios.get(`${import.meta.env.VITE_SERVER_URI}/api/pets`);
			console.log("Backend data:", res.data.data);
			// Only update if we got valid data
			if (res.data.data && res.data.data.length > 0) {
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

	// This toggles whether or not a given pet is favorited
	function toggleFavorite(petId) {
		setPetList(prev =>
			prev.map(pet =>
				pet._id === petId ? { ...pet, favorites: !pet.favorites } : pet
			)
		);
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
								name={pet.name}
								age={pet.age}
								gender={pet.sex}
								location={pet.shelter_name}
								type={pet.type}
								pic={pet.pic ? pet.pic : fake_image_url_1}
								isFav={pet.favorites}
								onToggleFav={() => toggleFavorite(pet._id)}
								key={idx}
							/>
						)
					})
				}
			</div>
		</section>
	);
};
