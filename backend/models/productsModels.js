const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  img: String
});

module.exports = mongoose.model("products", productSchema);
