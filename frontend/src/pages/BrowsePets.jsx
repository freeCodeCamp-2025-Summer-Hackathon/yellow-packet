import Header from "../components/Header";
import Navbar from "../components/Navbar";
import BrowsePetsHeading from "../components/BrowsePetsHeading";
import PetGrid from "../components/PetGrid";
import PetFilter from "../components/PetFilter";
import { useState } from "react";

function BrowsePets({ user, setUser }) {
	const [filters, setfilters] = useState({ type: '', shelter: '', age_stage: '', size: '', sex: '', favorites: false }); // holds the value of each applied filter, for use with PetGrid.

	const [filtersVisible, setFiltersVisible] = useState(false);

	const toggleFilter = () => {
		setFiltersVisible(prev => !prev);
	};

	// Values for testing: Swap these with values from the database
	const types = ["dog", "cat"];
	const shelters = ["Colorado Shelter", "Cali Shelter"];
	const age_stages = ["Youth", "Adult", "Senior"];
	const sizes = ["small", "medium", "large"];
	const sexes = ["male", "female"];

	

	return (
		<>
			<div>
				<Header user={user} setUser={setUser} />
				<Navbar />
				<BrowsePetsHeading />
				<section id="pet-gallery">
					<button className="filter-toggle" onClick={toggleFilter} aria-expanded={filtersVisible}>
						{filtersVisible ? "Hide Filters" : "Show Filters"}
					</button>
					<div className={`pet-filter-container ${filtersVisible ? "open" : "collapsed"}`}>
						<PetFilter filters={filters} setfilters={setfilters} types={types} shelters={shelters} age_stages={age_stages} sizes={sizes} sexes={sexes} />

					</div>
					<PetGrid filters={filters} user={user} setUser={setUser} />

				</section>
			</div>
		</>
	);
}

export default BrowsePets;
