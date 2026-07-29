# Application Flow

## User Journey
1. User opens the application.
2. If no valid token exists, the user sees the authentication screen.
3. The user registers or logs in.
4. On success, the frontend requests the user profile and chat list.
5. The user selects a conversation.
6. The frontend loads the conversation messages.
7. The user sends a message.
8. The backend stores the message and emits it in real time.
9. The recipient receives the message immediately if connected.

## Backend Flow
1. Request arrives at Express.
2. Authentication middleware validates JWT when required.
3. Controller processes the request.
4. Data is stored or retrieved.
5. Response is sent back to the client.
6. Socket.IO emits relevant real-time updates.

## Frontend Flow
1. UI component triggers an action.
2. Store updates its local state.
3. Service calls the API or Socket.IO.
4. Store refreshes state from response.
5. UI renders updated state.
