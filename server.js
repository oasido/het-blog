const express = require('express');
const mongoose = require('mongoose');
var passport = require('passport');
const Blog = require('./models/Blog.js');
const User = require('./models/User.js');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'profile-pictures/');
  },
  filename: function (req, file, cb) {
    try {
      const { id } = req.user;
      console.log(req.user);
      cb(null, id);
    } catch (error) {
      console.error(error);
    }
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(console.log('Unsupported file type'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

const app = express();
const port = 3080;

app.use('/profile-pictures', express.static('profile-pictures'));
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
    console.error(error);
  }
});

app.get('/api/blogs/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const blog = await Blog.findById(id);
    res.send(blog);
  } catch (error) {
    console.error(error);
  }
});

app.get('/api/user/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const [user] = await User.find({ username: id });
    const { github, twitter } = user.social;
    const userInfo = {
      userID: user.id,
      admin: user.admin,
      profilePicture: user.profilePicture,
      memberSince: user.memberSince,
      github,
      twitter,
      about: user.about,
      location: user.location,
    };
    res.send(userInfo);
  } catch (error) {
    res.send({ userID: 'UserNotFound' });
  }
});

app.get('/api/user/profile-picture/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    const profilePicture = user.profilePicture;
    res.send({ profilePicture });
  } catch (error) {
    res.send('UserNotFound');
    console.error(error);
  }
});

app.post('/register', (req, res) => {
  const { username, email, password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    res.send({ error: { name: 'PassNoMatch', message: 'Passwords do not match' } });
  } else if (password === confirmPassword) {
    const date = new Date().toLocaleDateString('en-US');
    User.register(new User({ username, email, memberSince: date, location: null, social: { github: null, twitter: null } }), password, (err) => {
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
    console.error(error);
  }
});

app.post('/delete', async (req, res) => {
  try {
    if (await req.isAuthenticated()) {
      const { id, username } = req.body;
      await Blog.findByIdAndDelete(id);
      res.json({ deleted: true });
    }
  } catch (error) {
    console.error(error);
  }
});

app.post('/profile-picture', async (req, res) => {
  try {
    const { userID } = req.body;
    if (userID) {
      const { profilePicture } = await User.findById(userID);
      res.send({ profilePicture });
    }
  } catch (error) {
    console.log('No profile picture found');
    console.error(error);
  }
});

app.post('/upload', upload.single('avatar'), async (req, res) => {
  try {
    if (req.file) {
      const path = req.file.path.replace(/\\/g, '/');
      const userID = req.user._id;
      await User.findByIdAndUpdate(userID, { profilePicture: path });
      res.send({ msg: 'Image uploaded!' });
    }
  } catch (error) {
    console.error(error);
    res.send({ msg: 'Upload failed!' });
  }
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
