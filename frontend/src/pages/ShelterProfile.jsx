/* ShelterProfile.jsx */

import Header from '../components/Header';
import Navbar from '../components/Navbar';
import "../styles/ShelterProfile.css";
import ShelterImg from "../images/pet-shelter.jpg"
import { useNavigate } from 'react-router-dom';
import PetGrid from "../components/PetGrid";
import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import { useCallback } from "react";
import { useMemo } from "react";
import axios from "axios";

export default function ShelterProfile({ user, setUser }) {

    const navigate = useNavigate();
    const location = useLocation();
    const givenShelterID = location.state?.shelter;
    console.log("Fetching shelter with ID:", givenShelterID);

    const [shelter, setShelter] = useState(null);
    const mockShelter = useMemo(() => ({
                id: 5720,
                shelter_name: "Cali Shelter",
                years_active: 28,
                phone_number: "555-555-5555",
                email: "coolshelter@example.com",
                shelterSite: "www.coolshelter.com",
                address_line_1: "12345 Cool St Wilbur, OR 97494,USA",
                bio: "A family owned shelter in the heard of Wilbur, Oregon. We house our animals as best as we can but need your help to really give them a home!",
                image: ShelterImg,
            }), []);

const fetchShelter = useCallback(async () => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_SERVER_URI}/api/shelters/${givenShelterID}`);
        
        // Only update state if valid data is returned
        if (res.data) {
            setShelter({ ...mockShelter, ...res.data });
        } else {
            console.warn("No shelter data found, using mock data.");
            setShelter(mockShelter);
        }
    } catch (err) {
        console.error("Failed to fetch shelter, using mock data:", err);
        setShelter(mockShelter);
    }
}, [givenShelterID, mockShelter]);

    useEffect(() => {
        if (givenShelterID) {
            fetchShelter();
        } else {
            console.warn("No shelter ID provided. Falling back to mock data.");
            setShelter(mockShelter);
        }
    }, [givenShelterID, mockShelter, fetchShelter]);

    if (!shelter) {
        return <div style={{ display: "flex", justifyContent: "center", alignContent: "center", padding: "20px", textAlign: "center" }}>Loading...</div>;
    }

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this shelter profile? This action cannot be undone.");

        if (!confirmDelete) return;

        try {
            const res = await axios.delete(`${import.meta.env.VITE_SERVER_URI}/api/shelters/${shelter.id}`);

            if (res.status === 200 || res.status === 204) {
            alert("Shelter profile deleted successfully.");
            navigate("/browse"); // or wherever makes sense
            } else {
            alert("Failed to delete shelter. Please try again.");
            }
        } catch (error) {
            console.error("Error deleting shelter:", error);
            alert("An error occurred while deleting the shelter.");
        }
    };

    const handleEdit = () => {
		navigate(`/edit/shelter-profile/${shelter.id}`);
	};

    
    return (
        <>
            <Header user={user} setUser={setUser} />
            <Navbar />
            <div className="shelter-profile-page">

                <div className="top-bar">
                    <button onClick={() => navigate(-1)} style={{ fontFamily: 'inherit', background: 'none', border: 'none', cursor: 'pointer' }} className="back-link">← Go Back</button>
                    {user && user.id === shelter.id && (
                        <button title="Edit Shelter Profile" className="icon-button" aria-label="Edit" onClick={handleEdit}>✏️</button>
                    )}
                </div>
                <div className="profile-container">
                        <h1 className="shelter-name">{shelter.shelter_name}</h1>

                    <div className="shelter-information">
                        <div className="shelter-image">
                            <img src={shelter.image} alt={shelter.shelter_name} />
                        </div>
                        <div className="shelter-card">
                            <div className="shelter-details">
                                <div className="leftside-profile">
                                    <p className="shelter-heading"><strong>Shelter Info</strong></p>
                                    <p><b>Name:</b><br /><span className="indent-text">{shelter.shelter_name}</span></p>
                                    <p><b>Location:</b><br /><span className="indent-text">{shelter.address_line_1}</span></p>
                                </div>
                                <div className="rightside-profile">
                                    <p className="shelter-heading"><strong>Contact</strong></p>
                                    <p><b>Phone:</b><br /><span className="indent-text">({shelter.phone_number.slice(0, 3)}){shelter.phone_number.slice(3, 13)}</span></p>
                                    <p><b>Email:</b><br /><span className="indent-text">{shelter.email}</span></p>
                                </div>
                                <br />
                                <div className="bio-section">
                                    <p className="bio-box"><strong>Bio:</strong><br /><span className="indent-text">{shelter.bio}</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {shelter.pets && shelter.pets.length > 0 && (
                        <div>
                            <h2>Pets From This Shelter</h2>
                            <PetGrid filters={{ type: '', shelter: shelter.shelter_name, age_stage: '', size: '', sex: '', favorites: false }} />
                        </div>
                    )}
                    {user && user.id === shelter.id && (
                        <div className="delete-button-wrapper">
                            <button className="delete-profile-button" onClick={handleDelete}>Delete My Profile</button>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}