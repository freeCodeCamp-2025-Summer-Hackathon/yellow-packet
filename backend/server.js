import express from "express";
import dotenv from "dotenv";
import { specs, swaggerUi } from './swagger.js';

import authRoutes from "./routes/auth.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
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
app.get('/', (req, res) => {
	res.json({ message: 'API is running' });
});

// IMPORTANT: Add this BEFORE the swagger-ui middleware for it to generate markdown documentation
app.get('/api-docs/swagger.json', (req, res) => {
	res.json(specs);
});

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
	explorer: true,
	customCss: '.swagger-ui .topbar { display: none }',
	customSiteTitle: "My API Documentation"
}));

// Routes
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
	console.log("Server is running on http://localhost:" + PORT);
	console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});
