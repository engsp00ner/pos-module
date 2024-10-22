const express = require('express');
const router = express.Router();
const Order = require('../models/order');
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



// POST request to create a new order
router.post('/orders/create',authenticateTokenAndUsertype(['admin', 'operator']), async (req, res) => {
  try {
    const { Id, items, totalAmount, customer,  paymentType , paymentStatus ,paymentDate  } = req.body;

    if (!Id || !items || items.length === 0 || !totalAmount || !customer?.id) {
      return res.status(400).json({ message: 'Invalid request data' });
    }
 // Default customer handling if no customer is provided
 const defaultCustomer = { id: '0', name: 'عميل تجزئة' };

    const newOrder = new Order({
      Id,
      items,
      customer: customer || defaultCustomer, // Set customer or default value
      user:{ id: req.user.id, name: req.user.name }, // Include user from JWT token
      totalAmount,
      orderDate: Date.now(),
      paymentType,
      paymentStatus, // Include payment status in the order creation
      paymentDate,

    });

    const savedOrder = await newOrder.save();

    res.status(201).json({
      message: 'Order created successfully',
      order: savedOrder,
    });
  } catch (error) {
    console.error('Order creation error:', error); // Log the error
    res.status(500).json({ message: 'Failed to create order', error });
  }
});


// GET orders and total amount within a custom period of time with optional filtering by paymentType and paymentStatus
//this api is only allowed to be accessed by the admin users .
router.get('/orders/date-range', authenticateTokenAndUsertype(['admin', 'operator']), async (req, res) => {
  try {
    const { startDate, endDate, paymentType, paymentStatus , customerId } = req.query;

    // Ensure the dates are provided
    if (!startDate || !endDate) {
      return res.status(400).json({ message: 'Please provide startDate and endDate' });
    }

    // Convert to proper Date objects
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Build the query object dynamically
    let query = {
      orderDate: { $gte: start, $lte: end },
    };

    // If customerId is provided, add it to the query
    if (customerId) {
      query.customerId = custome.id; // Assuming orders have a `customer` field storing customer ID
    }
    // If paymentType is provided, add it to the query else get all data
    if (paymentType) {
      query.paymentType = paymentType;
    }      

    // If paymentStatus is provided, add it to the query
    if (paymentStatus) {
      query.paymentStatus = paymentStatus;
    }

    // Find orders from startDate to endDate with optional filtering
    const orders = await Order.find(query);

    // Calculate total amount for all filtered orders in the period
    const totalAmount = orders.reduce((sum, order) => sum + order.totalAmount, 0);

    res.status(200).json({ orders, totalAmount });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Failed to fetch orders', error });
  }
});

// PUT request to update an existing order
router.put('/orders/update/:id', authenticateTokenAndUsertype(['admin']), async (req, res) => {
  try {
    const { id } = req.params; // Get the order ID from the route parameters
    const { paymentStatus, paymentType, totalAmount, items, customer } = req.body;

    // Find the order by Id
    let order = await Order.findById(id);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if the payment status is being updated from 'pending' to 'paid'
    if (paymentStatus && paymentStatus === 'paid' && order.paymentStatus === 'pending') {
      order.paymentStatus = 'paid'; // Update payment status
      order.paymentDate = Date.now(); // Set payment date to the current date and time
    } else if (paymentStatus) {
      // If the status is being updated to something else, just update it without setting the paymentDate
      order.paymentStatus = paymentStatus;
    }

    // Update other fields if they are provided in the request body
    if (paymentType) {
      order.paymentType = paymentType; // Update payment type
    }
    if (totalAmount) {
      order.totalAmount = totalAmount; // Update total amount if needed
    }
    if (items && items.length > 0) {
      order.items = items; // Update items array if provided
    }
    if (customer && customer.id) {
      order.customer = customer; // Update customer information if provided
    }

    // Save the updated order
    const updatedOrder = await order.save();

    res.status(200).json({
      message: 'Order updated successfully',
      order: updatedOrder,
    });
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ message: 'Failed to update order', error });
  }
});


// DELETE request to delete an order by its ID
router.delete('/orders/delete/:id', authenticateTokenAndUsertype(['admin']), async (req, res) => {
  try {
    const { id } = req.params; // Get the order ID from the route parameters

    // Find the order by Id and delete it
    const deletedOrder = await Order.findByIdAndDelete(id);

    // If no order is found, return a 404 error
    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({
      message: 'Order deleted successfully',
      order: deletedOrder, // Return the deleted order details
    });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ message: 'Failed to delete order', error });
  }
});


module.exports = router;
