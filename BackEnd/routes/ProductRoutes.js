const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Select: Get all products
router.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Select.single: Get a product by ID
router.get('/products/:id', async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({   
   message: 'Product not found' });
      }
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({   
   message: 'Error fetching product', error });
    }
  });

  //insert: CREATE Add a new product
router.post('/products', async (req, res) => {
    try {
      const newProduct = new Product(req.body);
      await newProduct.save();
      res.status(201).json(newProduct);
    } catch   
   (error) {
      res.status(500).json({ message: 'Error creating product', error   
   });
    }
  });


  // UPDATE: Modify an existing product
router.put('/products/:id', async (req, res) => {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,   
  
        { new: true } // Return the updated product
      );
      if (!updatedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json(updatedProduct);   
  
    } catch (error) {
      res.status(500).json({ message: 'Error updating product', error });
    }
  });

  // DELETE:  Remove a product
 router.delete('/products/:id', async (req, res) => {
   try {
     const deletedProduct = await Product.findByIdAndDelete(req.params.id);
     if (!deletedProduct) {
       return res.status(404).json({   
  message: 'Product not found' });
     }
     res.status(200).json({ message: 'Product deleted successfully' });
   } catch (error) {
     res.status(500).json({ message: 'Error deleting product', error });
   }
 });
module.exports = router;


