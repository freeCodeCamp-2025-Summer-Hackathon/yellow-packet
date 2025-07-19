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

		// Create users - ensuring we have at least 5 shelter users and some adopter users
		const shelterUsers = await Promise.all(
			Array.from({ length: 6 }).map(async () => { // Create 6 shelter users
				const user = new User({
					username: faker.internet.userName(),
					password: faker.internet.password(),
					role: "shelter"
				});
				await user.save();
				return user;
			})
		);

		const adopterUsers = await Promise.all(
			Array.from({ length: 4 }).map(async () => { // Create 4 adopter users
				const user = new User({
					username: faker.internet.userName(),
					password: faker.internet.password(),
					role: "adopter"
				});
				await user.save();
				return user;
			})
		);

		// Create shelters (at least 5)
		const createdShelters = [];
		for (const user of shelterUsers) {
			const shelter = new Shelter({
				user_id: user._id.toString(),
				shelter_name: faker.company.name() + " Animal Shelter",
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
			createdShelters.push(shelter);
		}

		// Create adopters
		for (const user of adopterUsers) {
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

		// Create pet profiles - at least 5 pets per shelter
		for (const shelter of createdShelters) {
			const numberOfPets = faker.number.int({ min: 5, max: 8 }); // 5-8 pets per shelter

			for (let i = 0; i < numberOfPets; i++) {
				const species = faker.helpers.arrayElement(["dog", "cat", "bird", "rabbit"]);
				const age = faker.number.int({ min: 0, max: 15 });

				// Generate size based on species (more realistic)
				let size;
				if (species === "dog") {
					size = faker.helpers.arrayElement(["small", "medium", "large"]);
				} else if (species === "cat") {
					size = faker.helpers.arrayElement(["small", "medium"]);
				} else if (species === "bird") {
					size = "small";
				} else if (species === "rabbit") {
					size = faker.helpers.arrayElement(["small", "medium"]);
				}

				// Generate weight based on size and species
				let weight;
				if (size === "small") {
					weight = faker.number.float({ min: 1, max: 20, precision: 0.1 });
				} else if (size === "medium") {
					weight = faker.number.float({ min: 20, max: 50, precision: 0.1 });
				} else {
					weight = faker.number.float({ min: 50, max: 100, precision: 0.1 });
				}

				const pet = await PetProfile.create({
					shelter_id: shelter._id.toString(),
					name: faker.person.firstName(),
					species: species,
					size: size,
					sex: faker.helpers.arrayElement(["male", "female"]),
					shelter_name: shelter.shelter_name,
					age: age, // Note: using 'ages' as per your schema
					weight: weight,
					date_birth: faker.date.past({ years: age || 1 }),
					illness_disabilities: faker.datatype.boolean() ? faker.lorem.sentence() : "None",
					personality: faker.helpers.arrayElements([
						"Friendly", "Playful", "Calm", "Energetic", "Shy", "Outgoing",
						"Gentle", "Protective", "Curious", "Affectionate"
					], { min: 1, max: 3 }).join(", "),
					photo_link: faker.image.url(),
					bio: faker.lorem.paragraph(),
					spayed_neutered: faker.datatype.boolean(),
					favourite: false
				});

				// Push pet UID to the shelter's pets list
				await Shelter.findByIdAndUpdate(
					shelter._id,
					{ $push: { pets: pet.pet_uid } },
					{ runValidators: true }
				);
			}
		}

		// Log summary
		const shelterCount = await Shelter.countDocuments();
		const petCount = await PetProfile.countDocuments();
		const adopterCount = await AdopterProfile.countDocuments();

		console.log("Database seeded successfully!");
		console.log(`Created ${shelterCount} shelters`);
		console.log(`Created ${petCount} pets`);
		console.log(`Created ${adopterCount} adopters`);
		console.log(`Average pets per shelter: ${(petCount / shelterCount).toFixed(1)}`);

		process.exit(0);
	} catch (err) {
		console.error("Error seeding data:", err);
		process.exit(1);
	}
};

seed();
