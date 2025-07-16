import mongoose from "mongoose";

const shelterSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  shelter_name: { type: String },
  phone_number: { type: String },
  email: { type: String },
  zip_code: { type: String },
  bio: { type: String },
  city: { type: String },
  state: { type: String },
  address_line_1: { type: String },
  address_line_2: { type: String },
  years_active: { type: Number },
});

const Shelter = mongoose.model("shelter_profile", shelterSchema);

export default Shelter;
