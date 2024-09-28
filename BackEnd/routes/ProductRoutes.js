

const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const fs = require('fs-extra');
const path = require('path');
const Product = require('../models/Product');

const router = express.Router();

// // Multer storage for handling image uploads
// const storage = multer.diskStorage({
//   destination: ( cb) => {
//     cb(null, 'public/assets/itemImages/temp'); // Temporarily save the image in a temp folder
//   },
//   filename: ( file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname)); // Filename will be a timestamp
//   }
// });

// const upload = multer({ storage });

// // Helper function to move image to final path
// const moveImage = async (file, productId) => {
//   const destinationPath = `public/assets/itemImages/products/${productId}`;
  
//   try {
//     // Ensure the directory exists
//     await fs.ensureDir(destinationPath);

//     // Define the new image path
//     const finalPath = `${destinationPath}/${file.filename}`;

//     // Move the image from temp folder to the new path
//     await fs.move(file.path, finalPath);

//     return finalPath;
//   } catch (err) {
//     console.error("Error moving file:", err);
//     throw err;
//   }
// };


// Create a new product
router.post('/addproduct', async (req, res) => {
  try {
    // Destructuring request body
    const { id, name, price, image,category, productamount } = req.body;
    // Access the category fields safely
    // const category = req.body.category || {}; // Use an empty object if category is undefined
    
    // const { type, displayName, CategoryImage } = category;

    // // Check if category exists before destructuring
     if (!category || !category.type || !category.displayName || !category.categoryImage) {
       return res.status(400).json({ error: "Category is required and must have type, displayName, and CategoryImage" });
     }

    // Log the request for debugging
    console.log("Received Data:", req.body);

    // Create new product object
    const product = new Product({
      id,
      name,
      price,
      image, // No file upload, just using the image URL or path provided
      category,
      productamount
    });

    // Save the product to the database
    await product.save();

    // Return success response
    res.status(201).json(product);
  } catch (err) {
    console.error("Error creating product:", err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

// Get all products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get a product by ID
router.get('/products/:id', async (req, res) => {
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
router.put('/products-update:id', async (req, res) => {
  try {
    const { name, price, category, productamount } = req.body;
    const productType = category.type;

    const product = await Product.findOne({ id: req.params.id });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Update product fields
    product.name = name || product.name;
    product.price = price || product.price;
    product.category = category || product.category;
    product.productamount = productamount || product.productamount;

    await product.save();
    res.status(200).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete a product by ID
router.delete('/products/:id', async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ id: req.params.id });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
