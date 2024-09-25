const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// POST request to create a new order
router.post('/create', async (req, res) => {
  try {
    const { Id, items, totalAmount } = req.body;

    // Check if the request data is valid
    if (!Id || !items || items.length === 0 || !totalAmount) {
      return res.status(400).json({ message: 'Invalid request data' });
    }

    // Create a new order document
    const newOrder = new Order({
      Id,
      items,
      totalAmount,
      orderDate: Date.now(), // Automatically sets the order date
    });

    // Save the order to the database
    const savedOrder = await newOrder.save();

    res.status(201).json({
      message: 'Order created successfully',
      order: savedOrder,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create order', error });
  }
});

// Route to get total amount of all orders within a date range
router.get('/total-amount', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    // Ensure the dates are provided
    if (!startDate || !endDate) {
      return res.status(400).json({ message: 'Please provide startDate and endDate' });
    }

    // Convert to proper Date objects
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Query MongoDB for orders within the date range
    const orders = await Order.find({
      orderDate: { $gte: start, $lte: end },
    });

    // Sum the totalAmount of all orders
    const totalAmount = orders.reduce((sum, order) => sum + order.totalAmount, 0);

    // Respond with the total amount
    res.json({ totalAmount });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve orders', error });
  }
});

// Get all orders and total amount within a custom period of time
router.get('/date-range', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    // Ensure the dates are provided
    if (!startDate || !endDate) {
      return res.status(400).json({ message: 'Please provide startDate and endDate' });
    }

    // Convert to proper Date objects
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Find orders from startDate to endDate
    const orders = await Order.find({
      orderDate: {
        $gte: start, // Greater than or equal to startDate
        $lte: end,   // Less than or equal to endDate
      },
    });

    // Calculate total amount for all orders in the period
    const totalAmount = orders.reduce((sum, order) => sum + order.totalAmount, 0);

    res.status(200).json({ orders, totalAmount });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Failed to fetch orders', error });
  }
});



module.exports = router;
