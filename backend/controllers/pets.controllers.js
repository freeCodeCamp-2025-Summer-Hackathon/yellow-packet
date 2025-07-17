import { addPetProfile, getAllPets, updatePetProfile, deletePetProfile, getPet } from "../models/pet.model.js";

export const addPet = async (req, res) => {
	console.log("Adding new pet with data:", req.body);
	const result = await addPetProfile(req.body);
	if (result.error) {
		return res.status(400).json({
			success: false,
			message: result.message,
		});
	} else {
		return res.status(201).json({
			success: true,
			message: "Pet added successfully",
			data: result,
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
	console.log("Updating pet with data:", req.body);
	const { id, ...values } = req.body;
	const result = await updatePetProfile(id, values);
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

export const deletePet = async (req, res) => {
	console.log("Deleting pet with ID:", req.body.id);
	const { id } = req.body;
	const result = await deletePetProfile(id);
	if (result.error) {
		return res.status(400).json({
			success: false,
			message: result.message,
		});
	} else {
		return res.status(200).json({
			success: true,
			message: "Pet deleted successfully",
			data: result.data,
		});
	}
};
