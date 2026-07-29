const API_BASE_URL = '/api';

async function request(path, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  const token = localStorage.getItem('chaty-token');
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || 'Request failed');
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

export async function getChats() {
  return request('/chats');
}

export async function getChatMessages(chatId) {
  return request(`/chats/${chatId}/messages`);
}

export async function sendChatMessage(chatId, text) {
  return request(`/chats/${chatId}/messages`, { method: 'POST', body: JSON.stringify({ text }) });
}
