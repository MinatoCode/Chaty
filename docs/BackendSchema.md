# Backend Schema Design

## User
- id: ObjectId
- name: String
- email: String (unique)
- passwordHash: String
- avatarUrl: String
- status: String (online, offline, away)
- createdAt: Date
- updatedAt: Date

## Chat
- id: ObjectId
- participants: [ObjectId]
- lastMessage: ObjectId
- updatedAt: Date
- createdAt: Date

## Message
- id: ObjectId
- chatId: ObjectId
- senderId: ObjectId
- text: String
- attachments: [String]
- createdAt: Date
- updatedAt: Date

## Relationships
- A chat contains many messages.
- A user can participate in many chats.
- A message belongs to one chat and one sender.

## Indexing Recommendations
- Unique index on user email.
- Index on chat participants.
- Index on message chatId and createdAt.
