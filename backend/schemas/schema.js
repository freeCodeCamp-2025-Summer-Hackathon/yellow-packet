import mongoose from "mongoose";

// Helper function to add virtual ID and JSON transform
const addVirtualId = (schema, virtualName) => {
	// Remove the physical field from schema if it exists
	schema.remove(virtualName);

	// Add virtual field that maps to _id
	schema.virtual(virtualName).get(function() {
		return this._id.toString();
	});

	// Configure JSON serialization to include virtuals
	schema.set('toJSON', {
		virtuals: true,
		transform: function(doc, ret) {
			delete ret.__v;
			return ret;
		}
	});

	schema.set('toObject', { virtuals: true });
};

const adopterProfileSchema = new mongoose.Schema({
	user_id: { type: String, required: true },
	first_name: { type: String },
	last_name: { type: String },
	phone_number: { type: String },
	username: { type: String, required: true, unique: true },
	email: { type: String, required: true, unique: true },
	bio: { type: String },
	city: { type: String },
	state: { type: String },
	address_line_1: { type: String },
	address_line_2: { type: String },
	zip_code: { type: String },
	gender: { type: String },
	pronouns: { type: String },
	birthday: { type: Date },
	favorites: [String], // Array of pet IDs that the user has favorited
});

// Pet Profile Schema
const petProfileSchema = new mongoose.Schema({
	id: Number,
	name: String,
	species: { type: String, enum: ['dog', 'cat', 'bird', 'rabbit'] },
	sex: { type: String, enum: ['male', 'female'] },
	birthday: Date,
	age: Number,
	shelter: String, // shelter name
	size: { type: String, enum: ['small', 'medium', 'large'] },
	weight: Number,
	disabilities: String,
	personality: String,
	about1: String,
	about2: String,
	favorites: [String], // user _ids
	pics: [String], // image URLs
	bio: String,
	spayed_neutered: Boolean,
});

// Request Schema
const requestSchema = new mongoose.Schema({
	user_id: { type: String, required: true },
	first_name: { type: String },
	last_name: { type: String },
	phone_number: { type: String },
	email: { type: String },
	city: { type: String },
	bio: { type: String }
});

// Shelter Schema
const shelterSchema = new mongoose.Schema({
	user_id: { type: String, required: true },
	shelter_name: { type: String },
	phone_number: { type: String },
	email: { type: String, required: true, unique: true },
	zip_code: { type: String },
	bio: { type: String },
	city: { type: String },
	state: { type: String },
	address_line_1: { type: String },
	address_line_2: { type: String },
	years_active: { type: Number },
	pets: [{ type: String }]
});

// User Schema
const userSchema = new mongoose.Schema({
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	role: {
		type: String,
		required: true,
		enum: {
			values: ["shelter", "adopter"]
		}
	}
});

// Add virtual IDs to each schema
addVirtualId(adopterProfileSchema, 'adopter_id');
addVirtualId(petProfileSchema, 'pet_uid');
addVirtualId(shelterSchema, 'shelter_id');

// Create models
const User = mongoose.model("user", userSchema);
const Shelter = mongoose.model("shelter_profile", shelterSchema);
const Request = mongoose.model("request", requestSchema);
const PetProfile = mongoose.model("pet_profile", petProfileSchema);
const AdopterProfile = mongoose.model("adopter_profile", adopterProfileSchema);

export { User, Shelter, Request, PetProfile, AdopterProfile };
