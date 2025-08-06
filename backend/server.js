import express from "express";
import dotenv from "dotenv";
import { specs, swaggerUi } from "./swagger.js";
import mongoose from "mongoose";
import cors from "cors"

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import petRoutes from "./routes/pets.routes.js";
import shelterRoutes from "./routes/shelter.route.js";
import requestRoutes from "./routes/request.route.js";
import cloudinaryRoutes from "./routes/cloudinary.route.js"

dotenv.config();

const dbConfig = {
	username: process.env.USER_MONGOOSE,
	password: process.env.USER_MONGOOSE_PASSWORD,
	address: process.env.MONGOOSE_ADDRESS,
	cluster: process.env.MONGOOSE_CLUSTER,
	database: process.env.DATABASE_NAME,

	// Build the connection string
	getConnectionString() {
		return `mongodb+srv://${this.username}:${this.password}@${this.address}/${this.database}?retryWrites=true&w=majority&appName=${this.cluster}`;
	},
};

// Database connection logic
// For integration tests, MongoDB connection is handled by the test setup
// For unit tests, mongoose is mocked
// Only connect to production/development MongoDB if not in test environment
if (process.env.NODE_ENV !== 'test') {
	mongoose.connect(dbConfig.getConnectionString())
		.then(() => {
			console.log(':white_check_mark: MongoDB connected!');
		})
		.catch((error) => {
			console.log(':x: Connection failed:', error);
		});
}

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

/**
 * @swagger
 * tags:
 *   name: General
 *   description: General API endpoints
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Health check endpoint
 *     tags: [General]
 *     responses:
 *       200:
 *         description: API is running
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "API is running"
 */
app.get("/", (_req, res) => {
	res.json({ message: "API is running" });
});

// IMPORTANT: Add this BEFORE the swagger-ui middleware for it to generate markdown documentation
app.get("/api-docs/swagger.json", (_req, res) => {
	res.json(specs);
});

// Swagger Documentation
app.use(
	"/api-docs",
	swaggerUi.serve,
	swaggerUi.setup(specs, {
		explorer: true,
		customCss: ".swagger-ui .topbar { display: none }",
		customSiteTitle: "My API Documentation",
	})
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/pets", petRoutes);
app.use("/api/shelters", shelterRoutes);
app.use("/api/request", requestRoutes);
app.use("/api/cloudinary", cloudinaryRoutes);

if (process.env.NODE_ENV === "test") {
	const { default: testRoutes } = await import("./routes/test.route.js");
	app.use("/api/test", testRoutes);
	console.log("🧪 Test routes enabled");
}

export default app;
