import header from "./components/header.js";
import sidebar from "./components/sidebar.js";
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

    const sidebarContainer = document.createElement("aside");
    sidebarContainer.id = "sidebar";

    const chatListContainer = document.createElement("section");
    chatListContainer.id = "chat-list";

    const mainContent = document.createElement("main");
    mainContent.id = "main-content";

    const overlay = document.createElement("div");
    overlay.id = "overlay";

    const initialChatWindow = chatWindow();
    const listComponent = chatList({
        onSelectChat: (chat) => {
            mainContent.innerHTML = '';
            mainContent.appendChild(chatWindow(chat));
            document.body.classList.add('chat-open');
        }
    });

    headerContainer.appendChild(header());
    sidebarContainer.appendChild(sidebar());
    chatListContainer.appendChild(listComponent);
    mainContent.appendChild(initialChatWindow);

    layoutContainer.appendChild(sidebarContainer);
    layoutContainer.appendChild(chatListContainer);
    layoutContainer.appendChild(mainContent);

    app.appendChild(headerContainer);
    app.appendChild(layoutContainer);
    app.appendChild(overlay);

    const menuButton = document.querySelector(".menu-btn");
    menuButton?.addEventListener("click", () => {
        sidebarContainer.classList.toggle("active");
        overlay.classList.toggle("show");
    });

    overlay.addEventListener("click", () => {
        sidebarContainer.classList.remove("active");
        overlay.classList.remove("show");
    });

    document.querySelector(".chat-back-btn")?.addEventListener("click", () => {
        document.body.classList.remove("chat-open");
    });
}

bootstrap();
