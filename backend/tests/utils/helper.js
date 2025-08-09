import { faker } from '@faker-js/faker';

import { User, Shelter, PetProfile as Pet } from '../../schemas/schema.js';

// Helper functions to create test data
export const createTestUser = async (overrides = {}) => {
	const userData = {
		username: faker.internet.email(),
		password: faker.internet.password(),
		role: faker.helpers.arrayElement(['user', 'shelter']),
		...overrides
	};

	return await User.create(userData);
};

export const createTestShelter = async (userId = null, overrides = {}) => {
	// Create a user if not provided
	if (!userId) {
		const user = await createTestUser({ role: 'shelter' });
		userId = user._id;
	}

	const shelterData = {
		user_id: userId,
		shelter_name: faker.company.name(),
		phone_number: faker.phone.number(),
		email: faker.internet.email(),
		zip_code: faker.location.zipCode(),
		bio: faker.lorem.paragraph(),
		city: faker.location.city(),
		state: faker.location.state(),
		address_line_1: faker.location.streetAddress(),
		address_line_2: faker.location.secondaryAddress(),
		years_active: faker.number.int({ min: 1, max: 20 }),
		pets: [],
		...overrides
	};

	return await Shelter.create(shelterData);
};

export const createTestPet = async (shelterId = null, overrides = {}) => {
	// Create a shelter if not provided
	if (!shelterId) {
		const shelter = await createTestShelter();
		shelterId = shelter._id;
	}

	const petData = {
		shelter_id: shelterId,
		name: faker.person.firstName(),
		species: faker.helpers.arrayElement(['dog', 'cat', 'bird', 'rabbit']),
		breed: faker.animal.dog(), // You might want to make this species-specific
		age: faker.number.int({ min: 1, max: 15 }),
		gender: faker.helpers.arrayElement(['male', 'female']),
		size: faker.helpers.arrayElement(['small', 'medium', 'large']),
		color: faker.color.human(),
		description: faker.lorem.paragraph(),
		medical_history: faker.lorem.sentence(),
		is_adopted: false,
		adoption_fee: faker.number.int({ min: 50, max: 500 }),
		...overrides
	};

	return await Pet.create(petData);
};

// Helper to create multiple records
export const createMultipleTestPets = async (count = 5, options = {}) => {
	const pets = [];
	for (let i = 0; i < count; i++) {
		const pet = await createTestPet(options.shelterId, options.overrides);
		pets.push(pet);
	}
	return pets;
};

export const createMultipleTestShelters = async (count = 3, options = {}) => {
	const shelters = [];
	for (let i = 0; i < count; i++) {
		const shelter = await createTestShelter(options.userId, options.overrides);
		shelters.push(shelter);
	}
	return shelters;
};
