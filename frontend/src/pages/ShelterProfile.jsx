/* ShelterProfile.jsx */

import React from "react";
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import "../styles/ShelterProfile.css";
import ShelterImg from "../images/pet-shelter.jpg"
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import PetGrid from "../components/PetGrid";

export default function ShelterProfile() {

    const navigate = useNavigate();

    const mockShelter = {
        id: 5720,
        shelterName: "Cali Shelter",
        foundDate: "6/20/1997",
        phone: "(555) 555-5555",
        email: "coolshelter@example.com",
        shelterSite: "www.coolshelter.com",
        location: "12345 Cool St Wilbur, OR 97494,USA",
        bio: "A family owned shelter in the heard of Wilbur, Oregon. We house our animals as best as we can but need your help to really give them a home!",
        image: ShelterImg,
    };

    const handleDelete = () => {
		navigate(`/delete/${mockShelter.id}`);
	};

    const handleEdit = () => {
		navigate(`/edit/shelter-profile/${mockShelter.id}`);
	};

    return (
        <>
            <Header />
            <Navbar />
            <div className="shelter-profile-page">

                <div className="top-bar">
                    <Link to="/browse" className="back-link">← Back to Browse</Link>
                    <button title="Edit Shelter Profile" className="icon-button" aria-label="Edit" onClick={handleEdit}>✏️</button>
                </div>
                <div className="profile-container">
                        <h1 className="shelter-name">{mockShelter.shelterName}</h1>

                    <div className="shelter-information">
                        <div className="shelter-image">
                            <img src={mockShelter.image} alt={mockShelter.shelterName} />
                        </div>
                        <div className="shelter-card">
                            <div className="shelter-details">
                                <div className="leftside-profile">
                                    <p className="shelter-heading"><strong>Shelter Info</strong></p>
                                    <p><b>Name:</b><br /><span className="indent-text">{mockShelter.shelterName}</span></p>
                                    <p><b>Location:</b><br /><span className="indent-text">{mockShelter.location}</span></p>
                                </div>
                                <div className="rightside-profile">
                                    <p className="shelter-heading"><strong>Contact</strong></p>
                                    <p><b>Phone:</b><br /><span className="indent-text">{mockShelter.phone}</span></p>
                                    <p><b>Email:</b><br /><span className="indent-text">{mockShelter.email}</span></p>
                                </div>
                                <br />
                                <div className="bio-section">
                                    <p className="bio-box"><strong>Bio:</strong><br /><span className="indent-text">{mockShelter.bio}</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h2>Pets From This Shelter</h2>
                    <PetGrid filters={{ shelter_name: mockShelter.shelterName }} />

                    <div className="delete-button-wrapper">
                        <button className="delete-profile-button" onClick={handleDelete}>Delete My Profile</button>
                    </div> 
                </div>
            </div>
        </>
    )
}