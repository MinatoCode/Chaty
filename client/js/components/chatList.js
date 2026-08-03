import { createChat, getFriendRequests, respondFriendRequest, searchUsers, sendFriendRequest } from '../../services/api.js';
import chatStore from '../../store/chatStore.js';

export default function chatList({ onSelectChat } = {}) {
  const element = document.createElement('div');
  element.className = 'chat-list-container';

  element.innerHTML = `
    <div class="view-switch">
      <button class="view-btn active" data-view="chats">Chats</button>
      <button class="view-btn" data-view="friends">Friends</button>
    </div>
    <div class="view-panel chats-panel">
      <div class="chat-items"></div>
    </div>
    <div class="view-panel friends-panel" hidden>
      <input class="chat-search" placeholder="Search people by name or email..." />
      <div class="search-results"></div>
      <div class="friend-requests"></div>
    </div>
  `;

  const searchInput = element.querySelector('.chat-search');
  const resultsContainer = element.querySelector('.search-results');
  const requestsContainer = element.querySelector('.friend-requests');
  const chatsContainer = element.querySelector('.chat-items');
  const viewButtons = element.querySelectorAll('.view-btn');
  const chatsPanel = element.querySelector('.chats-panel');
  const friendsPanel = element.querySelector('.friends-panel');
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
          <button class="chat-btn">Send Message</button>
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

  function handleStoreUpdate(e) {
    const s = e.detail;
    renderChats(s.chats || []);
  }

  async function loadChats() {
    await chatStore.loadChats();
    // subscribe to updates
    chatStore.subscribe(handleStoreUpdate);
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
        item.innerHTML = `
          <div class="request-info">
            <strong>${request.senderId?.name || 'Someone'}</strong>
            <span>${request.senderId?.email || ''}</span>
          </div>
          <div class="request-actions">
            <button class="accept-btn">Accept</button>
            <button class="reject-btn">Reject</button>
          </div>
        `;

        item.querySelector('.accept-btn').addEventListener('click', async () => {
          try {
            await respondFriendRequest(request._id, 'accepted');
            await loadFriendRequests();
            await loadChats();
          } catch (error) {
            item.querySelector('.accept-btn').textContent = 'Error';
          }
        });

        item.querySelector('.reject-btn').addEventListener('click', async () => {
          try {
            await respondFriendRequest(request._id, 'rejected');
            await loadFriendRequests();
          } catch (error) {
            item.querySelector('.reject-btn').textContent = 'Error';
          }
        });

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

  viewButtons.forEach((button) => {
    button.addEventListener('click', () => {
      viewButtons.forEach((item) => item.classList.toggle('active', item === button));
      const isFriends = button.dataset.view === 'friends';
      chatsPanel.hidden = isFriends;
      friendsPanel.hidden = !isFriends;
    });
  });

  searchInput?.addEventListener('input', () => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(searchPeople, 250);
  });

  loadChats();
  loadFriendRequests();

  return element;
}
