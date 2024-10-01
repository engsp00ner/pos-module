const express = require('express');
const router = express.Router();
const Customer = require('../models/customer'); // adjust the path if necessary

// CREATE a new customer
router.post('/customer', async (req, res) => {
  const { id, name } = req.body;
  const customer = new Customer({ id, name });

  try {
    const savedCustomer = await customer.save();
    res.status(201).json(savedCustomer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// READ all customers
router.get('/customer', async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// READ a single customer by ID
router.get('/customer/:id', getCustomer, (req, res) => {
  res.json(res.customer);
});

// UPDATE a customer by ID
router.put('/customer/:id', getCustomer, async (req, res) => {
  const { name } = req.body;
  if (name != null) {
    res.customer.name = name;
  }

  try {
    const updatedCustomer = await res.customer.save();
    res.json(updatedCustomer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a customer by ID
router.delete('/customer/:id', getCustomer, async (req, res) => {
  try {
    await res.customer.remove();
    res.json({ message: 'Customer deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to get customer by ID
async function getCustomer(req, res, next) {
  let customer;
  try {
    customer = await Customer.findOne({ id: req.params.id });
    if (customer == null) {
      return res.status(404).json({ message: 'Customer not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.customer = customer;
  next();
}

module.exports = router;
