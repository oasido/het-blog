const express = require('express');
const mongoose = require('mongoose');
var passport = require('passport');
const Blog = require('./models/Blog.js');
const User = require('./models/User.js');
const app = express();
const port = 3080;

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

app.post('/register', async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      res.send('NO_MATCH'); // TODO: Figure out how to send messages to the Front End, without refreshing the page
    }
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
