# Project Context

## Product Vision
Chaty is a modern real-time messaging platform inspired by WhatsApp, Telegram, Discord DMs, and Messenger. The product should provide a polished desktop-and-mobile messaging experience with secure authentication, real-time conversations, friend discovery, and future readiness for group chats, voice/video, and AI features.

## Project Goals
- Deliver a full-stack messaging app with synchronized frontend and backend architecture.
- Use modular, production-oriented code that is easy to extend.
- Make the interface feel fast, polished, and reliable.
- Support real-time communication through Socket.IO.
- Create a foundation for future features such as media sharing, push notifications, and call experiences.

## Core Assumptions
- The application will run in a single workspace with a static frontend served by a Node.js backend.
- Authentication will use JWT with password hashing.
- MongoDB is the intended persistence layer, but the initial implementation should also run without a live database by using an in-memory fallback.
- The frontend should communicate with the backend through a service layer and never make API calls directly from UI components.

## Success Criteria
- Users can register and log in.
- Users can see conversations and send messages.
- Messages appear in real time across connected clients.
- The codebase is organized for future scaling.
