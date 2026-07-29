import express from 'express';
import jwt from 'jsonwebtoken';
import { hashPassword, comparePassword } from '../utils/password.js';

const router = express.Router();

const users = [];

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email and password are required' });
  }

  const existing = users.find((user) => user.email === email);
  if (existing) {
    return res.status(409).json({ message: 'User already exists' });
  }

  const passwordHash = await hashPassword(password);
  const user = {
    id: `${Date.now()}`,
    name,
    email,
    passwordHash,
    avatarUrl: '',
    status: 'online',
    createdAt: new Date().toISOString()
  };

  users.push(user);

  const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, process.env.JWT_SECRET || 'dev-secret', { expiresIn: '7d' });

  res.status(201).json({ token, user: { id: user.id, name: user.name, email: user.email, status: user.status } });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const user = users.find((entry) => entry.email === email);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const valid = await comparePassword(password, user.passwordHash);
  if (!valid) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, process.env.JWT_SECRET || 'dev-secret', { expiresIn: '7d' });

  res.json({ token, user: { id: user.id, name: user.name, email: user.email, status: user.status } });
});

router.get('/me', (req, res) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret');
    const user = users.find((entry) => entry.id === decoded.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ user: { id: user.id, name: user.name, email: user.email, status: user.status } });
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
});

export default router;
