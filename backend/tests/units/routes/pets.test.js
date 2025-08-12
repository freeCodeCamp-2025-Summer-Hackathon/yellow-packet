import supertest from "supertest";
import app from "../../../server";

const request = supertest;

describe('POST /api/pets', () => {
	test("TRUE", () => {
		expect(true).tobe(true);
	})
});
