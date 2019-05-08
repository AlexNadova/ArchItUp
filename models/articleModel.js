const mongoose = require("mongoose");

const { Schema } = mongoose;

const articleModel = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: { type: String, required: true },
  author: { type: Array, required: true },
  description: { type: String },
  keywords: { type: Array },
  articleImages: { type: Array },
  titleImage: { type: String },
  category: { type: Boolean },
  content: { type: String }
});

module.exports = mongoose.model("Article", articleModel);