import { faker } from '@faker-js/faker';

import { User, Shelter, PetProfile as Pet, AdopterProfile, Request } from '../../schemas/schema.js';

// Helper functions to create test data that returns like API calls
export const createTestUser = async (overrides = {}) => {
	const userData = {
		username: faker.internet.email(),
		password: faker.internet.password(),
		role: faker.helpers.arrayElement(['adopter', 'shelter']), // Fixed to match schema enum
		...overrides
	};

	const user = await User.create(userData);
	// Return like User.findById() would - as a document
	return await User.findById(user._id);
};

export const createTestAdopterProfile = async (userId = null, overrides = {}) => {
	// Create a user if not provided
	if (!userId) {
		const user = await createTestUser({ role: 'adopter' });
		userId = user._id.toString();
	}

	const adopterData = {
		user_id: userId,
		first_name: faker.person.firstName(),
		last_name: faker.person.lastName(),
		phone_number: faker.phone.number(),
		username: faker.internet.userName(),
		email: faker.internet.email(),
		bio: faker.lorem.paragraph(),
		city: faker.location.city(),
		state: faker.location.state(),
		address_line_1: faker.location.streetAddress(),
		address_line_2: faker.location.secondaryAddress(),
		zip_code: faker.location.zipCode(),
		gender: faker.helpers.arrayElement(['male', 'female', 'non-binary', 'prefer not to say']),
		pronouns: faker.helpers.arrayElement(['he/him', 'she/her', 'they/them', 'other']),
		birthday: faker.date.birthdate({ min: 18, max: 80, mode: 'age' }),
		favorites: [], // Start with empty array
		...overrides
	};

	const adopter = await AdopterProfile.create(adopterData);
	// Return like AdopterProfile.findById() would - includes virtuals when converted
	return await AdopterProfile.findById(adopter._id);
};

export const createTestShelter = async (userId = null, overrides = {}) => {
	// Create a user if not provided
	if (!userId) {
		const user = await createTestUser({ role: 'shelter' });
		userId = user._id;
	}

	const shelterData = {
		user_id: userId,
		shelter_name: faker.company.name() + ' Animal Shelter',
		phone_number: faker.phone.number(),
		email: faker.internet.email(),
		zip_code: faker.location.zipCode(),
		bio: faker.lorem.paragraph(),
		city: faker.location.city(),
		state: faker.location.state(),
		address_line_1: faker.location.streetAddress(),
		address_line_2: faker.location.secondaryAddress(),
		years_active: faker.number.int({ min: 1, max: 20 }),
		pets: [], // Start with empty array
		...overrides
	};

	return await Shelter.create(shelterData);
};

export const createTestPet = async (shelterId = null, overrides = {}) => {
	// Create a shelter if not provided
	let shelterIdString = shelterId;
	if (!shelterId) {
		const shelter = await createTestShelter();
		shelterIdString = shelter._id.toString();
	}

	const petData = {
		shelter_id: shelterIdString,
		name: faker.person.firstName(),
		species: faker.helpers.arrayElement(['dog', 'cat', 'bird', 'rabbit']),
		sex: faker.helpers.arrayElement(['male', 'female']), // Fixed to match schema field
		birthday: faker.date.birthdate({ min: 0, max: 15, mode: 'age' }),
		age: faker.number.int({ min: 0, max: 15 }),
		shelter: faker.company.name() + ' Animal Shelter',
		size: faker.helpers.arrayElement(['small', 'medium', 'large']),
		weight: faker.number.int({ min: 5, max: 150 }),
		disabilities: faker.helpers.maybe(() => faker.lorem.sentence(), { probability: 0.3 }),
		personality: faker.helpers.arrayElements([
			'friendly', 'playful', 'calm', 'energetic', 'shy', 'social', 'independent', 'loyal'
		], { min: 1, max: 3 }).join(', '),
		about1: faker.lorem.paragraph(),
		about2: faker.lorem.paragraph(),
		favorites: [], // Start with empty array of user IDs
		pics: [],
		bio: faker.lorem.paragraph(),
		spayed_neutered: faker.datatype.boolean(),
		...overrides
	};

	return await Pet.create(petData);
};

export const createTestRequest = async (overrides = {}) => {
	const requestData = {
		user_id: faker.string.uuid(),
		first_name: faker.person.firstName(),
		last_name: faker.person.lastName(),
		phone_number: faker.phone.number(),
		email: faker.internet.email(),
		city: faker.location.city(),
		bio: faker.lorem.paragraph(),
		...overrides
	};

	const request = await Request.create(requestData);
	// Return like Request.findById() would
	return await Request.findById(request._id);
};

// Helper to create multiple records
export const createMultipleTestPets = async (count = 5, options = {}) => {
	const pets = [];
	for (let i = 0; i < count; i++) {
		const pet = await createTestPet(options.shelterId, options.overrides);
		pets.push(pet);
	}
	const expectedPets = pets.map(p => JSON.parse(JSON.stringify(p.toJSON()))); // Make sure it return plain object like the server API
	return expectedPets;
};

export const createMultipleTestShelters = async (count = 3, options = {}) => {
	const shelters = [];
	for (let i = 0; i < count; i++) {
		const shelter = await createTestShelter(options.userId, options.overrides);
		shelters.push(shelter);
	}
	// Return like Shelter.find() would - array of documents
	return shelters;
};

export const createMultipleTestAdopters = async (count = 3, options = {}) => {
	const adopters = [];
	for (let i = 0; i < count; i++) {
		const adopter = await createTestAdopterProfile(options.userId, options.overrides);
		adopters.push(adopter);
	}
	// Return like AdopterProfile.find() would - array of documents
	return adopters;
};

