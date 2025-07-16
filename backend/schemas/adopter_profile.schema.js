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
  birthday: { type: Date }
});

const adopterprofile = mongoose.model("adopter_profile", adopterProfileSchema);

export default adopterprofile;
