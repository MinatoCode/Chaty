import mongoose from 'mongoose';

const friendRequestSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  recipientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

friendRequestSchema.index({ senderId: 1, recipientId: 1 }, { unique: true });

export default mongoose.model('FriendRequest', friendRequestSchema);
