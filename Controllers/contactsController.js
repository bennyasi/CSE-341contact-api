import { ObjectId } from 'mongodb';
import connectDB from '../db/connect.js';

// GET all contacts
export async function getAllContacts(req, res) {
  try {
    const db = await connectDB();
    const contacts = await db.collection('contacts').find().toArray();
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// GET contact by ID
export async function getContactById(req, res) {
  try {
    const db = await connectDB();
    const contact = await db.collection('contacts').findOne({ _id: new ObjectId(req.params.id) });
    if (!contact) return res.status(404).json({ error: 'Contact not found' });
    res.status(200).json(contact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// CREATE a new contact
export async function createContact(req, res) {
  try {
    const db = await connectDB();
    const result = await db.collection('contacts').insertOne(req.body);
    res.status(201).json({ message: 'Contact created successfully', contactId: result.insertedId });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// UPDATE a contact by ID
export async function updateContact(req, res) {
  try {
    const db = await connectDB();
    const result = await db.collection('contacts').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );
    if (result.matchedCount === 0) return res.status(404).json({ error: 'Contact not found' });
    res.status(200).json({ message: 'Contact updated successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// DELETE a contact by ID
export async function deleteContact(req, res) {
  try {
    const db = await connectDB();
    const result = await db.collection('contacts').deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) return res.status(404).json({ error: 'Contact not found' });
    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
