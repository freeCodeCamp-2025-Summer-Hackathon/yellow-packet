import Header from "../components/Header";
import Navbar from "../components/Navbar";
import "../styles/Shelters.css";
import axios from "axios";
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from "react-router-dom";

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

	const { data: shelters = ["Colorado Shelter", "Cali Shelter"], isLoading } = useQuery({
		queryKey: ['shelters'],
		queryFn: getShelters
	});


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
        navigate(`/shelter-profile/${shelter._id}`, { state: { shelter } });
    }

	return (
		<div className="shelters-page-container">
			<Header user={user} setUser={setUser} />
			<Navbar />
			<section id="shelter-gallery">
                <h1 className="shelters-heading">Browse Shelters</h1>
                    <div className="shelter-cards">
                        {shelters.map((shelter) => (
                            // Replace with ShelterCard component if available
                            <div key={shelter._id} className="shelter-card" onClick={() => handleShelterClick(shelter)}>
                                <h3>{shelter.shelter_name}</h3>
                                <p>{shelter.address_line_1}</p>
                            </div>
                        ))}
                    </div>
			</section>
		</div>
	);
}

export default SheltersPage;