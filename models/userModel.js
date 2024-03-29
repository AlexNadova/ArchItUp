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
  permissionLevel: { type: Number, default: config.permissionLevels.DEFAULT_USER },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  password: { type: String, required: true, minlength: 8 }, // match: /(?=.*[a-zA-Z])(?=.*[0-9]+).*/
  phone: { type: String, required: true },
  fieldOfFocus: { type: Array },
  education: [
    {
      school: { type: String },
      specialization: { type: String },
      yearStart: { type: Number },
      yearEnd: { type: Number }
    }
  ],
  workExperience: [
    {
      company: { type: String },
      position: { type: String },
      yearStart: { type: Number },
      yearEnd: { type: Number }
    }
  ],
  userImage: { type: String },
  description: { type: String }
});

module.exports = mongoose.model("User", userModel);
