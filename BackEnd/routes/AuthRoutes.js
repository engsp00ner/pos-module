const express = require('express'); // Import express
const router = express.Router(); // Create a new router
const { User } = require('../models/user'); // Import the user model
const joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Import jwt
require('dotenv').config(); // To access the JWT secret from .env file


// Middleware to authenticate JWT token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (!token) return res.status(401).json({ message: 'Token is missing!' });
  
    jwt.verify(token, process.env.JWTPRIVATEKEY, (err, user) => {
      if (err) return res.status(403).json({ message: 'Invalid or expired token!' });
  
      req.user = user; // Attach user information from token to the request object
      next();
    });
  };
  

// POST route for user authentication
router.post("/auth", async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).send({ message: error.details[0].message });

        const user = await User.findOne({ name: req.body.name });
        if (!user) return res.status(401).send({ message: "أسم المستخدم غير موجود !" });

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(401).send({ message: "خطأ بكلمة المرور " });

        const token = user.generateAuthToken();
        res.status(200).send({ data: token, message: "تم تسجيل الدخول بنجاح" });
    } catch (error) {
        res.status(500).send({ message: "internal server error" });
    }
});

// Route to validate the token and return user information
router.get('/auth/validate', authenticateToken, async (req, res) => {
    try {
      const user = await User.findById(req.user._id); // Get user details from the token
      if (!user) return res.status(404).json({ message: 'User not found!' });
  
      res.status(200).json({
        username: user.name,
        displayname: user.displayname,
        usertype: user.usertype,
      });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  });
const validate = (data) => {
    const schema = joi.object({
        name: joi.string().required().label("أسم المستخدم"),
        password: joi.string()
        .pattern(/^\d{3,}$/) // Regex for 3 or more digits
        .required()
        .label("كلمة المرور"),
    });
    return schema.validate(data);
}
module.exports = router; // Export the router
