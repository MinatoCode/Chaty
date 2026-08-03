import { EventTarget } from '../js/utils/eventTargetShim.js';
import { getChats, getChatMessages, sendChatMessage, createChat } from '../services/api.js';
import { connectSocket, joinChat, onSocket, offSocket } from '../services/socket.js';
import { authStore } from './authStore.js';

const emitter = new EventTarget();

const state = {
  chats: [],
  messages: {}, // chatId -> array
  activeChat: null,
  loading: false,
  loadingMessages: false,
  error: null
};

let currentMessagesController = null;
let socketInitialized = false;

export function subscribe(cb) {
  emitter.addEventListener('change', cb);
}

export function unsubscribe(cb) {
  emitter.removeEventListener('change', cb);
}

function emitChange() {
  emitter.dispatchEvent(new CustomEvent('change', { detail: { ...state } }));
}

export async function initialize() {
  if (socketInitialized) return;

  // ensure auth is ready
  await authStore.initialize();
  connectSocket(authStore.user?.id);

  onSocket('message.new', (message) => {
    const chatId = message.chatId || (message.chatId === undefined ? null : message.chatId);
    if (!chatId) return;
    state.messages[chatId] = state.messages[chatId] || [];
    if (!state.messages[chatId].some(m => m._id === message._id)) {
      state.messages[chatId].push(message);
      if (state.activeChat?._id?.toString?.() === chatId?.toString?.()) {
        state.activeChat = state.chats.find((c) => c._id === chatId) || state.activeChat;
      }
      emitChange();
    }
  });

  onSocket('chat.message', ({ chatId, message }) => {
    state.messages[chatId] = state.messages[chatId] || [];
    if (!state.messages[chatId].some(m => m._id === message._id)) {
      state.messages[chatId].push(message);
      if (state.activeChat?._id?.toString?.() === chatId?.toString?.()) {
        state.activeChat = state.chats.find((c) => c._id === chatId) || state.activeChat;
      }
      emitChange();
    }
  });

  socketInitialized = true;
  await loadChats();
}

export async function loadChats() {
  state.loading = true;
  emitChange();
  try {
    const { chats = [] } = await getChats();
    state.chats = chats;
  } catch (err) {
    state.error = err.message;
  } finally {
    state.loading = false;
    emitChange();
  }
}

export async function loadMessages(chatId) {
  // cancel previous
  if (currentMessagesController) {
    currentMessagesController.abort();
  }
  currentMessagesController = new AbortController();
  const signal = currentMessagesController.signal;

  state.loadingMessages = true;
  emitChange();

  try {
    const { messages = [] } = await getChatMessages(chatId, { signal });
    state.messages[chatId] = messages;
    state.activeChat = state.chats.find(c => c._id === chatId) || null;
    // join socket room
    joinChat(chatId);
    emitChange();
  } catch (err) {
    if (err.name === 'AbortError') return;
    state.error = err.message;
    emitChange();
  } finally {
    state.loadingMessages = false;
    emitChange();
  }
}

export async function sendMessage(chatId, text) {
  // optimistic message
  const tempId = `tmp_${Date.now()}`;
  const now = new Date().toISOString();
  const optimistic = { _id: tempId, chatId, senderId: authStore.user.id, text, createdAt: now, optimistic: true };
  state.messages[chatId] = state.messages[chatId] || [];
  state.messages[chatId].push(optimistic);
  emitChange();

  try {
    const { message } = await sendChatMessage(chatId, text);
    // replace optimistic
    const list = state.messages[chatId];
    const idx = list.findIndex(m => m._id === tempId);
    if (idx !== -1) {
      list[idx] = message;
    } else {
      list.push(message);
    }
    emitChange();
    return message;
  } catch (err) {
    // mark failed
    const list = state.messages[chatId];
    const idx = list.findIndex(m => m._id === tempId);
    if (idx !== -1) list[idx].failed = true;
    state.error = err.message;
    emitChange();
    throw err;
  }
}

export async function startChatWith(userId) {
  const { chat } = await createChat(userId);
  await loadChats();
  return chat;
}

export default {
  initialize,
  loadChats,
  loadMessages,
  sendMessage,
  startChatWith,
  subscribe,
  unsubscribe,
  getState: () => state
};
