import { createChat, getChats, getFriendRequests, searchUsers, sendFriendRequest } from '../../services/api.js';

export default function chatList({ onSelectChat } = {}) {
  const element = document.createElement('div');
  element.className = 'chat-list-container';

  element.innerHTML = `
    <h3>Chats</h3>
    <input class="chat-search" placeholder="Search people by name or username..." />
    <div class="search-results"></div>
    <div class="friend-requests"></div>
    <div class="chat-items"></div>
  `;

  const searchInput = element.querySelector('.chat-search');
  const resultsContainer = element.querySelector('.search-results');
  const requestsContainer = element.querySelector('.friend-requests');
  const chatsContainer = element.querySelector('.chat-items');
  let searchTimer = null;

  function renderChats(chats) {
    if (!chats.length) {
      chatsContainer.innerHTML = '<p class="empty">No chats yet. Search a person and start one.</p>';
      return;
    }

    chatsContainer.innerHTML = '';
    chats.forEach((chat) => {
      const chatItem = document.createElement('button');
      chatItem.className = 'chat-item';
      chatItem.innerHTML = `
        <div class="chat-avatar online">${(chat.name || 'C').charAt(0).toUpperCase()}</div>
        <div class="chat-info">
          <div class="chat-top">
            <strong>${chat.name || 'New Chat'}</strong>
            <span>Live</span>
          </div>
          <div class="chat-bottom">
            <p>Tap to open this conversation</p>
          </div>
        </div>
      `;

      chatItem.addEventListener('click', () => {
        if (typeof onSelectChat === 'function') {
          onSelectChat(chat);
        }
      });

      chatsContainer.appendChild(chatItem);
    });
  }

  function renderUsers(users) {
    if (!users.length) {
      resultsContainer.innerHTML = '<p class="empty">No users found.</p>';
      return;
    }

    resultsContainer.innerHTML = '';
    users.forEach((user) => {
      const row = document.createElement('div');
      row.className = 'user-card';
      row.innerHTML = `
        <div class="user-info">
          <h4>${user.name}</h4>
          <p>${user.email}</p>
        </div>
        <div class="action-row">
          <button class="friend-btn">Add Friend</button>
          <button class="chat-btn">Send Chat</button>
        </div>
      `;

      row.querySelector('.friend-btn').addEventListener('click', async () => {
        try {
          await sendFriendRequest(user.id);
          row.querySelector('.friend-btn').textContent = 'Request sent';
        } catch (error) {
          row.querySelector('.friend-btn').textContent = error.message;
        }
      });

      row.querySelector('.chat-btn').addEventListener('click', async () => {
        try {
          const { chat } = await createChat(user.id, user.name);
          if (typeof onSelectChat === 'function') {
            onSelectChat(chat);
          }
          await loadChats();
        } catch (error) {
          row.querySelector('.chat-btn').textContent = error.message;
        }
      });

      resultsContainer.appendChild(row);
    });
  }

  async function loadChats() {
    try {
      const { chats = [] } = await getChats();
      renderChats(chats);
    } catch (error) {
      chatsContainer.innerHTML = `<p class="empty">${error.message}</p>`;
    }
  }

  async function loadFriendRequests() {
    try {
      const { requests = [] } = await getFriendRequests();
      if (!requests.length) {
        requestsContainer.innerHTML = '<p class="empty">No pending requests.</p>';
        return;
      }

      requestsContainer.innerHTML = '<h4>Pending requests</h4>';
      requests.forEach((request) => {
        const item = document.createElement('div');
        item.className = 'request-item';
        item.innerHTML = `<strong>${request.senderId?.name || 'Someone'}</strong>`;
        requestsContainer.appendChild(item);
      });
    } catch (error) {
      requestsContainer.innerHTML = `<p class="empty">${error.message}</p>`;
    }
  }

  async function searchPeople() {
    const query = searchInput.value.trim();
    if (!query) {
      resultsContainer.innerHTML = '';
      return;
    }

    try {
      const { users = [] } = await searchUsers(query);
      renderUsers(users);
    } catch (error) {
      resultsContainer.innerHTML = `<p class="empty">${error.message}</p>`;
    }
  }

  searchInput.addEventListener('input', () => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(searchPeople, 250);
  });

  loadChats();
  loadFriendRequests();

  return element;
}
