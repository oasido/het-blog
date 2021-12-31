const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const User = new Schema({
  username: { type: String, required: true },
  bio: { type: String, required: false },
  profilePicture: { type: String, required: true, default: 'profile-pictures/default.png' },
  email: { type: String, required: true },
  social: {
    github: String,
    twitter: String,
  },
  memberSince: { type: String, required: true },
  location: { type: String, required: false },
  likes: [{ blogID: String }],
  admin: { type: Boolean, required: true, default: false },
});

const options = {
  errorMessages: {
    IncorrectPasswordError: `Something's incorrect!`,
  },
};

User.plugin(passportLocalMongoose, options);

module.exports = mongoose.model('User', User);
