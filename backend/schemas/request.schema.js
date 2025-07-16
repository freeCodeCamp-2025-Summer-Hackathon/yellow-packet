import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
  user_id: { type: Number, required: true },
  first_name: { type: String },
  last_name: { type: String },
  phone_number: { type: String },
  email: { type: String },
  city: { type: String },
  bio: { type: String }
});

const request = mongoose.model("request", requestSchema);

export default request;
