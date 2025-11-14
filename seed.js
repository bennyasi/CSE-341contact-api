import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Define the same schema as in server.js
const contactSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  favoriteColor: String,
  birthday: Date
});

const Contact = mongoose.model('Contact', contactSchema);

async function run() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log("✅ Connected to MongoDB");

    // Clear existing contacts (optional)
    await Contact.deleteMany({});

    // Insert sample contacts
    await Contact.insertMany([
      {
        firstName: "Ada",
        lastName: "Lovelace",
        email: "ada@example.com",
        favoriteColor: "Blue",
        birthday: new Date("1815-12-10")
      },
      {
        firstName: "Grace",
        lastName: "Hopper",
        email: "grace@example.com",
        favoriteColor: "Green",
        birthday: new Date("1906-12-09")
      },
      {
        firstName: "Tim",
        lastName: "Berners-Lee",
        email: "tim@example.com",
        favoriteColor: "Red",
        birthday: new Date("1955-06-08")
      }
    ]);

    console.log("🌱 Seed data inserted successfully");
    await mongoose.disconnect();
  } catch (err) {
    console.error("❌ Error seeding data:", err);
    process.exit(1);
  }
}

run();
