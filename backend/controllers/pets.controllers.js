import { getAllPets, getPet } from "../models/pet.model.js";
import { Shelter, PetProfile } from "../schemas/schema.js";

export const addPet = async (req, res) => {
	try {
		// Check if shelter exists
		const shelter = await Shelter.findById(req.body.shelter_id);
		if (!shelter) {
			return res.status(404).json({
				error: true,
				message: "Shelter not found"
			});
		}

		// Optional: Calculate age from birthday if provided
		let birthday = req.body.birthday ? new Date(req.body.birthday) : null;
		let age = req.body.age;

		if (!age && birthday) {
			const ageDifMs = Date.now() - birthday.getTime();
			const ageDate = new Date(ageDifMs);
			age = Math.abs(ageDate.getUTCFullYear() - 1970);
		}

		// Create the pet profile
		const pet = await PetProfile.create({
			shelter_id: req.body.shelter_id,
			name: req.body.name || "",
			species: req.body.species?.toLowerCase(),
			sex: req.body.sex || "",
			birthday,
			age: age || 0,
			shelter: shelter.shelter_name,
			size: req.body.size?.toLowerCase() || "",
			weight: req.body.weight || 0,
			disabilities: req.body.disabilities || "",
			personality: req.body.personality || "",
			about1: req.body.about1 || "",
			about2: req.body.about2 || "",
			favorites: Array.isArray(req.body.favorites) ? req.body.favorites : [],
			pics: Array.isArray(req.body.pics) ? req.body.pics : [],
			bio: req.body.bio || "",
			spayed_neutered: req.body.spayed_neutered || false
		});

		return res.status(201).json({
			error: false,
			message: "Pet profile created successfully",
			pet
		});
	} catch (err) {
		console.error("Error creating pet profile:", err);
		return res.status(500).json({
			error: true,
			message: "Failed to create pet profile"
		});
	}
};

export const listPets = async (req, res) => {
	const result = await getAllPets({});
	if (result.error) {
		return res.status(400).json({
			success: false,
			message: result.message,
		});
	} else {
		return res.status(200).json({
			success: true,
			data: result.data,
		});
	}
};


export const readPet = async (req, res) => {
	console.log("Fetching ONE pet with query:", req);
	const result = await getPet(req.params.id);
	if (result.error) {
		return res.status(400).json({
			success: false,
			message: result.message,
		});
	} else {
		return res.status(200).json({
			success: true,
			data: result.data,
		});
	}
};


export const editPet = async (req, res) => {
	try {
		const result = await Pet.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true, runValidators: true }
		).lean();
		if (!result) {
			return res.status(404).json({ error: "Pet not found" });
		}
		return res.json(result);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

export const deletePet = async (req, res) => {
	try {
		const result = await Pet.findByIdAndDelete(req.params.id).lean();
		if (!result) {
			return res.status(404).json({ error: "Pet not found" });
		}
		return res.json({ message: "Pet deleted", data: result });
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};
