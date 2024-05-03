const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  sellerName: {
    type: String
  },
  price: {
    type: Number,
    required: true
  },
  documentId: {
    type: String,
    required: true
  },
  wvmOption: {
    type: String,
    required: true,
    enum: ['w', 'v', 'm']
  },
  wvmId: {
    type: String,
    required: true
  },
  elementId: {
    type: String,
    required: true
  },
  image: {
    data: String,
    name: String,
    extension: String
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  softDelete: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: false
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
