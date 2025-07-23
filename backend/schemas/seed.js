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
		let petIdCounter = 1000;

		// Create users - ensuring we have at least 5 shelter users and some adopter users
		const shelterUsers = await Promise.all(
			Array.from({ length: 6 }).map(async () => { // Create 6 shelter users
				const user = new User({
					username: faker.internet.username(),
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
					username: faker.internet.username(),
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

		let pronouns;
		const gender = faker.person.sex();
		if (gender) {
			pronouns = gender === "male" ? "he/him" : "she/her";
			if (Math.random() < 0.25) {
				pronouns = "they/them"; // Default
			}
		}

		// Create adopters
		for (const user of adopterUsers) {
			const adopter = new AdopterProfile({
				user_id: user._id.toString(),
				first_name: faker.person.firstName(),
				last_name: faker.person.lastName(),
				phone_number: faker.phone.number(),
				username: user.username, // Use the same username as the user
				email: user.username + "@example.com", // Simple email generation
				bio: faker.lorem.sentence(),
				city: faker.location.city(),
				state: faker.location.state(),
				address_line_1: faker.location.streetAddress(),
				address_line_2: faker.location.secondaryAddress(),
				zip_code: faker.location.zipCode(),
				gender: gender,
				pronouns: pronouns,
				birthday: faker.date.birthdate({ min: 18, max: 60, mode: 'age' }),
				favorites: []
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

				// Fake pet images
				let fake_image_url_1, fake_image_url_12;
				if (species === "dog") {
					fake_image_url_1 = "https://plus.unsplash.com/premium_photo-1694819488591-a43907d1c5cc?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y3V0ZSUyMGRvZ3xlbnwwfHwwfHx8MA%3D%3D";
					fake_image_url_12 = "https://images.unsplash.com/photo-1611003228941-98852ba62227?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFieSUyMGRvZ3xlbnwwfHwwfHx8MA%3D%3D";
				} else if (species === "bird") {
					fake_image_url_1 = "https://supertails.com/cdn/shop/articles/indian-parrot_905855fc-e32a-444b-9965-203d5ab678c6.jpg?v=1742204056";
					fake_image_url_12 = "https://images.unsplash.com/photo-1606383070180-aa3c0a87cd28?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cGFycm90c3xlbnwwfHwwfHx8MA%3D%3D";
				} else if (species === "cat") {
					fake_image_url_1 = "https://cst.brightspotcdn.com/dims4/default/9e04f85/2147483647/strip/false/crop/5000x2813+0+263/resize/1200x675!/quality/90/?url=https%3A%2F%2Fchorus-production-cst-web.s3.us-east-1.amazonaws.com%2Fbrightspot%2F91%2F13%2Fdd3ccd65438eaec555522479705d%2Fadobestock-236992283.jpg";
					fake_image_url_12 = "https://images.unsplash.com/photo-1529778873920-4da4926a72c2?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y3V0ZSUyMGNhdHxlbnwwfHwwfHx8MA%3D%3D";
				} else if (species === "rabbit") {
					fake_image_url_1 = "https://images.unsplash.com/photo-1619447257726-fe312296ee9b?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmFieSUyMHJhYmJpdHxlbnwwfHwwfHx8MA%3D%3D";
					fake_image_url_12 = "https://i.pinimg.com/474x/dc/2f/aa/dc2faac3c42508e7df800c2264eaa33c.jpg";
				}

				const pet = await PetProfile.create({
					id: petIdCounter++,
					shelter_id: shelter._id.toString(),
					name: faker.person.firstName(),
					species: species,
					size: size,
					sex: faker.helpers.arrayElement(["male", "female"]),
					shelter: shelter.shelter_name,
					age: age, 
					weight: weight,
					birthday: faker.date.past({ years: age || 1 }),
					disabilities: faker.datatype.boolean() ? faker.lorem.sentence() : "None",
					personality: faker.helpers.arrayElements([
						"Friendly", "Playful", "Calm", "Energetic", "Shy", "Outgoing",
						"Gentle", "Protective", "Curious", "Affectionate"
					], { min: 1, max: 3 }).join(", "),
					pics: faker.helpers.arrayElements([fake_image_url_1, fake_image_url_12, fake_image_url_1, fake_image_url_12], { min: 1, max: 4 }),
					bio: faker.lorem.paragraph(),
					about1: faker.lorem.sentence(),
					about2: faker.lorem.sentence(),
					favorites: [],
					spayed_neutered: faker.datatype.boolean(),
				});

				// Push pet UID to the shelter's pets list
				await Shelter.findByIdAndUpdate(
					shelter._id,
					{ $push: { pets: pet.id } },
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
