const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Post = require('../models/Post');
const auth = require('../middleware/auth');

// @route   POST /api/admin/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    let user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: 3600,
      },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST /api/admin/content
// @desc    Create a post
// @access  Private
router.post('/content', auth, async (req, res) => {
  const { title, content, images, videos, tags, slug } = req.body;

  try {
    const newPost = new Post({
      title,
      slug,
      content,
      images,
      videos,
      tags,
    });

    const post = await newPost.save();
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET /api/admin/content
// @desc    Get all posts with filtering and sorting
// @access  Private
router.get('/content', auth, async (req, res) => {
  const { search, tags, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
  const query = {};

  if (search) {
    query.title = { $regex: search, $options: 'i' };
  }

  if (tags) {
    query.tags = { $in: tags.split(',') };
  }

  try {
    const sortOptions = {};
    if (sortBy) {
      sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;
    }

    const posts = await Post.find(query).sort(sortOptions);
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET /api/admin/content/:id
// @desc    Get a single post by ID
// @access  Private
router.get('/content/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT /api/admin/content/:id
// @desc    Update a post
// @access  Private
router.put('/content/:id', auth, async (req, res) => {
  const { title, slug, content, images, videos, tags } = req.body;

  const postFields = {};
  if (title) postFields.title = title;
  if (slug) postFields.slug = slug;
  if (content) postFields.content = content;
  if (images) postFields.images = images;
  if (videos) postFields.videos = videos;
  if (tags) postFields.tags = tags;

  try {
    let post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ msg: 'Post not found' });

    post = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: postFields },
      { new: true }
    );

    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE /api/admin/content/:id
// @desc    Delete a post
// @access  Private
router.delete('/content/:id', auth, async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ msg: 'Post not found' });

    await Post.findByIdAndDelete(req.params.id);

    res.json({ msg: 'Post removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;