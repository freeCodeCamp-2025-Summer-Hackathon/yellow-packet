/* EditShelterProfile.jsx */

import { useState } from "react";
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import { useNavigate, useParams } from 'react-router-dom';
import "../styles/EditShelterProfile.css";
import axios from "axios";
import { useEffect } from "react";

export default function EditShelterProfile({ user, setUser }) {
	const navigate = useNavigate();
	const { shelterId } = useParams();

    useEffect(() => {
    const fetchShelter = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_SERVER_URI}/api/shelters/${shelterId}`);
        setFormData(res.data);
      } catch (error) {
        console.error("Failed to load shelter:", error);
      }
    };

    fetchShelter();
  }, [shelterId]);

	const [formData, setFormData] = useState({
		shelter_name: "Super Cool Shelter",
		address_line_1: "12345 Cool St Wilbur, OR 97494,USA",
		phone_number: "(555) 555-5555",
		email: "coolshelter@example.com",
		bio: "A family owned shelter in the heart of Wilbur, Oregon.",
        image: null,
	    imgPreview: null
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData(prev => ({ ...prev, [name]: value }));
	};

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`${import.meta.env.VITE_SERVER_URI}/api/shelters/${shelterId}`, formData);
      alert("Shelter profile updated!");
      navigate(`/shelter/${shelterId}`); // Or wherever the profile is shown
    } catch (error) {
      console.error("Failed to update shelter:", error);
      alert("Failed to save changes.");
    }
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

    if (!formData) return <div>Loading...</div>;

	return (
		<>
			<Header user={user} setUser={setUser} />
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
						<input type="text" name="shelter_name" value={formData.shelter_name} onChange={handleChange} required />
					</label>
					<label>Address:
						<input type="text" name="address_line_1" value={formData.address_line_1} onChange={handleChange} required />
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