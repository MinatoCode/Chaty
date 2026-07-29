# Product Requirements Document (PRD)

## Overview
Chaty is a real-time messaging application designed for direct user-to-user communication. It should feel modern, fast, and dependable on both mobile and desktop devices.

## User Personas
- Casual users who want simple direct messaging.
- Power users who expect instant updates and a polished UI.
- Future contributors who need a maintainable architecture.

## Core Features
1. Authentication
   - Register
   - Login
   - JWT-based session management
2. User Management
   - Search users
   - View profile basics
3. Conversations
   - Create chat threads
   - Send and receive messages
   - See timestamps
4. Real-Time Communication
   - Live message delivery
   - Typing indicators
5. Experience
   - Responsive layout
   - Mobile navigation
   - Clean and accessible UI

## Functional Requirements
- The app must support authentication and protected routes.
- The app must persist user and chat data.
- The app must display conversation history and new messages in real time.
- The app must allow users to create or enter a conversation and send messages.

## Non-Functional Requirements
- Security: password hashing, token-based auth, protected endpoints.
- Performance: lightweight responses and event-driven messaging.
- Maintainability: modular services, stores, controllers, and components.
- Scalability: clear separation for future enhancements.
