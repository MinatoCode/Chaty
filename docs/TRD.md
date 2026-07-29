# Technical Requirements Document (TRD)

## Stack
- Frontend: HTML, CSS, Vanilla JavaScript, ES Modules
- Backend: Node.js, Express.js, Socket.IO
- Data: MongoDB and Mongoose when available; in-memory fallback for local development
- Security: JWT, bcrypt
- Media support: Multer and Cloudinary-ready architecture

## Architecture Principles
- Components must only talk to stores.
- Stores must use services.
- Services must communicate with the API and Socket.IO.
- The backend must expose clear REST endpoints.
- The backend must support real-time messaging through Socket.IO.

## API Layer
- Authentication endpoints: register, login, me
- User endpoints: search users
- Chat endpoints: list chats, create chat, list messages, send message

## Data Model
- User
- Chat
- Message

## Deployment Expectations
- Environment driven configuration.
- Runtime safety for missing DB connectivity.
- Clear separation of concerns for future expansion.
