import { useState, useEffect } from "react";
import "../styles/CreatePetPage.css";
import axios from "axios";

// Import the same lucky animals from LoginPage
import luckyBunny from "../images/Bunny.png";
import luckyCat from "../images/Cat.png";
import luckyDog from "../images/Dog.png";
import luckyParrot from "../images/Parrot.png";
import luckySquirrel from "../images/Squirrel.png";

const initialState = {
	name: "",
	type: "",
	breed: "",
	birthday: "",
	description: "",
	pictures: [""],
	disabilities: "",
	size: "",
	weight: "",
	weightUnit: "lb",
	neutered: "",
	sex: "",
};

const petTypes = [
	"Dog",
	"Cat",
	"Rabbit",
	"Bird",
	"Other"
];

const petSizes = [
	"small",
	"medium",
	"large"
];

export default function CreatePet( {setShowAddPet, shelter_id}) {
	const [pet, setPet] = useState(initialState);
	const [luckyAnimal, setLuckyAnimal] = useState(null);
	const [uploading, setUploading] = useState(false);
	const [pictureFiles, setPictureFiles] = useState([null]);
	const [picturePreviewUrls, setPicturePreviewUrls] = useState([""]);
	const today = new Date().toISOString().split("T")[0];


	// Same lucky animal logic as LoginPage
	useEffect(() => {
		const luckyAnimals = [luckyBunny, luckyCat, luckyDog, luckyParrot, luckySquirrel];
		const luckyNum = Math.floor(Math.random() * luckyAnimals.length);
		setLuckyAnimal(luckyAnimals[luckyNum]);
	}, []);

	// Cleanup blob URLs on unmount
	useEffect(() => {
		return () => {
			picturePreviewUrls.forEach(url => {
				if (url && url.startsWith("blob:")) {
					URL.revokeObjectURL(url);
				}
			});
		};
	}, [picturePreviewUrls]);

	// Cloudinary functions
	const getCloudinaryConfig = async () => {
		try {
			const response = await axios.get(`${import.meta.env.VITE_SERVER_URI}/api/cloudinary/signature`);
			return response.data;
		} catch (error) {
			console.error("Failed to get Cloudinary config:", error);
			throw error;
		}
	};

	const uploadFileToCloudinary = async (file) => {
		const cloudinaryConfig = await getCloudinaryConfig();
		const formData = new FormData();
		formData.append("file", file);
		formData.append("timestamp", cloudinaryConfig.timestamp);
		formData.append("signature", cloudinaryConfig.signature);
		formData.append("api_key", cloudinaryConfig.apiKey);
		formData.append("upload_preset", cloudinaryConfig.uploadPreset);
		formData.append("folder", cloudinaryConfig.folder);

		const response = await fetch(
			`https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudname}/image/upload`,
			{
				method: "POST",
				body: formData,
			}
		);

		if (!response.ok) {
			throw new Error(`Upload failed: ${response.statusText}`);
		}

		const result = await response.json();
		return result.secure_url;
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setPet({ ...pet, [name]: value });
	};

	const handlePictureChange = (index, value) => {
		const newPictures = [...pet.pictures];
		const newFiles = [...pictureFiles];
		const newPreviewUrls = [...picturePreviewUrls];

		newPictures[index] = value;
		newFiles[index] = null; // Clear file when URL is entered

		// Clean up existing blob URL
		if (newPreviewUrls[index] && newPreviewUrls[index].startsWith("blob:")) {
			URL.revokeObjectURL(newPreviewUrls[index]);
		}
		newPreviewUrls[index] = "";

		setPet({ ...pet, pictures: newPictures });
		setPictureFiles(newFiles);
		setPicturePreviewUrls(newPreviewUrls);
	};

	const handleFileSelection = (index, file) => {
		if (!file) return;

		const newFiles = [...pictureFiles];
		const newPreviewUrls = [...picturePreviewUrls];
		const newPictures = [...pet.pictures];

		// Clean up existing blob URL
		if (newPreviewUrls[index] && newPreviewUrls[index].startsWith("blob:")) {
			URL.revokeObjectURL(newPreviewUrls[index]);
		}

		newFiles[index] = file;
		newPreviewUrls[index] = URL.createObjectURL(file);
		newPictures[index] = ""; // Clear URL when file is selected

		setPictureFiles(newFiles);
		setPicturePreviewUrls(newPreviewUrls);
		setPet({ ...pet, pictures: newPictures });
	};

	const addPictureField = () => {
		setPet({ ...pet, pictures: [...pet.pictures, ""] });
		setPictureFiles([...pictureFiles, null]);
		setPicturePreviewUrls([...picturePreviewUrls, ""]);
	};

	const removePictureField = (index) => {
		if (pet.pictures.length > 1) {
			// Clean up blob URL if exists
			if (picturePreviewUrls[index] && picturePreviewUrls[index].startsWith("blob:")) {
				URL.revokeObjectURL(picturePreviewUrls[index]);
			}

			const newPictures = pet.pictures.filter((_, i) => i !== index);
			const newFiles = pictureFiles.filter((_, i) => i !== index);
			const newPreviewUrls = picturePreviewUrls.filter((_, i) => i !== index);

			setPet({ ...pet, pictures: newPictures });
			setPictureFiles(newFiles);
			setPicturePreviewUrls(newPreviewUrls);
		}
	};

	const calculateAge = (birthday) => {
		if (!birthday) return 0;
		const today = new Date();
		const birthDate = new Date(birthday);
		let age = today.getFullYear() - birthDate.getFullYear();
		const monthDiff = today.getMonth() - birthDate.getMonth();
		if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
			age--;
		}
		return Math.max(0, age);
	};

	const getPreviewUrl = (index) => {
		if (picturePreviewUrls[index]) {
			return picturePreviewUrls[index];
		}
		return pet.pictures[index];
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const selectedDate = new Date(pet.birthday);
		const now = new Date();

		if (selectedDate > now) {
			alert("Birthday cannot be in the future.");
			return;
		}

		if (isNaN(selectedDate.getTime())) {
			alert("Please enter a valid birthday.");
			return;
		}


		// Check if at least one picture is provided
		const hasValidPicture = pet.pictures.some(url => url.trim() !== "") ||
			pictureFiles.some(file => file !== null);

		if (!hasValidPicture) {
			alert("Please add at least one picture.");
			return;
		}

		setUploading(true);

		try {
			// Upload files to Cloudinary and get URLs
			const uploadPromises = pictureFiles.map(async (file, index) => {
				if (file) {
					return await uploadFileToCloudinary(file);
				}
				return pet.pictures[index];
			});

			const uploadedUrls = await Promise.all(uploadPromises);
			const finalPictureUrls = uploadedUrls.filter(url => url && url.trim() !== "");

			if (finalPictureUrls.length === 0) {
				alert("Failed to process pictures. Please try again.");
				return;
			}

			// Submit pet data to backend
			const petData = {
				shelter_id: `${shelter_id}`, // You might want to make this dynamic
				name: pet.name || "",
				species: pet.type.toLowerCase(),
				sex: pet.sex || "male",
				birthday: pet.birthday,
				age: calculateAge(pet.birthday),
				size: pet.size?.toLowerCase() || "",
				weight: parseFloat(pet.weight),
				disabilities: pet.disabilities || "",
				personality: pet.description || "",
				pics: finalPictureUrls,
				bio: pet.description || "",
				spayed_neutered: pet.neutered === "yes"
			};

			await axios.post(`${import.meta.env.VITE_SERVER_URI}/api/pets`, petData);

			alert("Pet created successfully!");

			// Reset form
			setPet(initialState);
			setPictureFiles([null]);
			setPicturePreviewUrls([""]);
			setShowAddPet(false);

		} catch (error) {
			console.error("Error submitting pet:", error);
			alert("Failed to create pet. Please try again.");
		} finally {
			setUploading(false);
		}
	};

	return (
			
				<div className="create-pet-card">
					<h1 className="create-pet-logo">PetMatch</h1>
					<div className="create-pet-box">
						<div className="create-pet-info">

							{/* Lucky animal in the top right corner */}
							{luckyAnimal && (
								<img className="lucky-animal" src={luckyAnimal} alt="Lucky Animal" />
							)}

							{/* Header section */}
							<div className="create-pet-header">
								<h2>Add a New Pet</h2>
								<p className="header-description">Fill out the form below to add a new pet to the PetMatch database.</p>
							</div>

							{/* Form */}
							<form onSubmit={handleSubmit} className="create-pet-form">
								<input
									type="text"
									name="name"
									className="input"
									value={pet.name}
									onChange={handleChange}
									placeholder="Pet's name*"
									required
								/>

								<select
									name="type"
									className="input select-input"
									value={pet.type}
									onChange={handleChange}
									required
								>
									<option value="">Select pet type*</option>
									{petTypes.map(type => (
										<option key={type} value={type}>{type}</option>
									))}
								</select>

								<input
									type="text"
									name="breed"
									className="input"
									value={pet.breed}
									onChange={handleChange}
									placeholder="Breed*"
									required
								/>

								{/* Add sex field */}
								<select
									name="sex"
									className="input select-input"
									value={pet.sex}
									onChange={handleChange}
									required
								>
									<option value="">Select pet sex*</option>
									<option value="male">Male</option>
									<option value="female">Female</option>
								</select>

								<select
									name="size"
									className="input select-input"
									value={pet.size}
									onChange={handleChange}
									required
								>
									<option value="">Select pet size*</option>
									{petSizes.map(size => (
										<option key={size} value={size}>
											{size.charAt(0).toUpperCase() + size.slice(1)}
										</option>
									))}
								</select>

								<div className="weight-section">
									<label htmlFor="weight" className="weight-label">
										<span className="weight-text">Pet's Weight*</span>
									</label>
									<div className="weight-input-group">
										<input
											type="number"
											name="weight"
											id="weight"
											className="input weight-input"
											value={pet.weight}
											onChange={handleChange}
											placeholder="Weight"
											min="0"
											step="0.1"
											required
										/>
										<select
											name="weightUnit"
											className="input weight-unit-select"
											value={pet.weightUnit}
											onChange={handleChange}
										>
											<option value="kg">kg</option>
											<option value="lb">lb</option>
										</select>
									</div>
								</div>

								<div className="neutered-section">
									<label className="neutered-label">
										<span className="neutered-text">Is the pet neutered/spayed?*</span>
									</label>
									<select
										name="neutered"
										className="input select-input"
										value={pet.neutered}
										onChange={handleChange}
										required
									>
										<option value="">Please select*</option>
										<option value="yes">Yes</option>
										<option value="no">No</option>
										<option value="unknown">Unknown</option>
									</select>
								</div>

								<div className="birthday-section">
									<label htmlFor="birthday" className="birthday-label">
										<span className="birthday-text">Pet's Birthday*</span>
										<span className="age-display">
											{pet.birthday && ` (Age: ${calculateAge(pet.birthday)} years)`}
										</span>
									</label>
									<input
										type="date"
										name="birthday"
										id="birthday"
										className="input"
										value={pet.birthday}
										onChange={handleChange}
										max={today}
										required
									/>
								</div>

								<textarea
									name="description"
									className="input textarea-input"
									value={pet.description}
									onChange={handleChange}
									placeholder="Describe the pet's personality and characteristics*"
									rows={4}
									required
								/>

								<textarea
									name="disabilities"
									className="input textarea-input"
									value={pet.disabilities}
									onChange={handleChange}
									placeholder="Any disabilities or special needs (leave blank if none)"
									rows={2}
								/>

								{/* Pictures section with file upload support */}
								<div className="pictures-section">
									<label className="pictures-label">
										<span className="pictures-text">Pet Pictures*</span>
										<span className="pictures-subtext">(At least one picture required)</span>
									</label>
									{pet.pictures.map((picture, index) => (
										<div key={index} className="picture-input-group">
											<input
												type="url"
												className="input picture-input"
												value={picture}
												onChange={(e) => handlePictureChange(index, e.target.value)}
												placeholder={`Picture URL ${index + 1}${index === 0 ? '*' : ''}`}
												required={index === 0 && !pictureFiles[index]}
											/>
											<span style={{ margin: '0 10px' }}>OR</span>
											<input
												type="file"
												accept="image/*"
												onChange={(e) => handleFileSelection(index, e.target.files[0])}
												className="input file-input"
											/>
											{pet.pictures.length > 1 && (
												<button
													type="button"
													className="remove-picture-btn"
													onClick={() => removePictureField(index)}
													title="Remove this picture"
												>
													×
												</button>
											)}
											{/* Picture preview */}
											{getPreviewUrl(index) && (
												<div className="picture-preview">
													<img
														src={getPreviewUrl(index)}
														alt={`Pet Preview ${index + 1}`}
														className="preview-image"
														onError={(e) => {
															e.target.style.display = 'none';
														}}
													/>
												</div>
											)}
										</div>
									))}
									<button
										type="button"
										className="add-picture-btn"
										onClick={addPictureField}
									>
										+ Add Another Picture
									</button>
								</div>

								<button
									type="submit"
									className="create-pet-btn"
									disabled={uploading}
								>
									<span className="btn-text">
										{uploading ? 'Creating Pet Profile...' : 'Create Pet Profile'}
									</span>
								</button>
							</form>
						</div>
					</div>
				</div>
	);
}