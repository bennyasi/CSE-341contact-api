import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

let db;

export default async function connectDB() {
  if (db) return db;
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  db = client.db('contactsDB');
  return db;
}
