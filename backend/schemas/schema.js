import mongoose from "mongoose";

// Helper function to add virtual ID and JSON transform
const addVirtualId = (schema, virtualName) => {
	schema.remove(virtualName);

	schema.virtual(virtualName).get(function() {
		return this._id.toString();
	});

	// Configure JSON serialization to include virtuals
	schema.set('toJSON', {
		virtuals: true,
		transform: function(doc, ret) {
			return ret;
		}
	});

	// Also set toObject to include virtuals
	schema.set('toObject', {
		virtuals: true,
		transform: function(doc, ret) {
			return ret;
		}
	});
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
	favorites: [{ type: String }], // Array of pet IDs that the user has favorited
});

// Pet Profile Schema
const petProfileSchema = new mongoose.Schema({
	shelter_id: { type: String, required: true }, // Reference to the shelter that owns this pet
	name: String,
	species: { type: String, enum: ['dog', 'cat', 'bird', 'rabbit'] }, // the species we allow as of now
	sex: { type: String, enum: ['male', 'female'] }, // the pet's sex
	birthday: Date, // pet's date of birth
	age: Number, // age in years (calculated from birthday)
	shelter: String, // shelter name
	size: { type: String, enum: ['small', 'medium', 'large'] },
	weight: Number,
	disabilities: String, // anything a new owner should know about the pet
	personality: String, // generic quirks in personality shared by many pets (descriptive terms)
	about1: String, // for the about page
	about2: String,
	favorites: [String], // user _ids
	pics: [String], // image URLs
	bio: String, // additional information about the pet 
	spayed_neutered: Boolean, // true if the pet is spayed/neutered
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
