const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Post = require('../models/Post');

module.exports = Router()
  // add post route
  .post('/', authenticate, async (req, res, next) => {
    try {
      const newPost = await Post.insert(req.body);
      res.send(newPost);
    } catch (error) {
      next(error);
    }
  });

// add getAll route
