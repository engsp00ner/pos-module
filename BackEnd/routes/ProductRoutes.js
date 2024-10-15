
/* eslint-disable no-underscore-dangle */
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const fs = require('fs-extra');
const path = require('path');
const Product = require('../models/Product');
const router = express.Router();
const jwt = require('jsonwebtoken');
  

// Middleware to verify JWT token and check usertype
const authenticateTokenAndUsertype = (allowedTypes) => (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

  jwt.verify(token, process.env.JWTPRIVATEKEY, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid or expired token' });


      // Debugging log for the user object from the token
      console.log('User from token:', user);
      
    // Check if the user's usertype is one of the allowed types
    if (!allowedTypes.includes(user.usertype)) {
      return res.status(403).json({ message: 'Access denied. You do not have the required permissions.' });
    }

    req.user = user; // Attach the user data from the token to the request object
    next(); // Proceed to the next middleware or route handler
  });
};



// Set up storage with multer to set the path to the file to be saved based on category type
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    try {
      const category = JSON.parse(req.body.category);
      const categoryType = category.type;

      const folderPath = path.join(__dirname, `../../public/assets/itemImages/products/`,categoryType);

      // Ensure the folder exists, create if necessary
      await fs.ensureDir(folderPath);

      cb(null, folderPath); // Save the file in the correct folder
      console.log("folder path :",folderPath);
    } catch (error) {
      console.error('Error parsing category or creating directory:', error);
      cb(error, null); // Pass the error to the callback
    }
  },
  //renaming the file to be stored 
  filename: (req, file, cb) => {
    const fileName =req.body.id.slice(-5) + '-' + file.originalname;
    cb(null, fileName); // Save the file with a timestamp
  }
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // Set file size limit to 50MB
});


//insert new Product
router.post('/addproduct', upload.single('ProductImage'),authenticateTokenAndUsertype(['admin', 'operator']), async (req, res) => {

  try {
    const { id, name, sealprice,buyprice, category, productamount } = req.body;
   
    // Log the incoming request
    console.log('Incoming data:', req.body);
    console.log('File data:', req.file);
    console.log("category type:",req.body.category.type)

    // Parse the category from the JSON string
    const parsedCategory = JSON.parse(category);

    // Check if the category is valid
    if (!parsedCategory || !parsedCategory.type || !parsedCategory.displayName || !parsedCategory.categoryImage) {
      return res.status(400).json({ error: "Category is required and must have type, displayName, and categoryImage" });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No image file uploaded!' });
    }

    // Create new product object
    const product = new Product({
      id,
      name,
      sealprice,
      buyprice,
      image: `${parsedCategory.type}/${req.file.filename}`, // Save only the image path
      category: parsedCategory,
      productamount
    });

    // Save the product to the database
    await product.save();

    res.status(201).json(product);
  } catch (err) {
    console.error('Error occurred:', err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

// Get all products
router.get('/products',authenticateTokenAndUsertype(['admin', 'operator']), async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get a product by ID
router.get('/products/:id',authenticateTokenAndUsertype(['admin', 'operator']), async (req, res) => {
  try {
    const product = await Product.findOne({ id: req.params.id });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update a product by ID
router.put('/products-update/:id',authenticateTokenAndUsertype(['admin']), upload.single('image'), async (req, res) => {
  try {
    const { name, sealprice,buyprice, category, productamount } = req.body;

    const product = await Product.findOne({ id: req.params.id });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Update product fields
    product.name = name || product.name;
    product.sealprice = sealprice || product.sealprice;
    product.buyprice = buyprice || product.buyprice;
    product.category = category || product.category;
    product.productamount = productamount || product.productamount;

    // Update image if a new file is uploaded
    if (req.file) {
      const imagePath = `/assets/itemImages/products/${req.file.filename}`;
      product.image = imagePath; // Save only the image path
    }

    await product.save();
    res.status(200).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

// Delete a product by ID
router.delete('/products/:id',authenticateTokenAndUsertype(['admin']), async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ id: req.params.id });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Optionally, you can delete the image file from the server as well
    const imagePath = path.join(__dirname, '../../public', product.image);
    await fs.remove(imagePath); // Remove the file from the server

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

module.exports = router;
