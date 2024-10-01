const mongoose = require('mongoose');

const   userSchema  = new mongoose.Schema({
   
    id: {
        type: String,
        required: true,
        unique: true, // Enforce unique constraint
      },
    name: {
      type: String,
      required: true,
      unique: true, // Enforce unique constraint
    },
    password: {
        type: String,
        required: true,
      },
      displayname: {
        type: String,
        required: true,
      },
      usertype: {
        type: String,
        required: true,
      },
  
  
});

module.exports = mongoose.model('user', userSchema );
