const express = require('express');
const app = express();
const PORT = process.env.PORT || 5566;

// Middleware to parse JSON request bodies
app.use(express.json());

// Users array
let users = [];

// GET: Retrieve all users
app.get('/users', (req, res) => {
  res.json(users);
});

// POST: Add a new user
app.post('/users', (req, res) => {
  const { id, name } = req.body;

  if (!id || !name) {
    return res.status(400).json({ message: 'ID and Name are required.' });
  }

  // Check if user already exists
  if (users.find(user => user.id === id)) {
    return res.status(400).json({ message: 'User with this ID already exists.' });
  }

  users.push({ id, name });
  res.status(201).json({ message: 'User added successfully.', users });
});

// DELETE: Remove a user by ID
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;

  // Find the user by ID
  const userIndex = users.findIndex(user => user.id === id);

  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found.' });
  }

  // Remove the user
  users.splice(userIndex, 1);
  res.json({ message: 'User deleted successfully.', users });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
