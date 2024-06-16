import mongoose, { Mongoose } from 'mongoose';

const MONGO_DB_URI = process.env.MONGO_DB_URI;
if (!MONGO_DB_URI) {
  throw new Error(
    'Please define the MONGO_DB_URI environment variable inside .env.local'
  );
}

interface MongooseConn {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

let cached: MongooseConn = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export const connect = async () => {
  if (cached.conn) {
    return cached.conn;
  }
  cached.promise =
    cached.promise ||
    mongoose.connect(MONGO_DB_URI, {
      dbName: 'hiropitch',
      bufferCommands: false,
      connectTimeoutMS: 30000,
    });

  cached.conn = await cached.promise;

  return cached.conn;
};
