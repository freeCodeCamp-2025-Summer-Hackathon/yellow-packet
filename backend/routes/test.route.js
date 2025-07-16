import express from "express";
import mongoose from "mongoose";
import { User, Shelter, Animal } from "../schemas/testSchema.js";

const router = express.Router();

router.get("/", (_req, res) => {
	res.send(`Test route is on. The current database is ${mongoose.connection.db.databaseName}`)
});

router.get("/collections", async (req, res) => {
	try {
		const collections = await mongoose.connection.db.listCollections().toArray();
		return res.json(collections);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
});

// ========== USERS ==========

// Get all users
router.get("/collections/users", async (_req, res) => {
	try {
		const result = await User.find({}).lean();
		return res.json(result);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
});

// Add user
router.post("/collections/users", async (req, res) => {
	try {
		const newUser = new User(req.body);
		const result = await newUser.save();
		return res.status(201).json(result.toObject());
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
});

// Update user
router.put("/collections/users/:id", async (req, res) => {
	try {
		const result = await User.findByIdAndUpdate(
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

// Delete user
router.delete("/collections/users/:id", async (req, res) => {
	try {
		const result = await User.findByIdAndDelete(req.params.id).lean();
		if (!result) {
			return res.status(404).json({ error: "User not found" });
		}
		return res.json({ message: "User deleted", data: result });
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
});

// ========== SHELTERS ==========

// Get all shelters
router.get("/collections/shelters", async (_req, res) => {
	try {
		const result = await Shelter.find({}).lean();
		return res.json(result);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
});

// Add shelter
router.post("/collections/shelters", async (req, res) => {
	try {
		const newShelter = new Shelter(req.body);
		const result = await newShelter.save();
		return res.status(201).json(result.toObject());
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
});

// Update shelter
router.put("/collections/shelters/:id", async (req, res) => {
	try {
		const result = await Shelter.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true, runValidators: true }
		).lean();
		if (!result) {
			return res.status(404).json({ error: "Shelter not found" });
		}
		return res.json(result);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
});

// Delete shelter
router.delete("/collections/shelters/:id", async (req, res) => {
	try {
		const result = await Shelter.findByIdAndDelete(req.params.id).lean();
		if (!result) {
			return res.status(404).json({ error: "Shelter not found" });
		}
		return res.json({ message: "Shelter deleted", data: result });
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
});

// ========== ANIMALS/PETS ==========

// Get all animals
router.get("/collections/pets", async (_req, res) => {
	try {
		const result = await Animal.find({}).lean();
		return res.json(result);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
});

// Add animal
router.post("/collections/pets", async (req, res) => {
	try {
		const newAnimal = new Animal(req.body);
		const result = await newAnimal.save();
		return res.status(201).json(result.toObject());
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
});

// Update animal
router.put("/collections/pets/:id", async (req, res) => {
	try {
		const result = await Animal.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true, runValidators: true }
		).lean();
		if (!result) {
			return res.status(404).json({ error: "Animal not found" });
		}
		return res.json(result);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
});

// Delete animal
router.delete("/collections/pets/:id", async (req, res) => {
	try {
		const result = await Animal.findByIdAndDelete(req.params.id).lean();
		if (!result) {
			return res.status(404).json({ error: "Animal not found" });
		}
		return res.json({ message: "Animal deleted", data: result });
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
});

export default router;
