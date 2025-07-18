import express from "express";
import { Shelter, User } from "../schemas/schema.js";

const router = express.Router();

const validateShelterData = (req, res, next) => {
	const errors = [];
	const { body } = req;

	// Required fields
	if (!body.email) {
		errors.push("Email is required");
	}

	// Email format validation
	if (body.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
		errors.push("Invalid email format");
	}

	// If validation fails, return error response
	if (errors.length > 0) {
		return res.status(400).json({
			error: true,
			message: "Validation failed",
			errors
		});
	}

	next();
};

router.post("/", validateShelterData, async (req, res) => {
	try {
		const user = await User.create({
			username: req.body.email,
			password: "password",
			role: "shelter"
		});

		const shelter = await Shelter.create({
			user_id: user.id,
			shelter_name: req.body.shelter_name || "",
			phone_number: req.body.phone_number || "",
			email: req.body.email,
			zip_code: req.body.zip_code || "",
			bio: req.body.bio || "",
			city: req.body.city || "",
			state: req.body.state || "",
			address_line_1: req.body.address_line_1 || "",
			address_line_2: req.body.address_line_2 || "",
			years_active: req.body.years_active || 0,
			pets: req.body.pets || []
		});

		return res.status(201).json({
			error: false,
			message: "User and shelter created successfully",
			data: shelter
		});
	} catch (error) {
		return handleError(error, res);
	}
});

router.get("/", async (req, res) => {
	try {
		// Todo: Implement page, offset?
		const result = await Shelter.find({}).lean();
		return res.status(200).json(result);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
});

router.get("/:id", async (req, res) => {
	try {
		const result = await Shelter.findById(req.params.id).lean();
		return res.status(200).json(result);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
});

router.put("/:id", async (req, res) => {
	try {
		const result = await Shelter.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true, runValidators: true }
		).lean();
		if (!result) {
			return res.status(404).json({ error: "User not found" });
		}
		return res.json(result);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
});

router.delete("/:id", async (req, res) => {
	try {
		const shelter = await Shelter.findByIdAndDelete(req.params.id).lean();
		if (!shelter) {
			return res.status(404).json({ error: "Shelter not found" });
		}
		const user = await User.findByIdAndDelete(shelter.user_id).lean();
		if (!user) {
			return res.status(500).json({ error: "User not found" });
		}
		return res.json({ message: "Shelter deleted", data: shelter });
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
});

export default router;
