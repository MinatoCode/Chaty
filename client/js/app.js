import header from "./components/header.js";
import chatList from "./components/chatList.js";
import chatWindow from "./components/chatWindow.js";
import authView from "./components/authView.js";
import { authStore } from "../store/authStore.js";

const app = document.getElementById("app");

async function bootstrap() {
    app.innerHTML = "";

    try {
        await authStore.initialize();
    } catch (error) {
        console.warn("Auth initialization failed", error);
    }

    if (!authStore.user) {
        app.appendChild(authView());
        return;
    }

    const headerContainer = document.createElement("div");
    headerContainer.id = "header";

    const layoutContainer = document.createElement("div");
    layoutContainer.id = "layout";

    const chatListContainer = document.createElement("section");
    chatListContainer.id = "chat-list";

    const mainContent = document.createElement("main");
    mainContent.id = "main-content";

    const initialChatWindow = chatWindow();
    const listComponent = chatList({
        onSelectChat: (chat) => {
            mainContent.innerHTML = '';
            mainContent.appendChild(chatWindow(chat));
        }
    });

    headerContainer.appendChild(header());
    chatListContainer.appendChild(listComponent);
    mainContent.appendChild(initialChatWindow);

    layoutContainer.appendChild(chatListContainer);
    layoutContainer.appendChild(mainContent);

    app.appendChild(headerContainer);
    app.appendChild(layoutContainer);
}

bootstrap();
