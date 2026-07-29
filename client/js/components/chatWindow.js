import { getChatMessages, sendChatMessage } from '../../services/api.js';
import { authStore } from '../../store/authStore.js';

export default function chatWindow(chat = null, onBack = null) {
    const element = document.createElement('div');
    element.className = 'chat-window';

    element.innerHTML = `
        <div class="chat-header">
            <button class="chat-back-btn">➜</button>
            <div class="chat-user">
                <div class="chat-avatar online">${(chat?.name || 'C').charAt(0).toUpperCase()}</div>
                <div class="chat-info">
                    <h3>${chat?.name || 'Select a chat'}</h3>
                    <span>${chat? 'Online' : 'Choose a conversation'}</span>
                </div>
            </div>
        </div>
        <div class="messages"></div>
        <div class="message-input">
            <input class="message-text" type="text" placeholder="Type a message..." />
            <button class="send-btn">➤</button>
        </div>
    `;

    const input = element.querySelector('.message-text');
    const sendButton = element.querySelector('.send-btn');
    const backButton = element.querySelector('.chat-back-btn');
    const messagesContainer = element.querySelector('.messages');
    let activeChat = chat;
    let messages = [];

    const hasChat = Boolean(activeChat?._id);
    input.disabled = !hasChat;
    sendButton.disabled = !hasChat;
    backButton.style.visibility = hasChat ? 'visible' : 'hidden';

    if (!hasChat) {
        input.placeholder = 'Select a chat to start messaging.';
        messagesContainer.innerHTML = '<div class="chat-placeholder">Search or accept a friend request to start chatting.</div>';
    }

    backButton.addEventListener('click', () => {
        if (typeof onBack === 'function') {
            onBack();
        }
    });

    async function loadMessages() {
        if (!activeChat?._id) {
            messagesContainer.innerHTML = '<p class="empty">Select or start a chat to begin messaging.</p>';
            return;
        }

        try {
            const { messages: fetchedMessages = [] } = await getChatMessages(activeChat._id);
            messages = fetchedMessages;
            renderMessages();
        } catch (error) {
            messagesContainer.innerHTML = `<p class="empty">${error.message}</p>`;
        }
    }

    function renderMessages() {
        messagesContainer.innerHTML = '';
        if (!messages.length) {
            messagesContainer.innerHTML = '<p class="empty">No messages yet. Start the conversation.</p>';
            return;
        }

        const currentUserId = authStore.user?.id;

        messages.forEach((message) => {
            const bubble = document.createElement('div');
            const senderId = message.senderId?.toString ? message.senderId.toString() : message.senderId;
            const isOwnMessage = senderId === currentUserId;
            bubble.className = `message ${isOwnMessage ? 'sent' : 'received'}`;
            bubble.innerHTML = `<div>${message.text}</div><small class="message-time">${new Date(message.createdAt).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</small>`;
            messagesContainer.appendChild(bubble);
        });
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    async function sendMessage() {
        const text = input.value.trim();
        if (!text || !activeChat?._id) return;

        try {
            await sendChatMessage(activeChat._id, text);
            input.value = '';
            await loadMessages();
        } catch (error) {
            messagesContainer.innerHTML = `<p class="empty">${error.message}</p>`;
        }
    }

    sendButton.addEventListener('click', sendMessage);
    input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            sendMessage();
        }
    });

    if (hasChat) {
        loadMessages();
    }

    return element;
}
