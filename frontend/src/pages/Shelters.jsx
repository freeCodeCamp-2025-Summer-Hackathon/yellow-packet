import Header from "../components/Header";
import Navbar from "../components/Navbar";
import "../styles/Shelters.css";
import axios from "axios";
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

function SheltersPage({ user, setUser }) {
    const navigate = useNavigate();
    
	const getShelters = async () => {
		console.log('🔥 SHELTERS API CALLED:', {
			time: new Date().toLocaleTimeString(),
			mode: import.meta.env.MODE, // Shows 'development' or 'production'
			reason: 'Query function executed'
		});
		try {
			const response = await axios.get(`${import.meta.env.VITE_SERVER_URI}/api/shelters`);
			const shelters = response.data;
            if (Array.isArray(shelters) && shelters.length > 0) {
                return shelters;
            } else {
                console.warn("No shelters found in response.");
                return [];
            }
		} catch (error) {
			console.error("Failed to get shelters:", error);
			throw error;
		}
	};


	const { data: shelters = [], isLoading } = useQuery({
		queryKey: ['shelters'],
		queryFn: getShelters
	});

    const [filteredShelters, setFilteredShelters] = useState(shelters);
    useEffect(() => {
        setFilteredShelters(shelters);
    }, [shelters]);

    if (isLoading) {
        return (
            <div className="shelters-page-container">
                <Header user={user} setUser={setUser} />
                <Navbar />
                <section id="shelter-gallery">
                    <h1 className="shelters-heading">Browse Shelters</h1>
                    <p className="shelter-cards"> Loading shelters...</p>
                </section>
            </div>
        );
    }

    const handleShelterClick = (shelter) => {
        // dependant on ShelterProfile.jsx being implemented
        navigate(`/shelter-profile/${shelter._id}`, { state: { shelter: shelter._id } });
    }

    

    const handleSearch = (event) => {

        // Filter shelters based on search input
        // You can search shelters by name or location
        const searchTerm = event.target.value.toLowerCase();
        const filteredShelters = shelters.filter(shelter =>
            shelter.shelter_name.toLowerCase().includes(searchTerm) ||
            (shelter.city && shelter.city.toLowerCase().includes(searchTerm)) ||
            (shelter.state && shelter.state.toLowerCase().includes(searchTerm))
        );
        setFilteredShelters(filteredShelters);
    };

	return (
		<div className="shelters-page-container">
			<Header user={user} setUser={setUser} />
			<Navbar />
			<section id="shelter-gallery">
                <div className="shelters-header">
                    <h1 className="shelters-heading">Browse Shelters</h1>
                    <div className="shelters-search">
                        <label htmlFor="search">Search:</label>
                        <input
                            type="text"
                            id="search"
                            name="search"
                            placeholder="Search shelters..."
                            onChange={handleSearch}
                        />
                    </div>
                </div>
                    <div className="shelter-cards">
                        {filteredShelters.map((shelter) => (
                            // Replace with ShelterCard component if available
                            <div key={shelter._id} className="shelter-card" onClick={() => handleShelterClick(shelter)}>
                                <h3>{shelter.shelter_name}</h3> {/* Display shelter name */}
                                <p>{shelter.city}, {shelter.state}</p> {/* Display location */}
                            </div>
                        ))}
                    </div>
			</section>
		</div>
	);
}

export default SheltersPage;