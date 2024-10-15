const express = require('express');
const router = express.Router();
const{ User , validate }= require('../models/user'); // Import the user model
const bcrypt = require("bcrypt");
// Create a new user (POST /api/users)
router.post('/user', async (req, res) => {
  try {
    const {error}= validate(req.body);
    if (error)
      return res.status(400).send({message:error.details[0].message })
    const { id, name, password, displayname, usertype } = req.body;

    //password encrypt using bycrypt
    const salt = await bcrypt.genSalt(Number(process.env.SALT ))
    const hashPasswod= await bcrypt.hash(password , salt);
     
    //creating new user
    const newUser = new User({ id, name, password :hashPasswod, displayname, usertype });
    await newUser.save();

    res.status(201).json({message:'تم إضافه مستخدم جديد بنجاح' });
  } catch (error) {
    // Handle duplicate key error (MongoDB's unique constraint violation)
    if (error.code === 11000 && error.keyPattern && error.keyPattern.name) {
      res.status(400).json({ error: 'أسم المستخدم موجود بالفعل !! برجاء إختيار أسم اّخر.' });
    } else {
      res.status(500).json({ error: 'حدث خطأ أثناء إضافه المستخدم' });
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
