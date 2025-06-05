import mongoose from 'mongoose';

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  var mongoose: MongooseCache;
}

require('dotenv').config();

// Get the connection string from environment variables
const mongoURI = process.env.MONGO_URI;

// Create a singleton connection
const cached: MongooseCache = global.mongoose || { conn: null, promise: null };
global.mongoose = cached;

async function connectDB(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(mongoURI!).then(() => {
      cached.conn = mongoose;
      console.log("MongoDB connected");
      return mongoose;
    });
  }

  try {
    await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn!;
}

// Define schemas
const userSchema = new mongoose.Schema({
  pubKey: String
});

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { 
    type: String, 
    required: true,
    enum: ['todo', 'in-progress', 'done'],
    default: 'todo'
  },
  createdAt: { type: Date, default: Date.now },
  pubKey: { type: String, ref: 'User', required: true }
});

// Create models only if they don't exist
const User = mongoose.models.User || mongoose.model('User', userSchema);
const Task = mongoose.models.Task || mongoose.model('Task', taskSchema);

export { connectDB, User, Task };