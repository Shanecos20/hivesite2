const mongoose = require('mongoose');

const PreorderSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  signup_date: {
    type: Date,
    default: Date.now
  },
  notified: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Preorder', PreorderSchema); 