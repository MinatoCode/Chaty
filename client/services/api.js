import { API_BASE_URL } from '../config/appConfig.js';

async function request(path, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  const token = localStorage.getItem('chaty-token');
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers
    });
  } catch (networkError) {
    throw new Error(`Network error: ${networkError.message}`);
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errorMessage = data.message || data.error || response.statusText || 'Request failed';
    throw new Error(`${errorMessage} (${response.status})`);
  }

  return data;
}

export async function registerUser(payload) {
  return request('/auth/register', { method: 'POST', body: JSON.stringify(payload) });
}

export async function loginUser(payload) {
  return request('/auth/login', { method: 'POST', body: JSON.stringify(payload) });
}

export async function getCurrentUser() {
  return request('/auth/me');
}

export async function searchUsers(query) {
  return request(`/users/search?q=${encodeURIComponent(query)}`);
}

export async function sendFriendRequest(userId) {
  return request('/users/friend-requests', { method: 'POST', body: JSON.stringify({ userId }) });
}

export async function respondFriendRequest(requestId, status) {
  return request(`/users/friend-requests/${encodeURIComponent(requestId)}/respond`, {
    method: 'POST',
    body: JSON.stringify({ status })
  });
}

export async function getFriendRequests() {
  return request('/users/friend-requests');
}

export async function createChat(userId, name) {
  return request('/users/chats', { method: 'POST', body: JSON.stringify({ userId, name }) });
}

export async function getChats() {
  return request('/chats');
}

export async function getChatMessages(chatId, options = {}) {
  return request(`/chats/${chatId}/messages`, { method: 'GET', ...options });
}

export async function sendChatMessage(chatId, text) {
  return request(`/chats/${chatId}/messages`, { method: 'POST', body: JSON.stringify({ text }) });
}
