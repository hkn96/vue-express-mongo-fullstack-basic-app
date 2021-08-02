const express = require('express');
const bodyPar = require('body-parser');
const cors = require('cors');

const app = express();

// middleware

app.use(bodyPar.json());
app.use(cors());

//router

const posts = require('./routes/api/posts');
app.use('/api/posts', posts);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
