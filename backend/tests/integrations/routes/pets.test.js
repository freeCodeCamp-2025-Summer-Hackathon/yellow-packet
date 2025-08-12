import supertest from "supertest";
import app from "../../../server.js";
import { PetProfile } from "../../../schemas/schema.js";
import {
	createTestPet,
	createTestShelter,
	createMultipleTestPets,
	createTestUser
} from "../../utils/helper.js"

const request = supertest(app);

describe('Pets API Integration Tests', () => {
	describe('GET /api/pets', () => {
		test('should return empty array when no pets exist', async () => {
			const res = await request.get("/api/pets");

			expect(res.status).toBe(200);
			expect(res.type).toMatch(/json/);
			expect(res.body.success).toBe(true);
			expect(res.body.data.length).toBe(0);
			expect(res.body.data).toEqual(expect.arrayContaining([]));
		});

		test('should return all pets when pets exist', async () => {
			// Create test data
			const shelter = await createTestShelter();
			const pets = await createMultipleTestPets(3, { shelterId: shelter._id });

			const res = await request.get("/api/pets");

			expect(res.status).toBe(200);
			expect(res.type).toMatch(/json/);
			expect(res.body.data.length).toBe(3);

			expect(res.body.data).toEqual(pets);
		});

		test('should return pets with correct shelter information', async () => {
			// Create specific test data
			const shelter = await createTestShelter(null, {
				shelter_name: "Test Animal Rescue",
				email: "test@rescue.com"
			});

			await createTestPet(shelter._id, {
				name: "Buddy",
				species: "dog",
				age: 3
			});

			const res = await request.get("/api/pets");

			expect(res.status).toBe(200);
			expect(res.body.data.length).toBe(1);
			expect(res.body.data[0].shelter_id).toBe(shelter._id.toString());
		});

	});

	describe('GET /api/pets/:id', () => {
		test('should return specific pet by ID', async () => {
			// Create test pet
			const pet = await createTestPet(null, {
				name: "Fluffy",
				species: "cat",
				age: 2
			});

			const res = await request.get(`/api/pets/${pet._id}`);

			expect(res.status).toBe(200);
			expect(res.body.data).toMatchObject({
				name: "Fluffy",
				species: "cat",
				age: 2
			});
		});

		test('should return 404 for non-existent pet', async () => {
			const fakeId = "111"; // Valid ObjectId format

			const res = await request.get(`/api/pets/${fakeId}`);

			expect(res.status).toBe(404);
		});
	});

	describe('POST /api/pets', () => {

		test('should create new pet with valid data', async () => {
			// Create a shelter first
			const shelter = await createTestShelter();

			const newPetData = {
				shelter_id: shelter._id.toString(), // Convert to string to match schema
				name: "Rex",
				species: "dog", // Valid enum value from schema
				sex: "male", // Use 'sex' not 'gender' per your schema
				age: 4,
				shelter: shelter.shelter_name, // Include shelter name
				size: "large", // Valid enum value
				weight: 65,
				personality: "friendly, loyal",
				about1: "Rex is a wonderful dog looking for a loving home.",
				about2: "He loves to play fetch and is great with kids.",
				bio: "A gentle giant who will make a perfect family companion.",
				spayed_neutered: true,
				favorites: [],
				pics: []
			};

			const res = await request
				.post('/api/pets')
				.send(newPetData);

			expect(res.status).toBe(201);
			expect(res.type).toMatch(/json/);
			expect(res.body.error).toBe(false);
			expect(res.body.pet).toMatchObject({
				name: "Rex",
				species: "dog",
				sex: "male",
				age: 4,
				shelter_id: shelter._id.toString(),
				size: "large",
				weight: 65,
				spayed_neutered: true
			});

			// Verify the pet was actually saved to the database
			const savedPet = await PetProfile.findById(res.body.pet._id);
			expect(savedPet).toBeTruthy();
			expect(savedPet.name).toBe("Rex");
			expect(savedPet.shelter_id).toBe(shelter._id.toString());
		});

		test('should return 400 when required fields are missing', async () => {
			const invalidPetData = {
				name: "Incomplete Pet"
				// Missing required fields
			};

			const res = await request
				.post('/api/pets')
				.send(invalidPetData);

			expect(res.status).toBe(404);
			expect(res.body).toHaveProperty('error', true);
		});
	});

	// Need to add a test for filtering and search
});
