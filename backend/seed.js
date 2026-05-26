import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('✓ Connected to MongoDB');

  const existing = await User.findOne({ username: 'admin' });
  if (existing) {
    console.log('✓ Admin user already exists — nothing to do.');
  } else {
    const user = new User({ username: 'admin', password: 'survey2026' });
    await user.save();
    console.log('✓ Admin user created (username: admin, password: survey2026)');
  }

  const testUserExists = await User.findOne({ username: 'testuser' });
  if (testUserExists) {
    console.log('✓ Test user already exists — nothing to do.');
  } else {
    const testUser = new User({ username: 'testuser', password: 'test123' });
    await testUser.save();
    console.log('✓ Test user created (username: testuser, password: test123)');
  }

  await mongoose.disconnect();
  console.log('✓ Done.');
}

seed().catch(err => { console.error(err); process.exit(1); });
