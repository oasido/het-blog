const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const User = new Schema({
  username: { type: String, required: true },
  profilePicture: { type: String, required: false, default: 'https://i.imgur.com/C4RaIiA.png' },
  email: { type: String, required: true },
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
