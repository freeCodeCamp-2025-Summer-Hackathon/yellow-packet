import Header from "../components/Header";
import Navbar from "../components/Navbar";
import BrowsePetsHeading from "../components/BrowsePetsHeading";
import PetGrid from "../components/PetGrid";
import PetFilter from "../components/PetFilter";
import { useState, useEffect } from "react";
import axios from "axios";

function BrowsePets({ user, setUser }) {
	const [filters, setfilters] = useState({
		type: '',
		shelter: '',
		age_stage: '',
		size: '',
		sex: '',
		favorites: false
	});
	const [filtersVisible, setFiltersVisible] = useState(false);
	const [shelters, setShelters] = useState([]);
	const [loading, setLoading] = useState(true);

	const toggleFilter = () => {
		setFiltersVisible(prev => !prev);
	};

	const getShelters = async () => {
		try {
			const response = await axios.get(`${import.meta.env.VITE_SERVER_URI}/api/shelters`);
			return response.data;
		} catch (error) {
			console.error("Failed to get shelters:", error);
			throw error;
		}
	};

	// Fetch shelters on component mount
	useEffect(() => {
		const fetchShelters = async () => {
			try {
				const shelterData = await getShelters();
				setShelters(shelterData.map(e => e.shelter_name));
				setLoading(false);
			} catch (error) {
				console.error("Error fetching shelters:", error);
				setShelters([]); // Fallback to empty array
				setLoading(false);
			}
		};

		fetchShelters();
	}, []);

	// Static filter options
	const types = ['dog', 'cat', 'bird', 'rabbit'];
	const age_stages = ["Youth", "Adult", "Senior"];
	const sizes = ["small", "medium", "large"];
	const sexes = ["male", "female"];

	if (loading) {
		return (
			<div>
				<Header user={user} setUser={setUser} />
				<Navbar />
				<BrowsePetsHeading />
				<div>Loading...</div>
			</div>
		);
	}

	return (
		<>
			<div>
				<Header user={user} setUser={setUser} />
				<Navbar />
				<BrowsePetsHeading />
				<section id="pet-gallery">
					<button
						className="filter-toggle"
						onClick={toggleFilter}
						aria-expanded={filtersVisible}
					>
						{filtersVisible ? "Hide Filters" : "Show Filters"}
					</button>
					<div className={`pet-filter-container ${filtersVisible ? "open" : "collapsed"}`}>
						<PetFilter
							filters={filters}
							setfilters={setfilters}
							types={types}
							shelters={shelters}
							age_stages={age_stages}
							sizes={sizes}
							sexes={sexes}
							user={user}
						/>
					</div>
					<PetGrid filters={filters} user={user} setUser={setUser} />
				</section>
			</div>
		</>
	);
}

export default BrowsePets;
