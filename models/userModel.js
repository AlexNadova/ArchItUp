const mongoose = require("mongoose");

const { Schema } = mongoose;

const userModel = new Schema({
  //_id: mongoose.Schema.Types.ObjectId,
  firstName: { type: String },
  lastName: { type: String },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  phone: { type: String },
  password: { type: String, required: true }
});

module.exports = mongoose.model("User", userModel);
