chat-app/
│
├── client/
│   ├── index.html
│   │
│   ├── css/
│   │   ├── global.css
│   │   ├── variables.css
│   │   ├── layout.css
│   │   └── components/
│   │       ├── sidebar.css
│   │       ├── header.css
│   │       ├── chat.css
│   │       ├── modal.css
│   │       └── usercard.css
│   │
│   ├── js/
│   │   ├── app.js
│   │   ├── router.js
│   │   ├── api.js
│   │   ├── socket.js
│   │   │
│   │   ├── components/
│   │   │   ├── Sidebar.js
│   │   │   ├── Header.js
│   │   │   ├── ChatItem.js
│   │   │   ├── MessageBubble.js
│   │   │   ├── UserCard.js
│   │   │   ├── Modal.js
│   │   │   ├── Loader.js
│   │   │   └── Toast.js
│   │   │
│   │   ├── views/
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Home.js
│   │   │   ├── Chats.js
│   │   │   ├── Friends.js
│   │   │   ├── Requests.js
│   │   │   ├── Search.js
│   │   │   ├── Profile.js
│   │   │   ├── Settings.js
│   │   │   └── NotFound.js
│   │   │
│   │   ├── services/
│   │   │   ├── auth.js
│   │   │   ├── user.js
│   │   │   ├── friend.js
│   │   │   ├── conversation.js
│   │   │   └── message.js
│   │   │
│   │   └── utils/
│   │       ├── helpers.js
│   │       ├── constants.js
│   │       ├── storage.js
│   │       ├── validator.js
│   │       └── formatter.js
│   │
│   └── assets/
│       ├── images/
│       ├── icons/
│       └── fonts/
│
├── server/
│   ├── server.js
│   │
│   ├── config/
│   │   ├── database.js
│   │   └── socket.js
│   │
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── user.routes.js
│   │   ├── friend.routes.js
│   │   ├── request.routes.js
│   │   ├── conversation.routes.js
│   │   ├── message.routes.js
│   │   └── profile.routes.js
│   │
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── user.controller.js
│   │   ├── friend.controller.js
│   │   ├── request.controller.js
│   │   ├── conversation.controller.js
│   │   ├── message.controller.js
│   │   └── profile.controller.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── FriendRequest.js
│   │   ├── Conversation.js
│   │   └── Message.js
│   │
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── upload.js
│   │   ├── validate.js
│   │   └── errorHandler.js
│   │
│   ├── sockets/
│   │   └── chat.socket.js
│   │
│   └── utils/
│       ├── logger.js
│       ├── response.js
│       └── helpers.js
│
├── uploads/
│
├── .env
├── .gitignore
├── package.json
├── README.md
├── PROJECT_RULES.md
├── TASKS.md
└── LICENSE
