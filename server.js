const express = require('express');
const mongoose = require('mongoose');
const Blog = require('./models/Blog.js');

const app = express();
const port = 3080;

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

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
