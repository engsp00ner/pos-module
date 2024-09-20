const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); // Import cors

const OrderRoutes = require("./routes/OrderRoutes"); //orders Route
const productRoutes = require("./routes/ProductRoutes"); //Product Routes
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to enable CORS as the front end runs on port 3000 
//and the back end runs on 3001 so we need to enable the cors option 
 // Use the cors middleware here
app.use(cors({
    origin: 'http://localhost:3000', // Allow only this origin
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI )
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

// Middleware
app.use(express.json());

// Routes
//product routes
app.use('/api', productRoutes);

//orders Route
app.use('/api/orders', OrderRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

