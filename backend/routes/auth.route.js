import express from "express";
import { home, login, logout, signup } from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/", home);
router.get("/signup", signup);
router.get("/login", login);
router.get("/logout", logout);

export default router;