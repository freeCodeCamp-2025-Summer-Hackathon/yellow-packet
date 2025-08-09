import supertest from "supertest";
import app from "../../../server";

const request = supertest;

describe('POST /api/shelters', () => {
	test('should return 400 when email is missing', async () => {
		const requestBody = {
			shelter_name: "Test Shelter",
			phone_number: "123-456-7890",
			// email is missing
		};

		const response = await request(app)
			.post('/api/shelters')
			.send(requestBody)
			.expect(400);

		expect(response.body.error).toBe(true);
	});

	test('should return 400 when email is empty string', async () => {
		const requestBody = {
			shelter_name: "Test Shelter",
			email: "", // empty email
		};

		const response = await request(app)
			.post('/api/shelters')
			.send(requestBody)
			.expect(400);

		expect(response.body.error).toBe(true);
	});

	test('should return 400 when email is null', async () => {
		const requestBody = {
			shelter_name: "Test Shelter",
			email: null,
		};

		const response = await request(app)
			.post('/api/shelters')
			.send(requestBody)
			.expect(400);

		expect(response.body.error).toBe(true);
	});

	test('should return 400 when email is undefined', async () => {
		const requestBody = {
			shelter_name: "Test Shelter",
			email: undefined,
		};

		const response = await request(app)
			.post('/api/shelters')
			.send(requestBody)
			.expect(400);

		expect(response.body.error).toBe(true);
	});
});
