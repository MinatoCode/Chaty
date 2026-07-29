import express from 'express';
const router = express.Router();

const users = [
  { id: 'demo-user', name: 'Alex', email: 'alex@example.com', status: 'online' },
  { id: 'demo-user-2', name: 'Sarah', email: 'sarah@example.com', status: 'offline' }
];

router.get('/search', (req, res) => {
  const query = (req.query.q || '').toLowerCase();
  const filtered = users.filter((user) => user.name.toLowerCase().includes(query) || user.email.toLowerCase().includes(query));
  res.json({ users: filtered });
});

export default router;
