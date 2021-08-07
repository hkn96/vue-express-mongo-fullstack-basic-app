const express = require('express');
const cors = require('cors');

const app = express();

// middleware

app.use(express.json());
app.use(cors());

//router

const posts = require('./routes/api/posts');
app.use('/api/posts', posts);

//!Handle Production

if (process.env.NODE_ENV === 'production') {
  //Static Folder
  app.use(express.static(__dirname + '/public/'));
  // Handle SPA
  app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
