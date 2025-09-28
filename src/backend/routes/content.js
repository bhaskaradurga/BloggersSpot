const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// @route   GET /api/content
// @desc    Get all posts with filtering, search, and pagination
// @access  Public
router.get('/', async (req, res) => {
  const { search, tags, page = 1, limit = 10 } = req.query;
  const query = {};

  if (search) {
    query.title = { $regex: search, $options: 'i' };
  }

  if (tags) {
    query.tags = { $in: tags.split(',') };
  }

  try {
    const posts = await Post.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Post.countDocuments(query);

    res.json({
      posts,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET /api/content/related
// @desc    Get related content with shuffling
// @access  Public
router.get('/related', async (req, res) => {
    const { tags, limit = 5, currentPostId } = req.query;
    const query = {};

    if (tags) {
        query.tags = { $in: tags.split(',') };
    }

    // Exclude the current post from related posts
    if (currentPostId) {
        query._id = { $ne: currentPostId };
    }

    try {
        let posts = await Post.find(query).limit(parseInt(limit));

        // Shuffle the posts
        posts = posts.sort(() => Math.random() - 0.5);

        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/content/tags
// @desc    Get all unique tags
// @access  Public
router.get('/tags', async (req, res) => {
  try {
    const tags = await Post.distinct('tags');
    res.json(tags);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/content/:slug
// @desc    Get a single post by slug
// @access  Public
router.get('/:slug', async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;