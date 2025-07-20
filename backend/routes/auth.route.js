import express from "express";
import { logout, signup } from "../controllers/auth.controller.js";
  // I removed the login import so we could have it inline here

  const router = express.Router();

/* TODO modify login as a function */
const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required",
    });
  }

  if (email === "email@address.com" && password === "admin1234") {
    return res.status(200).json({
      success: true,
      message: "Login successful!",
    });
  } else {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials",
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
