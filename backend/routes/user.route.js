import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
	res.json({
		name: "Hello",
		age: 10
	});
});

export default router;
