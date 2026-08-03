import { API_BASE_URL } from '../config/appConfig.js';
import { io } from 'https://cdn.socket.io/4.8.3/socket.io.esm.min.js';

let socket = null;

function getBaseOrigin() {
  try {
    const url = new URL(API_BASE_URL);
    return url.origin;
  } catch (e) {
    return window.location.origin;
  }
}

export function createSocket() {
  if (socket) return socket;
  const origin = getBaseOrigin();
  socket = io(origin, { autoConnect: false, transports: ['websocket', 'polling'] });

  socket.on('connect', () => {
    console.log('Socket connected', socket.id);
  });

  socket.on('disconnect', (reason) => {
    console.log('Socket disconnected', reason);
  });

  return socket;
}

export function connectSocket(userId) {
  const s = createSocket();
  if (!s.connected) s.connect();
  if (userId) s.emit('identify', userId);
  return s;
}

export function joinChat(chatId) {
  const s = createSocket();
  if (chatId) s.emit('join-chat', chatId);
}

export function onSocket(event, cb) {
  const s = createSocket();
  s.on(event, cb);
}

export function offSocket(event, cb) {
  const s = createSocket();
  s.off(event, cb);
}

export function emitSocket(event, payload) {
  const s = createSocket();
  s.emit(event, payload);
}
