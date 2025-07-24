/* EditUserProfile.jsx */

import React, { useState } from "react";
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import { useNavigate, useParams } from 'react-router-dom';
import "../styles/EditUserProfile.css";

export default function EditUserProfile({ user, setUser }) {
	const navigate = useNavigate();
	const { userId } = useParams();

	const [formData, setFormData] = useState({
		first_name: "SpongeBob",
		last_name: "SquarePants",
		city: "Bikini Bottom",
		state: "Ocean",
		phone_number: "(555) 123-4567",
		email: "sponge@squarepants.com",
		bio: "A pet owner of 3 months! I have a pet snail and I would love to add to my family",
		avatar: null,
		avatarPreview: null
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData(prev => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("Updated user info:", formData);
		navigate(`/user-profile/${userId}`);
	};

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setFormData(prev => ({
					...prev,
					avatar: file,
					avatarPreview: reader.result
				}));
			};
			reader.readAsDataURL(file);
		}
	};

	return (
		<>
			<Header user={user} setUser={setUser} />
			<Navbar />
			<div className="edit-user-page">
				<h1 className="title">Edit User Profile</h1>
				<form className="edit-user-form" onSubmit={handleSubmit}>
					<label>Profile Picture:
						<input type="file" accept="image/*" onChange={handleImageChange} />
					</label>
					{formData.avatarPreview && (
						<div className="image-preview">
							<img src={formData.avatarPreview} alt="Avatar Preview" />
						</div>
					)}
					<label>First Name:
						<input type="text" name="first_name" value={formData.first_name} onChange={handleChange} required />
					</label>
					<label>Last Name:
						<input type="text" name="last_name" value={formData.last_name} onChange={handleChange} required />
					</label>
					<label>City:
						<input type="text" name="city" value={formData.city} onChange={handleChange} required />
					</label>
					<label>State:
						<input type="text" name="state" value={formData.state} onChange={handleChange} required />
					</label>
					<label>Phone:
						<input type="text" name="phone_number" value={formData.phone_number} onChange={handleChange} required />
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
