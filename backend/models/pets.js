const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: "String",
  type: "String",
  breed: "String",
  age: Number,
  availability: "String",
  disposition: "String",
  picture: "String",
});

module.exports = mongoose.model('Pet', petSchema);
