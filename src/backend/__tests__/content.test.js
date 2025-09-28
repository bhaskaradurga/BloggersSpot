const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const Post = require('../models/Post');
const contentRouter = require('../routes/content');

const app = express();
app.use(express.json());
app.use('/api/content', contentRouter);

describe('Content API', () => {
  beforeEach(async () => {
    await Post.deleteMany({});
  });

  it('should get all posts', async () => {
    await Post.create([
      { title: 'Post 1', slug: 'post-1', content: 'Content 1', tags: ['tech'] },
      { title: 'Post 2', slug: 'post-2', content: 'Content 2', tags: ['news'] },
    ]);

    const res = await request(app).get('/api/content');
    expect(res.statusCode).toEqual(200);
    expect(res.body.posts.length).toBe(2);
  });

  it('should get a single post by slug', async () => {
    const post = await Post.create({ title: 'Post 1', slug: 'post-1', content: 'Content 1' });

    const res = await request(app).get(`/api/content/${post.slug}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.title).toBe('Post 1');
  });

  it('should return 404 if post not found', async () => {
    const res = await request(app).get('/api/content/non-existent-slug');
    expect(res.statusCode).toEqual(404);
  });

  it('should get all unique tags', async () => {
    await Post.create([
        { title: 'Post 1', slug: 'post-1', content: 'Content 1', tags: ['tech', 'featured'] },
        { title: 'Post 2', slug: 'post-2', content: 'Content 2', tags: ['news', 'featured'] },
        { title: 'Post 3', slug: 'post-3', content: 'Content 3', tags: ['tech'] },
    ]);

    const res = await request(app).get('/api/content/tags');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(expect.arrayContaining(['tech', 'featured', 'news']));
    expect(res.body.length).toBe(3);
  });
});