import express from "express";
import { User } from "../schemas/schema.js"

const router = express.Router();

router.get("/", async (req, res) => {
	try {
		const result = await User.find({}).lean();
		return res.json(result);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
});

export default router;
