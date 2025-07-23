/* UserProfile.jsx */

import React from "react";
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import PetGrid from "../components/PetGrid.jsx";
import "../styles/UserProfile.css";
import SpongeBob from "../images/spongebob.jpg"
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

export default function UserProfile(user) {

    const navigate = useNavigate();

    const mockUser = {
        id: 3042,
        firstName: "SpongeBob",
        lastName: "SquarePants",
        phone: "(555) 123-4567",
        email: "sponge@squarepants.com",
        location: "Bikini Bottom, Ocean",
        bio: "A pet owner of 3 months! I have a pet snail and I would love to add to my family",
        avatar: SpongeBob,
    };

    const handleDelete = () => {
		navigate(`/delete/${mockUser.id}`);
	};

    const handleEdit = () => {
		navigate(`/edit/user-profile/${mockUser.id}`);
	};

    return (
        <>
            <Header />
            <Navbar />
            <div className="user-profile-page">

                <div className="top-bar">
                    <Link to="/browse" className="back-link">← Back to Browse</Link>
                    <button title="Edit User Profile" className="icon-button" aria-label="Edit" onClick={handleEdit}>✏️</button>
                </div>
                <div className="profile-container">
                        <h1 className="user-name">{mockUser.firstName}</h1>
        
                    <div className="user-information">
                        <div className="user-avatar">
                            <img src={mockUser.avatar} alt={mockUser.name} />
                        </div>
                        <div className="user-card">
                            <div className="user-details">
                                <div className="leftside-profile">
                                    <p className="user-heading"><strong>User Info</strong></p>
                                    <p><b>Name:</b><br /><span className="indent-text">{mockUser.firstName} {mockUser.lastName}</span></p>
                                    <p><b>Location:</b><br /><span className="indent-text">{mockUser.location}</span></p>
                                </div>
                                <div className="rightside-profile">
                                    <p className="user-heading"><strong>Contact</strong></p>
                                    <p><b>Phone:</b><br /><span className="indent-text">{mockUser.phone}</span></p>
                                    <p><b>Email:</b><br /><span className="indent-text">{mockUser.email}</span></p>
                                </div>
                                <br />
                                <div className="bio-section">
                                    <p className="bio-box"><strong>Bio:</strong><br /><span className="indent-text">{mockUser.bio}</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h2>Favorite Pets</h2>
                    <PetGrid filters={{ favoritesOnly: true }} />
                    
                    <div className="delete-button-wrapper">
                        <button className="delete-profile-button" onClick={handleDelete}>Delete My Profile</button>
                    </div> 
                </div>
            </div>
        </>
    )
}
