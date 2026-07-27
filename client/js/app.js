import header from "./components/header.js";
import sidebar from "./components/sidebar.js";
import chatList from "./components/chatList.js";
import home from "./components/home.js";
import userCard from "./components/userCard.js";


const app = document.getElementById("app");


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


// Header
headerContainer.appendChild(header());


// Main layout
sidebarContainer.appendChild(sidebar());

chatListContainer.appendChild(chatList());

mainContent.appendChild(home());


// Build layout
layoutContainer.appendChild(sidebarContainer);
layoutContainer.appendChild(chatListContainer);
layoutContainer.appendChild(mainContent);


// Add everything to app
app.appendChild(headerContainer);
app.appendChild(layoutContainer);
