const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/tododb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const ToDoSchema = new mongoose.Schema({
  itemName: String,
  itemDescription: String,
});

const ToDo = mongoose.model('ToDo', ToDoSchema);

app.post('/submittodoitem', async (req, res) => {
  const { itemName, itemDescription } = req.body;
  const newItem = new ToDo({ itemName, itemDescription });
  await newItem.save();
  res.send('Saved to MongoDB');
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
