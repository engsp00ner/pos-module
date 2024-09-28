const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  price: { type: String, required: true },
  image: { type: String, required: true },
  category: {
    type: {
      type: String,
      required: true,
    },
    displayName: {
      type: String,
      required: true,
    },
    categoryImage: {
      type: String,
      required: true,
    },
  },
  productamount:{ type: String , required:false  }
});

module.exports = mongoose.model('Product', productSchema);
