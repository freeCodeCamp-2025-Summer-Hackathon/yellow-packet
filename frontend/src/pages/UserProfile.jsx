/* UserProfile.jsx */

import Header from '../components/Header';
import Navbar from '../components/Navbar';
import PetGrid from "../components/PetGrid.jsx";
import "../styles/UserProfile.css";
import SpongeBob from "../images/spongebob.jpg"
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { useState } from "react";

export default function UserProfile({ user, setUser }) {

    const navigate = useNavigate();

    const mockUser = {
        id: 3042,
        first_name: "SpongeBob",
        last_name: "SquarePants",
        phone_number: "(555) 123-4567",
        email: "sponge@squarepants.com",
        city: "Bikini Bottom",
        state: "Ocean",
        location: "Bikini Bottom, Ocean",
        bio: "A pet owner of 3 months! I have a pet snail and I would love to add to my family.",
        avatar: SpongeBob,
        favorites: [],
    };

    const [thisUser, setThisUser] = useState(mockUser);

    if (user) {
        setThisUser(user);
    }

    const handleDelete = () => {
        if (confirm("Are you sure you want to delete your profile? This action cannot be undone.")) {
            // Here you would typically call an API to delete the user profile
            // For now, we'll just log the user out and redirect to the home page
            setUser(null); // Clear user state
            navigate(`/`); // Redirect to home page after deletion
        }
    };

    const handleEdit = () => {
		navigate(`/edit/user-profile/${thisUser.id}`);
	};

    const filters = { type: '', shelter: '', age_stage: '', size: '', sex: '', favorites: true };

    return (
        <>
            <Header user={user} setUser={setUser} />
            <Navbar />
            <div className="user-profile-page">

                <div className="top-bar">
                    <Link to="/browse" className="back-link">← Back to Browse</Link>
                    <button title="Edit User Profile" className="icon-button" aria-label="Edit" onClick={handleEdit}>✏️</button>
                </div>
                <div className="profile-container">
                        <h1 className="user-name">{thisUser.first_name}</h1>
        
                    <div className="user-information">
                        <div className="user-avatar">
                            <img src={thisUser.avatar} alt={thisUser.first_name} />
                        </div>
                        <div className="user-card">
                            <div className="user-details">
                                <div className="leftside-profile">
                                    <p className="user-heading"><strong>User Info</strong></p>
                                    <p><b>Name:</b><br /><span className="indent-text">{thisUser.first_name} {thisUser.last_name}</span></p>
                                    <p><b>Location:</b><br /><span className="indent-text">{thisUser.city}, {thisUser.state}</span></p>
                                </div>
                                <div className="rightside-profile">
                                    <p className="user-heading"><strong>Contact</strong></p>
                                    <p><b>Phone:</b><br /><span className="indent-text">{thisUser.phone_number}</span></p>
                                    <p><b>Email:</b><br /><span className="indent-text">{thisUser.email}</span></p>
                                </div>
                                <br />
                                <div className="bio-section">
                                    <p className="bio-box"><strong>Bio:</strong><br /><span className="indent-text">{thisUser.bio}</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {thisUser.favorites.length > 0 && (
                        <>
                            <h2>Favorite Pets</h2>
                            <PetGrid filters={filters} />
                        </>
                    )}

                    <div className="delete-button-wrapper">
                        <button className="delete-profile-button" onClick={handleDelete}>Delete My Profile</button>
                    </div> 
                </div>
            </div>
        </>
    )
}
