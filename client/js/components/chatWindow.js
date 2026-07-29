import { messages as initialMessages } from "../data/messages.js";
import { getCurrentTime } from "../utils/time.js";

export default function chatWindow() {

    const element = document.createElement("div");

    element.className = "chat-window";

    element.innerHTML = `

        <div class="chat-header">

            <button class="chat-back-btn">
                ➜
            </button>

            <div class="chat-user">

                <div class="chat-avatar online">
                    A
                </div>

                <div class="chat-info">

                    <h3>Alex</h3>

                    <span>Online</span>

                </div>

            </div>

        </div>

        <div class="messages"></div>

        <div class="message-input">

            <input
                class="message-text"
                type="text"
                placeholder="Type a message..."
            >

            <button class="send-btn">
                ➤
            </button>

        </div>

    `;

    const input = element.querySelector(".message-text");
    const sendButton = element.querySelector(".send-btn");
    const messagesContainer = element.querySelector(".messages");

    const messageList = Array.isArray(initialMessages) ? initialMessages : [];

    function renderMessages() {

        messagesContainer.innerHTML = "";

        messageList.forEach((message) => {

            const bubble = document.createElement("div");

            bubble.className = `message ${message.own ? "sent" : "received"}`;

            bubble.innerHTML = `
                <div>${message.text}</div>
                <small class="message-time">${message.time}</small>
            `;

            messagesContainer.appendChild(bubble);

        });

        messagesContainer.scrollTop = messagesContainer.scrollHeight;

    }

    function sendMessage() {

        const text = input.value.trim();

        if (!text) return;

        messageList.push({
            id: Date.now(),
            sender: "You",
            text,
            own: true,
            time: getCurrentTime()
        });

        renderMessages();

        input.value = "";

        input.focus();

    }

    renderMessages();

    sendButton.addEventListener("click", sendMessage);

    input.addEventListener("keydown", (event) => {

        if (event.key === "Enter") {

            sendMessage();

        }

    });

    return element;

            }
