const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  author: { type: String, required: true },
  email: { type: String, required: true },
  date: { type: String, required: true },
});

module.exports = mongoose.model('Blog', blogSchema);
