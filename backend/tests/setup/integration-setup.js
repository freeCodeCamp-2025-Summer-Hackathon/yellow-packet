import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer;

beforeAll(async () => {
	// Start in-memory MongoDB instance
	mongoServer = await MongoMemoryServer.create();
	const mongoUri = mongoServer.getUri();

	// Connect to the in-memory database
	await mongoose.connect(mongoUri);
	console.log('🧪 Test database connected for integration tests');
}, 30000);

afterAll(async () => {
	// Clean up
	await mongoose.disconnect();
	await mongoServer.stop();
	console.log('🧪 Test database disconnected');
}, 30000);

beforeEach(async () => {
	// Clean all collections before each test
	const collections = mongoose.connection.collections;

	for (const key in collections) {
		const collection = collections[key];
		await collection.deleteMany({});
	}
});

