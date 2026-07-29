import mongoose from 'mongoose';

export async function connectDatabase() {
  const uri = process.env.MONGODB_URI || process.env.MONGODB_URL;

  if (!uri) {
    console.warn('MongoDB URI not provided. Continuing without database persistence.');
    return null;
  }

  try {
    await mongoose.connect(uri, {
      dbName: 'chaty'
    });
    console.log('MongoDB connected');
    return mongoose.connection;
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    return null;
  }
}
