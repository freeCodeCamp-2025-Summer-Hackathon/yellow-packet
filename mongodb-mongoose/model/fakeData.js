import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const fakeDataSchema = new Schema({
id: String,
dataType: String,
petName: String,
userName: String,
animalType: String,
animalBreed: String,
postalZip: String,
shelterName: String,
email: String,
phoneNumber: String,
shelterType: String,
});