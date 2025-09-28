require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Post = require('./models/Post');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected for seeding');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

const seedAdminUser = async () => {
  try {
    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminUsername || !adminPassword) {
      console.error('ADMIN_USERNAME and ADMIN_PASSWORD must be set in .env file');
      return;
    }

    const existingUser = await User.findOne({ username: adminUsername });
    if (existingUser) {
      console.log('Admin user already exists.');
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminPassword, salt);

    const adminUser = new User({
      username: adminUsername,
      password: hashedPassword,
    });

    await adminUser.save();
    console.log('Admin user created successfully.');
  } catch (error) {
    console.error('Error seeding admin user:', error.message);
  }
};

const seedPosts = async () => {
  try {
    await Post.deleteMany({});
    console.log('Posts cleared');

    const posts = [
      {
        title: 'First Post',
        slug: 'first-post',
        content: 'This is the content of the first post.',
        images: [],
        videos: [],
        tags: ['Tech'],
        category: 'Tech',
      },
      {
        title: 'Second Post',
        slug: 'second-post',
        content: 'This is the content of the second post.',
        images: [],
        videos: [],
        tags: ['Health'],
        category: 'Health',
      },
    ];

    await Post.insertMany(posts);
    console.log('Posts seeded successfully.');
  } catch (error) {
    console.error('Error seeding posts:', error.message);
  }
};

const seedAll = async () => {
  await connectDB();
  await seedAdminUser();
  await seedPosts();
  await mongoose.disconnect();
  console.log('MongoDB disconnected');
};

seedAll();