import express from 'express';
import User from '../models/User.js';
import FriendRequest from '../models/FriendRequest.js';
import Chat from '../models/Chat.js';

const router = express.Router();

router.get('/search', async (req, res) => {
  const query = (req.query.q || '').trim();
  if (!query) {
    return res.json({ users: [] });
  }

  const users = await User.find({
    _id: { $ne: req.user.id },
    $or: [
      { name: { $regex: query, $options: 'i' } },
      { email: { $regex: query, $options: 'i' } }
    ]
  }).limit(20);

  res.json({ users: users.map((user) => ({ id: user._id.toString(), name: user.name, email: user.email, status: user.status })) });
});

router.post('/friend-requests', async (req, res) => {
  const recipientId = req.body.userId;
  if (!recipientId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  if (recipientId === req.user.id) {
    return res.status(400).json({ message: 'You cannot send a request to yourself' });
  }

  const existing = await FriendRequest.findOne({
    senderId: req.user.id,
    recipientId
  });

  if (existing) {
    return res.status(409).json({ message: 'Friend request already sent' });
  }

  const request = await FriendRequest.create({
    senderId: req.user.id,
    recipientId
  });

  res.status(201).json({ request });
});

router.post('/friend-requests/:requestId/respond', async (req, res) => {
  const { status } = req.body;
  if (!['accepted', 'rejected'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }

  const request = await FriendRequest.findById(req.params.requestId);
  if (!request || request.recipientId.toString() !== req.user.id) {
    return res.status(404).json({ message: 'Request not found' });
  }

  if (request.status !== 'pending') {
    return res.status(409).json({ message: 'Request already handled' });
  }

  request.status = status;
  await request.save();

  if (status === 'accepted') {
    const existingChat = await Chat.findOne({
      participants: { $all: [req.user.id, request.senderId] },
      $expr: { $eq: [{ $size: '$participants' }, 2] }
    });

    if (!existingChat) {
      await Chat.create({
        participants: [req.user.id, request.senderId],
        name: 'New Chat'
      });
    }
  }

  res.json({ request });
});

router.get('/friend-requests', async (req, res) => {
  const requests = await FriendRequest.find({ recipientId: req.user.id, status: 'pending' }).populate('senderId', 'name email status');
  res.json({ requests });
});

router.post('/chats', async (req, res) => {
  const { userId, name } = req.body;
  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  const existingChat = await Chat.findOne({
    participants: { $all: [req.user.id, userId] },
    $expr: { $eq: [{ $size: '$participants' }, 2] }
  });

  if (existingChat) {
    return res.json({ chat: existingChat });
  }

  const chat = await Chat.create({
    participants: [req.user.id, userId],
    name: name || 'New Chat'
  });

  res.status(201).json({ chat });
});

export default router;
