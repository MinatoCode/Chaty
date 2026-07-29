import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.js';
import chatRoutes from './routes/chats.js';
import userRoutes from './routes/users.js';
import { authMiddleware } from './middleware/auth.js';
import { initializeSocket } from './sockets/index.js';
import { connectDatabase } from './config/database.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req, res) => {
  res.json({ ok: true, message: 'Chaty API is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/chats', authMiddleware, chatRoutes);
app.use('/api/users', authMiddleware, userRoutes);

const clientDir = path.resolve(__dirname, '../client');
app.use(express.static(clientDir));
app.get('*', (req, res) => {
  res.sendFile(path.join(clientDir, 'index.html'));
});

initializeSocket(io);

const PORT = process.env.PORT || 3000;

connectDatabase().then(() => {
  server.listen(PORT, () => {
    console.log(`Chaty server running on http://localhost:${PORT}`);
  });
});
