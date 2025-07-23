import express from "express";
import { logout, signup } from "../controllers/auth.controller.js";
import { AdopterProfile, Shelter, User } from "../schemas/schema.js";

const router = express.Router();

const login = async (req, res) => {
	try {
		const { body } = req;

		// Required fields
		if (!body.email || !body.password) {
			return res.status(400).json({
				error: true,
				message: "Validation failed! Both email and password are required",
			});
		}

		// Email format validation
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
			return res.status(400).json({
				error: true,
				message: "Validation failed! Please enter correct email format!",
			});
		}

		const shelter_email = await Shelter.findOne({ email: body.email }).lean();
		const adopter_email = await AdopterProfile.findOne({ email: body.email }).lean();

		if (!shelter_email && !adopter_email) {
			return res.status(404).json({
				error: true,
				message: "Email does not exist in the database",
			});
		}

		const pUser = shelter_email || adopter_email;
		const user = await User.findById(pUser.user_id).lean();

		if (!user) {
			return res.status(404).json({
				error: true,
				message: "User not found"
			});
		}

		// Use proper password comparison (consider using bcrypt.compare if passwords are hashed)
		if (body.password !== user.password) {
			return res.status(401).json({
				error: true,
				message: "Password incorrect!"
			});
		}

		res.status(200).json({
			success: true,
			message: "Login successful",
			user: {
				id: user._id,
				username: user.username,
				role: user.role
			}
		});

	} catch (error) {
		console.error('Login error:', error);
		return res.status(500).json({
			error: true,
			message: "Internal server error"
		});
	}
};

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: User login
 *     description: Authenticate a user with email and password
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       400:
 *         description: Bad request - missing email or password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Email and password are required"
 */

router.post("/login", login);

router.get("/signup", signup);
router.get("/logout", logout);

export default router;
