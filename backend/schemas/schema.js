import mongoose from "mongoose";

const adopterProfileSchema = new mongoose.Schema({
	user_id: { type: String, required: true },
	first_name: { type: String },
	last_name: { type: String },
	phone_number: { type: String },
	email: { type: String },
	bio: { type: String },
	city: { type: String },
	state: { type: String },
	address_line_1: { type: String },
	address_line_2: { type: String },
	zip_code: { type: String },
	gender: { type: String },
	pronouns: { type: String },
	birthday: { type: Date },
	favourite_pets: [{ type: String }]
});

const petProfileSchema = new mongoose.Schema({
	pet_uid: { type: String, required: true },
	shelter_id: { type: String, required: true },
	species: {
		type: String, required: true, enum: {
			values: ["dog", "cat", "bird", "rabbit"]
		}
	},
	sex: { type: String },
	years: { type: Number },
	weight: { type: Number },
	date_birth: { type: Date },
	illness_disabilities: { type: String },
	personality: { type: String },
	photo_link: { type: String },
	bio: { type: String },
	spayed_neutered: { type: Boolean },
	favourite: { type: String }
});

const requestSchema = new mongoose.Schema({
	user_id: { type: String, required: true },
	first_name: { type: String },
	last_name: { type: String },
	phone_number: { type: String },
	email: { type: String },
	city: { type: String },
	bio: { type: String }
});

const shelterSchema = new mongoose.Schema({
	user_id: { type: String, required: true },
	shelter_name: { type: String },
	phone_number: { type: String },
	email: { type: String, required: true },
	zip_code: { type: String },
	bio: { type: String },
	city: { type: String },
	state: { type: String },
	address_line_1: { type: String },
	address_line_2: { type: String },
	years_active: { type: Number },
	pets: [{ type: String }]
});

const userSchema = new mongoose.Schema({
	username: { type: String, required: true },
	password: { type: String, required: true },
	role: {
		type: String, required: true, enum: {
			values: ["shelter", "adopter"]
		}
	}
});

const User = mongoose.model("user", userSchema);
const Shelter = mongoose.model("shelter_profile", shelterSchema);
const Request = mongoose.model("request", requestSchema);
const PetProfile = mongoose.model("pet_profile", petProfileSchema);
const AdopterProfile = mongoose.model("adopter_profile", adopterProfileSchema);

export { User, Shelter, Request, PetProfile, AdopterProfile }
