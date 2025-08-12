import supertest from "supertest";
import app from "../../../server";
import { faker } from '@faker-js/faker';

const request = supertest;

describe('POST /api/pets', () => {
	test('should return 404 when email is missing', async () => {
		const requestBody = {
			name: "Test pet",
			sex: faker.helpers.arrayElement(['male', 'female']),
			shelter_id: null,
		};

		const response = await request(app)
			.post('/api/pets')
			.send(requestBody)
			.expect(404);

		// expect(response.body.error).toBe(true);
	});

});
