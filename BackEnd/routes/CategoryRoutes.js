const express = require('express');
const Category = require('./categoryModel'); // Import the Mongoose model

const router = express.Router();

// CREATE: Add a new category
router.post('/categories', async (req, res) => {
  const { type, displayName, categoryImage } = req.body;

  try {
    const newCategory = new Category({ type, displayName, categoryImage });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: 'Error creating category', error });
  }
});

// READ: Get all categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories', error });
  }
});

// READ: Get a single category by ID
router.get('/categories/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching category', error });
  }
});

// UPDATE: Modify an existing category
router.put('/categories/:id', async (req, res) => {
  const { id } = req.params;
  const { type, displayName, categoryImage } = req.body;

  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { type, displayName, categoryImage },
      { new: true } // This returns the updated document
    );
    if (!updatedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: 'Error updating category', error });
  }
});

// DELETE: Remove a category
router.delete('/categories/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting category', error });
  }
});

// READ: Get distinct categories (new route)
router.get('/categories/distinct', async (req, res) => {
  try {
    const distinctCategories = await Category.distinct('type'); 
    res.status(200).json(distinctCategories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching distinct categories', error });
  }
});
module.exports = router;