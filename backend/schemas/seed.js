import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';
import dotenv from "dotenv";
dotenv.config();

import { User, Shelter, PetProfile, AdopterProfile } from './schema.js';

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

mongoose.connect(dbConfig.getConnectionString())
	.then(() => console.log("Connected to test DB"))
	.catch(console.error);

const seed = async () => {
	try {
		// await mongoose.connection.dropDatabase();

		// Create users
		const users = await Promise.all(
			Array.from({ length: 5 }).map(async () => {
				const role = faker.helpers.arrayElement(["shelter", "adopter"]);
				const user = new User({
					username: faker.internet.userName(),
					password: faker.internet.password(),
					role
				});
				await user.save();
				return { ...user.toObject(), role };
			})
		);

		// Create shelters
		for (const user of users.filter(u => u.role === 'shelter')) {
			const shelter = new Shelter({
				user_id: user._id.toString(),
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
				pets: []
			});
			await shelter.save();
		}

		// Create adopters
		for (const user of users.filter(u => u.role === 'adopter')) {
			const adopter = new AdopterProfile({
				user_id: user._id.toString(),
				first_name: faker.person.firstName(),
				last_name: faker.person.lastName(),
				phone_number: faker.phone.number(),
				email: faker.internet.email(),
				bio: faker.lorem.sentence(),
				city: faker.location.city(),
				state: faker.location.state(),
				address_line_1: faker.location.streetAddress(),
				address_line_2: faker.location.secondaryAddress(),
				zip_code: faker.location.zipCode(),
				gender: faker.person.sex(),
				pronouns: faker.helpers.arrayElement(["he/him", "she/her", "they/them"]),
				birthday: faker.date.birthdate({ min: 18, max: 60, mode: 'age' }),
				favourite_pets: faker.helpers.arrayElements(["dog", "cat", "bird", "rabbit"])
			});
			await adopter.save();
		}

		// Create pet profiles

		const shelters = await Shelter.find(); // get all shelters

		for (const shelter of shelters) {
			for (let i = 0; i < 3; i++) { // create 3 pets per shelter
				const pet = await PetProfile.create({
					shelter_id: shelter._id.toString(),
					name: faker.person.firstName(),
					species: faker.helpers.arrayElement(["dog", "cat", "bird", "rabbit"]),
					sex: faker.helpers.arrayElement(["male", "female"]),
					years: faker.number.int({ min: 0, max: 15 }),
					weight: faker.number.float({ min: 1, max: 100, precision: 0.1 }),
					date_birth: faker.date.past({ years: 10 }),
					illness_disabilities: faker.lorem.sentence(),
					personality: faker.word.adjective(),
					photo_link: faker.image.url(),
					bio: faker.lorem.paragraph(),
					spayed_neutered: faker.datatype.boolean(),
					favourite: faker.helpers.arrayElement(["catnip", "ball", "string", "mirror"])
				});

				// Push pet UID to the shelter's pets list
				await Shelter.findByIdAndUpdate(
					shelter._id,
					{ $push: { pets: pet.pet_uid } },
					{ runValidators: true }
				);
			}
		}

		console.log("Database seeded successfully!");
		process.exit(0);
	} catch (err) {
		console.error("Error seeding data:", err);
		process.exit(1);
	}
};

seed();
