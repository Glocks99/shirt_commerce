const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  }

});

const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);

module.exports = Category;