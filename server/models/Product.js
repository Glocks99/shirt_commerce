const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
      type: String,
      required: true,
  },
  richDescription: {
      type: String,
      default: '',
      required: false,
  },
  image: {
    type: String,
    default: '',
    trim: true
  },
  images: [{
    type: String,
    required: false,
    default: '',
  }],
  brand: {
      type: String,
      required: true,
      default: 'N/B'
  },
  category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true
  },
  priceCents: {
      type: Number,
      required: true,
      default: 0
  },
  isFeatured: {
      type: Boolean,
      default: false,
  },
  discount: {
    type: Boolean,
    default: false
  },
  discountPercentage: {
    type: Number,
    default: 0
  }
}, {timestamps: true});


const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

module.exports = Product;