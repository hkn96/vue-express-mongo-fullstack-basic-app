const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//mongodb

async function loadPostsCollection() {
  const client = await mongodb.MongoClient.connect(
    'mongodb+srv://HKN:Karaman70.@cluster1.rzzo2.mongodb.net/test',
    { useNewUrlParser: true }
  );

  return client.db('vue_express').collection('posts');
}

//!Get Posts
router.get('/', async (req, res) => {
  const posts = await loadPostsCollection();
  res.send(await posts.find({}).toArray());
});
//! Add Posts

router.post('/', async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.insertOne({
    text: req.body.text,
    createdAt: new Date(),
  });
  res.status(201).send();
});

//!Delete Post

router.delete('/:id', async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
  res.status(200).send();
});

module.exports = router;
