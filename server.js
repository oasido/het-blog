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
    const { username, id, email, profilePicture } = req.user;
    res.send({ username, userID: id, email, profilePicture, isAuthenticated: req.isAuthenticated() });
  } else {
    res.send({ isAuthenticated: false });
  }
});

// .sort({ date: 'descending' })
app.get('/api/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find({});
    res.send(blogs);
  } catch (error) {
    console.log(error);
  }
});

app.get('/api/blogs/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const blog = await Blog.findById(id);
    res.send(blog);
  } catch (error) {
    console.log(error);
  }
});

app.get('/api/user/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const [user] = await User.find({ username: id });
    const userID = { userID: user.id };
    res.send(userID);
  } catch (error) {
    res.send({ userID: 'UserNotFound' });
  }
});

app.post('/register', (req, res) => {
  const { username, email, password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    res.send({ error: { name: 'PassNoMatch', message: 'Passwords do not match' } });
  } else if (password === confirmPassword) {
    User.register(new User({ username, email }), password, (err) => {
      res.send({ error: err });
    });
  }
});

app.post('/create', async (req, res) => {
  try {
    if (await req.isAuthenticated()) {
      const { title, description, body, author, authorID, email } = req.body;
      const formattedDate = new Date().toLocaleTimeString([], { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' });
      await Blog.create({ title, description, body, author, authorID, email, date: formattedDate });
      res.json({ posted: true });
    }
  } catch (error) {
    console.log(error);
  }
});

app.post('/delete', async (req, res) => {
  try {
    if (await req.isAuthenticated()) {
      const { id, username } = req.body;
      console.log(username);
      await Blog.findByIdAndDelete(id);
      res.json({ deleted: true });
    }
  } catch (error) {
    console.log(error);
  }
});

app.post('/profile-picture', async (req, res) => {
  const userID = req.body.authorID;
  const { profilePicture } = await User.findById(userID);
  res.send({ profilePicture });
});

app.post('/login', passport.authenticate('local'), (req, res) => {
  const username = req.user.username;
  res.send({ username });
});

app.post('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
