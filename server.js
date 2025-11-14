import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import contactsRouter from './routes/contacts.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(port, () => {
      console.log(`🚀 Server running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });

// Routes
app.use('/contacts', contactsRouter);

// Test route
app.get('/', (req, res) => {
  res.send('Week 1 Contact API is running!');
});
