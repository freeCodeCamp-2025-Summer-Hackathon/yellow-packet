import express from "express";
import dotenv from "dotenv";
import { specs, swaggerUi } from "./swagger.js";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import petRoutes from "./routes/pets.routes.js";

dotenv.config();

const dbConfig = {
  username: process.env.USER_MONGOOSE || "usr",
  password: process.env.USER_MONGOOSE_PASSWORD || "pass",
  address: process.env.MONGOOSE_ADDRESS || "localhost",
  cluster: process.env.MONGOOSE_CLUSTER || "cluster0",
  database: process.env.DATABASE_NAME || "yellow-packet",

  // Build the connection string
  getConnectionString() {
    return `mongodb+srv://melkyup:MvqDUVlxIlINjx29@cluster0.6a1ghq7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
  },
};

mongoose
  .connect(dbConfig.getConnectionString())
  .then(() => {
    console.log(":white_check_mark: MongoDB connected!");
  })
  .catch((error) => {
    console.log(":x: Connection failed:", error);
  });

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
app.use("/api/pet", petRoutes);
if (process.env.DEVELOPMENT === "test") {
  const { default: testRoutes } = await import("./routes/test.route.js");
  app.use("/api/test", testRoutes);
  console.log("🧪 Test routes enabled");
}

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
  console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});
