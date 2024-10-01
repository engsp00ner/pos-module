const mongoose = require('mongoose');

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

module.exports = mongoose.model('customer', customerSchema );
