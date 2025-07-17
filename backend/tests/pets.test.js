import supertest from "supertest";
import app from "../server";
const requestWithSupertest = supertest(app);

describe('GET "/"', () => {
	test('GET "/" returns all pets', async () => {
		const res = await requestWithSupertest.get("/api/pets");
		expect(res.status).toEqual(200);
		expect(res.type).toEqual(expect.stringContaining("json"));
	});
});

