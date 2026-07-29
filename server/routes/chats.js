import express from 'express';
import Chat from '../models/Chat.js';
import Message from '../models/Message.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const chats = await Chat.find({ participants: req.user.id }).sort({ updatedAt: -1 });
  res.json({ chats });
});

router.post('/', async (req, res) => {
  const chat = await Chat.create({
    participants: [req.user.id, req.body.userId],
    name: req.body.name || 'New Chat'
  });

  res.status(201).json({ chat });
});

router.get('/:chatId/messages', async (req, res) => {
  const chat = await Chat.findById(req.params.chatId);
  if (!chat) {
    return res.status(404).json({ message: 'Chat not found' });
  }

  const messages = await Message.find({ chatId: chat._id }).sort({ createdAt: 1 });
  res.json({ messages });
});

router.post('/:chatId/messages', async (req, res) => {
  const chat = await Chat.findById(req.params.chatId);
  if (!chat) {
    return res.status(404).json({ message: 'Chat not found' });
  }

  const message = await Message.create({
    chatId: chat._id,
    senderId: req.user.id,
    text: req.body.text
  });

  chat.updatedAt = new Date();
  await chat.save();

  res.status(201).json({ message });
});

export default router;
