const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  sealprice: { type: String, required: true },
  buyprice: { type: String, required: true },
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
  productamount:{ type: Number , required:false  }
});

module.exports = mongoose.model('Product', productSchema);
