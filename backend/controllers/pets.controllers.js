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

		// Create the pet
		const pet = await PetProfile.create({
			shelter_id: req.body.shelter_id,
			species: req.body.species.toLowerCase(),
			shelter_name: shelter.shelter_name,
			sex: req.body.sex || "",
			age: req.body.years || 0,
			weight: req.body.weight || 0,
			date_birth: req.body.date_birth || null,
			illness_disabilities: req.body.illness_disabilities || "",
			personality: req.body.personality || "",
			photo_link: req.body.photo_link || "",
			bio: req.body.bio || "",
			spayed_neutered: req.body.spayed_neutered || false,
			favourite: req.body.favourite || "" // Will need to change the schema to fix the many-to-many 
		});

		await Shelter.findByIdAndUpdate(
			req.body.shelter_id,
			{ $push: { pets: pet.pet_uid } },
			{ runValidators: true }
		);

		return res.status(201).json({
			error: false,
			message: "Pet created successfully",
			data: pet
		});

	} catch (error) {
		return res.status(500).json({
			error: true,
			message: error.message
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
