const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/User');
const Post = require('../models/Post');
const adminRouter = require('../routes/admin');
const authMiddleware = require('../middleware/auth');

// Mock the auth middleware to bypass JWT verification in tests
jest.mock('../middleware/auth', () =>
  jest.fn((req, res, next) => {
    // If a test needs to simulate an unauthenticated user, it can set this header.
    if (req.headers['x-test-unauthenticated']) {
      return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    req.user = { id: 'test-user-id' };
    next();
  })
);

const app = express();
app.use(express.json());
app.use('/api/admin', adminRouter);

describe('Admin API', () => {
  let token;
  let testUser;

  beforeAll(async () => {
    // We don't need a real user or token because we're mocking the middleware,
    // but this structure is useful if you were to implement full E2E tests.
  });

  beforeEach(async () => {
    await Post.deleteMany({});
    await User.deleteMany({});
    authMiddleware.mockClear();
  });

  // Note: We are not testing login/register directly here because they depend on bcrypt and jwt,
  // and we are mocking the auth middleware. Testing them would require a different setup.
  // The focus here is on the protected content routes.

  it('should create a post when authenticated', async () => {
    const res = await request(app)
      .post('/api/admin/content')
      .send({
        title: 'New Post',
        slug: 'new-post',
        content: 'This is a new post.',
        tags: ['testing'],
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.title).toBe('New Post');
    expect(authMiddleware).toHaveBeenCalled();
  });

  it('should not create a post when not authenticated', async () => {
    const res = await request(app)
      .post('/api/admin/content')
      .set('x-test-unauthenticated', 'true') // Custom header to trigger unauth mock
      .send({
        title: 'New Post',
        slug: 'new-post',
        content: 'This is a new post.',
      });

    expect(res.statusCode).toEqual(401);
  });

  it('should get all posts when authenticated', async () => {
    await Post.create({ title: 'Test Post', slug: 'test-post', content: '...' });

    const res = await request(app).get('/api/admin/content');

    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBe(1);
    expect(authMiddleware).toHaveBeenCalled();
  });

  it('should update a post when authenticated', async () => {
    const post = await Post.create({ title: 'Old Title', slug: 'old-slug', content: '...' });

    const res = await request(app)
      .put(`/api/admin/content/${post._id}`)
      .send({ title: 'New Title' });

    expect(res.statusCode).toEqual(200);
    expect(res.body.title).toBe('New Title');
    expect(authMiddleware).toHaveBeenCalled();
  });

  it('should delete a post when authenticated', async () => {
    const post = await Post.create({ title: 'To Be Deleted', slug: 'to-be-deleted', content: '...' });

    const res = await request(app).delete(`/api/admin/content/${post._id}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.msg).toBe('Post removed');
    expect(authMiddleware).toHaveBeenCalled();
  });
});