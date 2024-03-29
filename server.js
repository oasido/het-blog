const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const passport = require('passport');
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
    cb(console.error('Unsupported file type'), false);
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
app.use(express.static('build'));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/reactblog').catch((err) => console.log(err.reason));

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

app.get('/api/user-posts/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const posts = await Blog.find({ author: id });
    res.send(posts);
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
      email: user.email,
      admin: user.admin,
      profilePicture: user.profilePicture,
      memberSince: user.memberSince,
      github,
      twitter,
      bio: user.bio,
      location: user.location,
    };
    res.send(userInfo);
  } catch (error) {
    res.send({ userID: 'UserNotFound' });
  }
});

app.post('/register', (req, res) => {
  const { username, password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    res.send({ error: { name: 'PassNoMatch', message: 'Passwords do not match' } });
  } else if (password === confirmPassword) {
    const date = new Date().toLocaleDateString('en-US');
    User.register(new User({ username, email: '', memberSince: date, location: null, social: { github: null, twitter: null } }), password, (err) => {
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

app.post('/settings/avatar-upload', upload.single('avatar'), async (req, res) => {
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

app.post('/settings/save', async (req, res) => {
  try {
    const { email, bio, github, twitter, location, userID } = req.body;
    const update = {
      email,
      bio,
      location,
      social: {
        twitter,
        github,
      },
    };
    const profileSave = await User.findByIdAndUpdate(userID, update, { strict: false });
    res.send({ msg: '200' });
  } catch (error) {
    console.error(error);
  }
});

app.post('/settings/change-password', async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmNewPassword, userID } = req.body;
    const user = await User.findById(userID);

    switch (true) {
      case newPassword !== confirmNewPassword:
        res.send({ msg: 'Passwords do not match', color: 'red' });
        break;
      case !oldPassword || !newPassword || !confirmNewPassword:
        res.send({ msg: `Forgot to fill out something?`, color: 'red' });
        break;
      case oldPassword === newPassword:
        res.send({ msg: `New password can't be the same`, color: 'red' });
        break;
      case newPassword === confirmNewPassword:
        const passwordChange = await user.changePassword(oldPassword, newPassword);
        res.send({ msg: 'Passwords changed successfully', color: 'green' });
        break;
      default:
        break;
    }
  } catch (error) {
    res.send({ msg: error.message, color: 'red' });
  }
});

app.post('/login', passport.authenticate('local'), (req, res) => {
  const username = req.user.username;
  res.send({ username });
});

app.post('/logout', (req, res) => {
  try {
    req.logout();
    res.send('Logged out');
  } catch (error) {
    console.error(error);
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
