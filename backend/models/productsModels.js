const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  img: String,
  alt: String
});

module.exports = mongoose.model("products", productSchema);
