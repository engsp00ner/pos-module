const mongoose = require('mongoose');

const categorySchema  = new mongoose.Schema({

    type: {
      type: String,
      required: true,
    },
    displayName: {
      type: String,
      required: true,
    },
    CategoryImage: {
      type: String,
      required: true,
    },
  
  
});

module.exports = mongoose.model('category', categorySchema );
