import mongoose from "mongoose";

const petProfileSchema = new mongoose.Schema({
  pet_uid: { type: Number, required: true },
  shelter_id: { type: Number, required: true },
  species: { type: String },
  sex: { type: String },
  years: { type: Number },
  weight: { type: Number },
  date_birth: { type: Date },
  illness_disabilities: { type: String },
  personality: { type: String },
  photo_link: { type: String },
  bio: { type: String },
  spayed_neutered: { type: Boolean }
});

const petProfile = mongoose.model("pet_profile", petProfileSchema);

export default petProfile;
