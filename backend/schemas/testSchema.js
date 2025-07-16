import mongoose from 'mongoose';

// User Schema
const userSchema = new mongoose.Schema({
	dataType: { type: String, default: 'user' },
	name: { type: String, required: true },
	email: { type: String, required: true },
	postalZip: { type: String, required: true },
	phone: { type: String, required: true }
});

// Shelter Schema
const shelterSchema = new mongoose.Schema({
	dataType: { type: String, default: 'shelters' },
	shelterType: { type: String, required: true },
	email: { type: String, required: true },
	postalZip: { type: String, required: true },
	phoneNumber: { type: String, required: true },
	shelterName: { type: String, required: true }
});

// Animal Schema
const animalSchema = new mongoose.Schema({
	dataType: { type: String, default: 'animal' },
	animalType: { type: String, required: true },
	animalBreed: { type: String, required: true },
	postalZip: { type: String, required: true },
	petName: { type: String, required: true },
	shelterName: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);
const Shelter = mongoose.model('Shelter', shelterSchema);
const Animal = mongoose.model('Animal', animalSchema);

export { User, Shelter, Animal };
