import express from 'express';
const router = express.Router();

const chats = [
  {
    id: 'chat-1',
    participants: ['demo-user', 'current-user'],
    name: 'Alex',
    messages: [
      { id: 'm1', text: 'Hey, what is up?', senderId: 'demo-user', createdAt: new Date().toISOString() },
      { id: 'm2', text: 'Working on the new build.', senderId: 'current-user', createdAt: new Date().toISOString() }
    ]
  }
];

router.get('/', (req, res) => {
  res.json({ chats });
});

router.post('/', (req, res) => {
  const chat = {
    id: `chat-${Date.now()}`,
    participants: [req.user.id, req.body.userId],
    name: req.body.name || 'New Chat',
    messages: []
  };
  chats.push(chat);
  res.status(201).json({ chat });
});

router.get('/:chatId/messages', (req, res) => {
  const chat = chats.find((entry) => entry.id === req.params.chatId);
  if (!chat) {
    return res.status(404).json({ message: 'Chat not found' });
  }
  res.json({ messages: chat.messages });
});

router.post('/:chatId/messages', (req, res) => {
  const chat = chats.find((entry) => entry.id === req.params.chatId);
  if (!chat) {
    return res.status(404).json({ message: 'Chat not found' });
  }

  const message = {
    id: `m-${Date.now()}`,
    text: req.body.text,
    senderId: req.user.id,
    createdAt: new Date().toISOString()
  };

  chat.messages.push(message);
  res.status(201).json({ message });
});

export default router;
