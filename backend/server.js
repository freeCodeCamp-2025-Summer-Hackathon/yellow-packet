
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import petRoutes from './routes/pets.js';

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

mongoose
	.connect(dbConfig.getConnectionString())
	.then(() => {
		console.log(":white_check_mark: MongoDB connected!");
	})
	.catch((error) => {
		console.log(":x: Connection failed:", error);
	});

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

console.log('Attempting to connect with MONGODB_URI:', process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('✅ MongoDB connected successfully.');
}).catch(err => {
  console.error('❌ Connection failed:', err);
  process.exit(1);
});

app.use('/api/pets', petRoutes);
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); // Temporarily disabled

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


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  // console.log(`Swagger docs available at http://localhost:${port}/api-docs`); // Temporarily disabled
});