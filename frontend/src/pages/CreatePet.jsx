import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/CreatePetPage.css";

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

export default function CreatePet() {
	const [pet, setPet] = useState(initialState);
	const [luckyAnimal, setLuckyAnimal] = useState(null);

	// Same lucky animal logic as LoginPage
	useEffect(() => {
		const luckyAnimals = [luckyBunny, luckyCat, luckyDog, luckyParrot, luckySquirrel];
		const luckyNum = Math.floor(Math.random() * luckyAnimals.length);
		setLuckyAnimal(luckyAnimals[luckyNum]);
	}, []);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setPet({ ...pet, [name]: value });
	};

	const handlePictureChange = (index, value) => {
		const newPictures = [...pet.pictures];
		newPictures[index] = value;
		setPet({ ...pet, pictures: newPictures });
	};

	const addPictureField = () => {
		setPet({ ...pet, pictures: [...pet.pictures, ""] });
	};

	const removePictureField = (index) => {
		if (pet.pictures.length > 1) {
			const newPictures = pet.pictures.filter((_, i) => i !== index);
			setPet({ ...pet, pictures: newPictures });
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

	const handleSubmit = (e) => {
		e.preventDefault();

		// Filter out empty picture URLs
		const filteredPictures = pet.pictures.filter(url => url.trim() !== "");

		const petData = {
			...pet,
			pictures: filteredPictures,
			age: calculateAge(pet.birthday),
			availability: "Available" // Default to available upon creation
		};

		alert("Pet created!");
		console.log(petData);
		setPet(initialState);
	};

	return (
		<div className="create-pet-outside-container">
			<Link to="/" className="back-to-home"> &larr; Back to Home </Link>
			<div className="create-pet-container">
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

								{/* Pictures section */}
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
												required={index === 0}
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
											{picture && (
												<div className="picture-preview">
													<img
														src={picture}
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

								<button type="submit" className="create-pet-btn">
									<span className="btn-text">Create Pet Profile</span>
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
