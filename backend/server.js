// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors(
  {
    origin : [""],
    methods :["POST","GET"],
    credentials : true
  }
));
app.use(bodyParser.json());

// MongoDB Connection
const mongoURI = 'mongodb+srv://Pratik3311:Pratik3311@cluster0.9kkj7.mongodb.net/'; // Replace with your actual MongoDB connection string
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define Schema and Model (Example: Item)
const itemSchema = new mongoose.Schema({
  title: String,
  description: String,
});
const Item = mongoose.model('Item', itemSchema);

// Routes
// GET all items
app.get('/api/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});

// POST new item
app.post('/api/items', async (req, res) => {
  const { title, description } = req.body;
  try {
    const newItem = new Item({ title, description });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    console.error('Error adding item:', error);
    res.status(500).json({ error: 'Failed to add item' });
  }
});

// DELETE item by ID
app.delete('/api/items/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Item.findByIdAndDelete(id);
    res.status(200).json({ message: 'Item deleted' });
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ error: 'Failed to delete item' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
