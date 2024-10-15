const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors

const OrderRoutes = require("./routes/OrderRoutes"); //orders Route
const productRoutes = require("./routes/ProductRoutes"); //Product Routes
const CategoryRoutes =require("./routes/CategoryRoutes"); //category route
const CustomerRoutes = require("./routes/CustomerRoutes"); //Customer Route
const UserRoutes=require("./routes/UserRoutes"); //user Routes
const AuthRoutes=require("./routes/AuthRoutes")
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

//allow users to access uploaded images through URLs.
app.use('/assets', express.static('public/assets'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
// Routes
//product routes
app.use('/api', productRoutes);

//orders Route
app.use('/api', OrderRoutes);

//Customers Route
app.use('/api', CustomerRoutes);

//category routes
app.use('/api', CategoryRoutes);


//user routes
app.use('/api', UserRoutes);

//authentication routes
app.use('/api',AuthRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

