const mongoose = require('mongoose');
const { type } = require('os');

// Define the schema for order items
const OrderItemSchema = new mongoose.Schema({
  id: {type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  ItemAmount: { type: Number, required: true },
  image: { type: String, required: false },
});

// Define the order schema
const OrderSchema = new mongoose.Schema({
  Id: { type: String, required: false }, // Custom Id field, ensure it's required
  items: [OrderItemSchema], // An array of order items
  totalAmount: { type: Number, required: true }, // The total amount of the order
  orderDate: { type: Date, default: Date.now }, // Automatically set the order date
});

// Create the Order model
const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
