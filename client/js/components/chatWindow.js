import { authStore } from '../../store/authStore.js';
import chatStore from '../../store/chatStore.js';

export default function chatWindow(chat = null, onBack = null) {
    const element = document.createElement('div');
    element.className = 'chat-window';

    const currentUserId = authStore.user?.id;
    const isDirectChat = Array.isArray(chat?.participants) && chat.participants.length <= 2;
    const directParticipant = isDirectChat
        ? (chat.participants || []).find((participant) => {
            const participantId = participant?._id?.toString?.() || participant?.toString?.();
            return participantId && participantId !== currentUserId && participantId !== currentUserId?.toString?.();
          })
        : null;
    const headerTitle = directParticipant?.name || chat?.name || 'Select a chat';
    const headerSubtitle = directParticipant ? (directParticipant.status || 'Online') : (chat ? 'Online' : 'Choose a conversation');
    const headerInitial = (headerTitle || 'C').charAt(0).toUpperCase();

    element.innerHTML = `
        <div class="chat-header">
            <button class="chat-back-btn">➜</button>
            <div class="chat-user">
                <div class="chat-avatar online">${headerInitial}</div>
                <div class="chat-info">
                    <h3>${headerTitle}</h3>
                    <span>${headerSubtitle}</span>
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

    // local snapshot reference
    let localState = chatStore.getState();

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

    async function handleStoreUpdate(e) {
        localState = e.detail;
        const chatId = activeChat?._id;
        if (chatId) {
            const freshChat = localState.chats?.find((c) => c._id === chatId);
            if (freshChat) {
                activeChat = freshChat;
                renderHeader(activeChat);
            }
        }
        const messages = (localState.messages && chatId && localState.messages[chatId]) ? localState.messages[chatId] : [];
        renderMessages(messages);
    }

    function renderHeader(chatData) {
        const currentUserId = authStore.user?.id;
        const isDirectChat = Array.isArray(chatData?.participants) && chatData.participants.length <= 2;
        const directParticipant = isDirectChat
            ? (chatData.participants || []).find((participant) => {
                const participantId = participant?._id?.toString?.() || participant?.toString?.();
                return participantId && participantId !== currentUserId && participantId !== currentUserId?.toString?.();
              })
            : null;
        const headerTitle = directParticipant?.name || chatData?.name || 'Select a chat';
        const headerSubtitle = directParticipant ? (directParticipant.status || 'Online') : (chatData ? 'Online' : 'Choose a conversation');
        const headerInitial = (headerTitle || 'C').charAt(0).toUpperCase();

        const avatar = element.querySelector('.chat-avatar');
        const titleEl = element.querySelector('.chat-user h3');
        const subtitleEl = element.querySelector('.chat-user span');

        if (avatar) avatar.textContent = headerInitial;
        if (titleEl) titleEl.textContent = headerTitle;
        if (subtitleEl) subtitleEl.textContent = headerSubtitle;
    }

    function renderMessages(messages) {
        messagesContainer.innerHTML = '';
        if (!messages || !messages.length) {
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

        // auto-scroll if near bottom
        const nearBottom = messagesContainer.scrollHeight - messagesContainer.scrollTop - messagesContainer.clientHeight < 120;
        if (nearBottom) messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    async function sendMessage() {
        const text = input.value.trim();
        if (!text || !activeChat?._id) return;

        try {
            input.value = '';
            await chatStore.sendMessage(activeChat._id, text);
        } catch (error) {
            // error state will be emitted by the store
        }
    }

    sendButton.addEventListener('click', sendMessage);
    input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            sendMessage();
        }
    });

    // subscribe to store updates
    chatStore.subscribe(handleStoreUpdate);

    if (hasChat) {
        chatStore.loadMessages(activeChat._id);
    }

    // cleanup when element removed
    element.cleanup = () => {
        chatStore.unsubscribe(handleStoreUpdate);
    };

    return element;
}
