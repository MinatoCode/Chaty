import sidebar from "./components/sidebar.js";
import chatList from "./components/chatList.js";
import home from "./components/home.js";


const sidebarContainer = document.getElementById("sidebar");
const chatListContainer = document.getElementById("chat-list");
const mainContent = document.getElementById("main-content");


sidebarContainer.appendChild(sidebar());

chatListContainer.appendChild(chatList());

mainContent.appendChild(home());
