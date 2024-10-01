const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Import the user model

// Create a new user (POST /api/users)
router.post('/user', async (req, res) => {
  try {
    const { id, name, password, displayname, usertype } = req.body;
    const newUser = new User({ id, name, password, displayname, usertype });
    await newUser.save();
    res.status(201).json({message:'New User Registed successfully' , error});
  } catch (error) {
    // Handle duplicate key error (MongoDB's unique constraint violation)
    if (error.code === 11000 && error.keyPattern && error.keyPattern.name) {
      res.status(400).json({ error: 'Username already exists. Please choose a different name.' });
    } else {
      res.status(500).json({ error: 'Failed to register user' });
    }
  }
});

// Get all users (GET /api/users)
router.get('/user', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    // Handle duplicate key error (MongoDB's unique constraint violation)
    if (error.code === 11000 && error.keyPattern && error.keyPattern.name) {
      res.status(400).json({ error: 'Username already exists. Please choose a different name.' });
    } else {
      res.status(500).json({ error: 'Failed to register user' });
    }
  }
});

// Login a user (POST /api/users/login)
router.post('/user-login', async (req, res) => {
  const { name, password } = req.body;

  try {
    // Find the user by name (or you can switch to use email/username)
    const user = await User.findOne({ name });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await compare(password, user.password);
    
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ error: 'Failed to login' });
  }
});


// Get a single user by ID (GET /api/users/:id)
router.get('/user/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve user' });
  }
});

// Update a user by ID (PUT /api/users/:id)
router.put('/user/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) return res.status(404).json({ error: 'User not found' });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// Delete a user by ID (DELETE /api/users/:id)
router.delete('/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ error: 'User not found' });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

module.exports = router;
