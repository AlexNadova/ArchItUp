const mongoose = require("mongoose");
const config = require("../config");

const { Schema } = mongoose;

const userModel = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dateOfBirth: { type: Date },
  country: { type: String },
  city: { type: String },
  permissionLevel: { type: Number, default: config.permissionLevels.RAID_USER },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  fieldOfFocus: { type: Array },
  education: { type: Array },
  workExperience: { type: Array },
  description: { type: String }
});

module.exports = mongoose.model("User", userModel);
