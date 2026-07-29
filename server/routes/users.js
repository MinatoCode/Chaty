import express from 'express';
import User from '../models/User.js';

const router = express.Router();

router.get('/search', async (req, res) => {
  const query = (req.query.q || '').toLowerCase();
  const users = await User.find({
    $or: [
      { name: { $regex: query, $options: 'i' } },
      { email: { $regex: query, $options: 'i' } }
    ]
  }).limit(20);

  res.json({ users: users.map((user) => ({ id: user._id.toString(), name: user.name, email: user.email, status: user.status })) });
});

export default router;
