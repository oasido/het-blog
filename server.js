const express = require('express');
const mongoose = require('mongoose');
var passport = require('passport');
const Blog = require('./models/Blog.js');
const User = require('./models/User.js');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3080;

app.use(cookieParser());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

mongoose.connect('mongodb://localhost/reactblog').catch((err) => console.log(err.reason));

app.get('/ping', async (req, res) => {
  try {
    res.send('Pong!');
    const blog = await Blog.create({ title: 'yo', author: 'this is a body', body: 'i did it' });
    console.log('aye');
  } catch (error) {
    console.log(error);
  }
});

// Passport-local-mongoose
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.post('/register', (req, res) => {
  const { username, email, password, confirmPassword } = req.body;
  User.register(new User({ username, email }), password, (err) => console.log(err));
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
