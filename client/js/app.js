import header from "./components/header.js";
import sidebar from "./components/sidebar.js";
import chatList from "./components/chatList.js";
import home from "./components/home.js";


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


// Create components

headerContainer.appendChild(header());

sidebarContainer.appendChild(sidebar());

chatListContainer.appendChild(chatList());

mainContent.appendChild(home());


// Build layout

layoutContainer.appendChild(sidebarContainer);

layoutContainer.appendChild(chatListContainer);

layoutContainer.appendChild(mainContent);


// Add to app

app.appendChild(headerContainer);

app.appendChild(layoutContainer);



// Mobile sidebar toggle

const menuButton = document.querySelector(".menu-btn");


menuButton.addEventListener("click", () => {

    sidebarContainer.classList.toggle("active");

});
