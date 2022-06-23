const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postShema = new Schema({
  content: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    unique: true,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Post", postShema);
