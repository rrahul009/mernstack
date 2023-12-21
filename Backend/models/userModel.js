// models/userModel.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Assuming email should be unique
  },
  mobileNo: {
    type: String,
    required: true,
  },
  project: {
    type: String,
    required: true,
  },
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
