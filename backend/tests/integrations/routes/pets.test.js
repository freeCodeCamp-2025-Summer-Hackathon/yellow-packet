import supertest from "supertest";
import app from "../../../server.js";
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

		// test('should return all pets when pets exist', async () => {
		// 	// Create test data
		// 	const shelter = await createTestShelter();
		// 	const pets = await createMultipleTestPets(3, { shelterId: shelter._id });
		//
		// 	const res = await request.get("/api/pets");
		//
		// 	expect(res.status).toBe(200);
		// 	expect(res.type).toMatch(/json/);
		// 	expect(res.body).toHaveLength(3);
		//
		// 	// // Verify the pets have the expected structure
		// 	// expect(res.body[0]).toMatchObject({
		// 	// 	name: expect.any(String),
		// 	// 	species: expect.any(String),
		// 	// 	breed: expect.any(String),
		// 	// 	age: expect.any(Number),
		// 	// 	is_adopted: expect.any(Boolean)
		// 	// });
		// });
		//
		// test('should return pets with correct shelter information', async () => {
		// 	// Create specific test data
		// 	const shelter = await createTestShelter({
		// 		shelter_name: "Test Animal Rescue",
		// 		email: "test@rescue.com"
		// 	});
		//
		// 	const pet = await createTestPet(shelter._id, {
		// 		name: "Buddy",
		// 		species: "dog",
		// 		age: 3
		// 	});
		//
		// 	const res = await request.get("/api/pets");
		//
		// 	expect(res.status).toBe(200);
		// 	expect(res.body).toHaveLength(1);
		// 	expect(res.body[0]).toMatchObject({
		// 		name: "Buddy",
		// 		species: "dog",
		// 		age: 3,
		// 		shelter_id: shelter._id.toString()
		// 	});
		// });

	});

	// 	describe('GET /api/pets/:id', () => {
	// 		test('should return specific pet by ID', async () => {
	// 			// Create test pet
	// 			const pet = await createTestPet(null, {
	// 				name: "Fluffy",
	// 				species: "cat",
	// 				age: 2
	// 			});
	//
	// 			const res = await request.get(`/api/pets/${pet._id}`);
	//
	// 			expect(res.status).toBe(200);
	// 			expect(res.body).toMatchObject({
	// 				name: "Fluffy",
	// 				species: "cat",
	// 				age: 2
	// 			});
	// 		});
	//
	// 		test('should return 404 for non-existent pet', async () => {
	// 			const fakeId = "507f1f77bcf86cd799439011"; // Valid ObjectId format
	//
	// 			const res = await request.get(`/api/pets/${fakeId}`);
	//
	// 			expect(res.status).toBe(404);
	// 		});
	// 	});
	//
	// 	describe('POST /api/pets', () => {
	// 		test('should create new pet with valid data', async () => {
	// 			// Create a shelter first
	// 			const shelter = await createTestShelter();
	//
	// 			const newPetData = {
	// 				shelter_id: shelter._id,
	// 				name: "Rex",
	// 				species: "dog",
	// 				breed: "Golden Retriever",
	// 				age: 4,
	// 				gender: "male",
	// 				size: "large"
	// 			};
	//
	// 			const res = await request
	// 				.post('/api/pets')
	// 				.send(newPetData);
	//
	// 			expect(res.status).toBe(201);
	// 			expect(res.body).toMatchObject({
	// 				name: "Rex",
	// 				species: "dog",
	// 				breed: "Golden Retriever",
	// 				age: 4
	// 			});
	// 		});
	//
	// 		test('should return 400 when required fields are missing', async () => {
	// 			const invalidPetData = {
	// 				name: "Incomplete Pet"
	// 				// Missing required fields
	// 			};
	//
	// 			const res = await request
	// 				.post('/api/pets')
	// 				.send(invalidPetData);
	//
	// 			expect(res.status).toBe(400);
	// 			expect(res.body).toHaveProperty('error', true);
	// 		});
	// 	});
	//
	// 	describe('Filtering and Search', () => {
	// 		beforeEach(async () => {
	// 			// Create diverse test data for filtering tests
	// 			const shelter = await createTestShelter();
	//
	// 			await createTestPet(shelter._id, {
	// 				name: "Buddy",
	// 				species: "dog",
	// 				age: 2,
	// 				size: "medium",
	// 				is_adopted: false
	// 			});
	//
	// 			await createTestPet(shelter._id, {
	// 				name: "Whiskers",
	// 				species: "cat",
	// 				age: 5,
	// 				size: "small",
	// 				is_adopted: false
	// 			});
	//
	// 			await createTestPet(shelter._id, {
	// 				name: "Adopted Pet",
	// 				species: "dog",
	// 				age: 3,
	// 				size: "large",
	// 				is_adopted: true
	// 			});
	// 		});
	//
	// 		test('should filter pets by species', async () => {
	// 			const res = await request.get('/api/pets?species=dog');
	//
	// 			expect(res.status).toBe(200);
	// 			expect(res.body).toHaveLength(2);
	// 			res.body.forEach(pet => {
	// 				expect(pet.species).toBe('dog');
	// 			});
	// 		});
	//
	// 		test('should filter out adopted pets by default', async () => {
	// 			const res = await request.get('/api/pets?available=true');
	//
	// 			expect(res.status).toBe(200);
	// 			expect(res.body).toHaveLength(2); // Only non-adopted pets
	// 			res.body.forEach(pet => {
	// 				expect(pet.is_adopted).toBe(false);
	// 			});
	// 		});
	// 	});


});
