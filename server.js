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
app.use(passport.initialize());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  session({
    secret: 'secretcode',
    resave: true,
    saveUninitialized: true,
  })
);

mongoose.connect('mongodb://localhost/reactblog').catch((err) => console.log(err.reason));

// Passport-local-mongoose
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get('/api/session', async (req, res) => {
  if (await req.isAuthenticated()) {
    res.send({ username: req.user.username, email: req.user.email, isAuthenticated: req.isAuthenticated() });
  } else {
    res.send({ isAuthenticated: false });
  }
});

app.post('/register', (req, res) => {
  const { username, email, password, confirmPassword } = req.body;
  User.register(new User({ username, email }), password, (err) => console.log(err));
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
