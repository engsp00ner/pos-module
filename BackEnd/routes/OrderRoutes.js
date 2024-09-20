const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// POST request to create a new order
router.post('/create', async (req, res) => {
  try {
    const {Id, items, totalAmount } = req.body;


//check if the request is ok
    if (!Id ||!items || items.length === 0 || !totalAmount) {
      return res.status(400).json({ message: 'Invalid request data' });
    }
    // Create a new order document
    const newOrder = new Order({
      Id,
      items,
      totalAmount,
      orderDate: Date.now(),
      // orderDate will be set automatically with Date.now()
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


module.exports = router;
