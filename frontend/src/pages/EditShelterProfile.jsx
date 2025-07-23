/* EditShelterProfile.jsx */

import React, { useState } from "react";
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import { useNavigate, useParams } from 'react-router-dom';
import "../styles/EditShelterProfile.css";

export default function EditShelterProfile() {
	const navigate = useNavigate();
	const { shelterId } = useParams();

	const [formData, setFormData] = useState({
		shelterName: "Super Cool Shelter",
		location: "12345 Cool St Wilbur, OR 97494,USA",
		phone: "(555) 555-5555",
		email: "coolshelter@example.com",
		bio: "A family owned shelter in the heart of Wilbur, Oregon.",
        image: null,
	    imgPreview: null
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData(prev => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("Updated shelter info:", formData);
		navigate(`/shelter-profile/${shelterId}`);
	};

    const handleImageChange = (e) => {
	const file = e.target.files[0];
	if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({
                    ...prev,
                    image: file,
                    imagePreview: reader.result
                }));
            };
            reader.readAsDataURL(file);
	    }
    };

	return (
		<>
			<Header />
			<Navbar />
			<div className="edit-shelter-page">
				<h1 className="title">Edit Shelter Profile</h1>
				<form className="edit-shelter-form" onSubmit={handleSubmit}>
                    <label>Profile Picture:
                        <input type="file" accept="image/*" onChange={handleImageChange} />
                    </label>
                    {formData.imagePreview && (
                        <div className="image-preview">
                            <img src={formData.imagePreview} alt="Preview" />
                        </div>
                    )}
					<label>Shelter Name:
						<input type="text" name="shelterName" value={formData.shelterName} onChange={handleChange} required />
					</label>
					<label>Location:
						<input type="text" name="location" value={formData.location} onChange={handleChange} required />
					</label>
					<label>Phone:
						<input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
					</label>
					<label>Email:
						<input type="email" name="email" value={formData.email} onChange={handleChange} required />
					</label>
					<label>Bio:
						<textarea name="bio" value={formData.bio} onChange={handleChange} rows={5} />
					</label>
					<div className="button-group">
						<button type="submit">Save</button>
						<button type="button" onClick={() => navigate(-1)}>Cancel</button>
					</div>
				</form>
			</div>
		</>
	);
}
