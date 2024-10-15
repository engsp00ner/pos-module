const mongoose = require('mongoose');
const { string } = require('prop-types');

// Define the schema for order items
const OrderItemSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  sealprice: { type: Number, required: true },
  buyprice: { type: Number, required: true },
  margin: { type: Number, required: false }, // margin is not required since it will be auto-calculated
  ItemAmount: { type: Number, required: true },
  image: { type: String, required: false },
});

// Pre-save hook to calculate the margin automatically before saving
OrderItemSchema.pre('save', function (next) {
  // Calculate the margin only if sealprice and buyprice are provided
  if (this.sealprice && this.buyprice) {
    this.margin = this.sealprice - this.buyprice; // Calculate the margin
  }
  next();
});
//define customer schema
const customerSchema  = new mongoose.Schema({
   
  id: {
      type: String,
      required: true,
    },
  name: {
    type: String,
    required: true,
  },

});

//define user schema
const userSchema  = new mongoose.Schema({
   
  id: {
      type: String,
      required: true,
    },
  name: {
    type: String,
    required: true,
  },

});
// Define the order schema
const OrderSchema = new mongoose.Schema({
  Id: { type: String, required: false }, // Custom Id field, ensure it's required
  items: [OrderItemSchema], // An array of order items
  customer:customerSchema, // user object Customer.name , Customer.Id
  user:userSchema, // user object Customer.name , Customer.Id
  totalAmount: { type: Number, required: true }, // The total amount of the order
  orderDate: { type: Date, default: Date.now }, // Automatically set the order date
  paymentType:{
    type:String , 
    enum:['Cash' , 'Credit'], 
    required:true , 
    default:'Cash'}, // defines the payment methode كاش / اّجل
  paymentStatus: { 
    type: String, 
    enum: ['pending', 'paid'], // Enum for payment status
    required: true, 
    default: 'paid' 
  }, // Payment status: 'pending' (لم يتم الدفع) or 'paid' (تم الدفع)
  paymentDate:{type : Date , required:false },
});


// Create the Order model
const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
