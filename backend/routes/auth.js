import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { localDb } from '../localDb.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }

    const isConnected = req.app.locals.mongoConnected();
    if (!isConnected) {
      const existingUser = await localDb.findUser(username);
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists (offline mode)' });
      }
      await localDb.createUser(username, password);
      return res.json({ message: 'User created successfully (offline mode)' });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const user = new User({ username, password });
    await user.save();
    res.json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }

    const isConnected = req.app.locals.mongoConnected();
    if (!isConnected) {
      const user = await localDb.findUser(username);
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials (offline mode)' });
      }

      const isValid = await user.comparePassword(password);
      if (!isValid) {
        return res.status(401).json({ error: 'Invalid credentials (offline mode)' });
      }

      const token = jwt.sign({ userId: user._id, username }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
      return res.json({ token, username });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValid = await user.comparePassword(password);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id, username }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
    res.json({ token, username });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: error.message || 'Login failed' });
  }
});

export default router;

