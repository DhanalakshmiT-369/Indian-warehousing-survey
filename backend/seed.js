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

  await mongoose.disconnect();
  console.log('✓ Done.');
}

seed().catch(err => { console.error(err); process.exit(1); });
