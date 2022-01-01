const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  body: { type: String, required: true },
  author: { type: String, required: true },
  authorID: { type: String, required: true },
  email: { type: String, required: false },
  date: { type: String, required: true },
  pinned: { type: Boolean, required: true, default: false },
  likes: { type: Number, required: true, default: 0 },
});

module.exports = mongoose.model('Blog', blogSchema);
