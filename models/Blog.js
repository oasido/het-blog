const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  body: { type: String, required: true },
  author: { type: String, required: true },
  authorID: { type: String, required: true },
  email: { type: String, required: true },
  date: { type: String, required: true },
  pinned: { type: Boolean, required: true, default: false },
});

module.exports = mongoose.model('Blog', blogSchema);
