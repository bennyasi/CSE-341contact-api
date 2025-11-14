import { MongoClient } from "mongodb";

// ✅ Correct MongoDB connection string
const uri = "mongodb+srv://bennyasi64_db_user:rry7qAsPwfYyW0f4@cluster0.vdvua5x.mongodb.net/contactsdb?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("✅ Connected successfully to MongoDB Atlas!");
  } catch (err) {
    console.error("❌ Connection failed:", err);
  } finally {
    await client.close();
  }
}

run();

