const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const User = new Schema({
  username: { type: String, required: true },
  about: { type: String, required: false },
  profilePicture: { type: String, required: false, default: 'https://i.imgur.com/C4RaIiA.png' },
  email: { type: String, required: true },
  memberSince: { type: Date, required: true, default: Date.now },
  admin: { type: Boolean, required: true, default: false },
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
