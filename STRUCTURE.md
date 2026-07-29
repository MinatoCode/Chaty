# 📁 Chaty Project Structure

Chaty follows a modular architecture to keep the project scalable, maintainable, and easy to understand. Each folder has a single responsibility, making future development (Socket.IO, MongoDB, Authentication, etc.) much easier.

---

# Project Structure

```text
Chaty/
│
├── client/
│   │
│   ├── index.html                # Main HTML entry point
│   │
│   ├── assets/                   # Static assets
│   │   ├── icons/
│   │   ├── images/
│   │   ├── emojis/
│   │   └── sounds/
│   │
│   ├── css/
│   │   ├── global.css            # Global styles & reset
│   │   ├── variables.css         # Theme variables
│   │   ├── layout.css            # Overall application layout
│   │   │
│   │   └── components/
│   │       ├── header.css
│   │       ├── sidebar.css
│   │       ├── home.css
│   │       ├── userCard.css
│   │       ├── chatList.css
│   │       ├── chatWindow.css
│   │       ├── message.css
│   │       ├── modal.css
│   │       └── settings.css
│   │
│   ├── js/
│   │   │
│   │   ├── app.js                # Application entry point
│   │   │
│   │   ├── components/           # UI Components
│   │   │   ├── header.js
│   │   │   ├── sidebar.js
│   │   │   ├── home.js
│   │   │   ├── userCard.js
│   │   │   ├── chatList.js
│   │   │   ├── chatWindow.js
│   │   │   ├── message.js
│   │   │   └── modal.js
│   │   │
│   │   ├── data/                 # Temporary dummy data
│   │   │   ├── chats.js
│   │   │   ├── users.js
│   │   │   └── settings.js
│   │   │
│   │   ├── store/                # Global application state
│   │   │   ├── chatStore.js
│   │   │   ├── userStore.js
│   │   │   └── uiStore.js
│   │   │
│   │   ├── services/             # API & external services
│   │   │   ├── api.js
│   │   │   ├── socket.js
│   │   │   ├── auth.js
│   │   │   └── notification.js
│   │   │
│   │   ├── utils/                # Reusable helper functions
│   │   │   ├── helpers.js
│   │   │   ├── validator.js
│   │   │   ├── animation.js
│   │   │   └── time.js
│   │   │
│   │   └── config/               # Application constants
│   │       └── constants.js
│   │
│   └── manifest.json             # Progressive Web App config
│
├── server/
│   │
│   ├── server.js                 # Server entry point
│   ├── app.js                    # Express configuration
│   │
│   ├── config/
│   │   ├── database.js
│   │   ├── socket.js
│   │   └── env.js
│   │
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── user.routes.js
│   │   ├── chat.routes.js
│   │   └── message.routes.js
│   │
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── user.controller.js
│   │   ├── chat.controller.js
│   │   └── message.controller.js
│   │
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── upload.js
│   │   └── error.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Chat.js
│   │   └── Message.js
│   │
│   ├── sockets/
│   │   ├── chat.socket.js
│   │   ├── typing.socket.js
│   │   └── presence.socket.js
│   │
│   └── uploads/
│
├── .env
├── package.json
├── README.md
└── structure.MD
```

---

# Folder Overview

## 📂 assets
Stores static resources such as icons, images, emoji assets, and notification sounds.

## 📂 css
Contains all application styles.

- **global.css** → Global reset and common styles.
- **variables.css** → Theme colors, fonts, spacing, shadows.
- **layout.css** → Main responsive layout.
- **components/** → Individual styles for each UI component.

## 📂 js/components
Reusable UI components responsible only for rendering and user interaction.

Examples:
- Header
- Sidebar
- Chat Window
- Chat List
- User Card

## 📂 js/data
Temporary frontend data used before connecting to a backend database.

This folder will eventually be replaced by API responses from the server.

## 📂 js/store
Application state management.

Stores information such as:
- Current chat
- Current user
- UI state
- Theme
- Sidebar state

All components should read and update state through this folder.

## 📂 js/services
Responsible for communicating with external services.

Examples:
- REST API
- Socket.IO
- Authentication
- Browser notifications

## 📂 js/utils
Reusable helper functions shared across the project.

Examples:
- Time formatting
- Validation
- Animations
- Utility helpers

## 📂 js/config
Stores application-wide constants.

Examples:
- Maximum message length
- Default avatar
- Theme settings

---

# Backend Overview

The backend follows a standard Express.js architecture.

Routes
→ Receive requests

Controllers
→ Process application logic

Models
→ Interact with MongoDB

Sockets
→ Handle real-time communication

Middleware
→ Authentication, uploads, and error handling

---

# Development Roadmap

### Version 0.1
- Responsive UI
- Sidebar
- Chat Window
- Mobile Navigation

### Version 0.2
- Dynamic Messages
- Multiple Chats
- Chat Switching

### Version 0.3
- Socket.IO
- Online Status
- Typing Indicator
- Read Receipts

### Version 0.4
- Authentication
- User Profiles
- Friend System

### Version 0.5
- MongoDB Integration
- Image Sharing
- File Uploads

### Version 1.0
- Voice Messages
- Group Chats
- Message Reactions
- Search
- Themes
- Notifications
- Progressive Web App (PWA)

---

# Project Philosophy

Chaty is designed using a modular architecture where every component has a single responsibility.

This structure improves maintainability, simplifies debugging, and allows new features to be added without rewriting existing code.

The long-term goal is to build a scalable real-time messaging application using modern web technologies.
