const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  // _id: String,
  id: Number,
  name: String,
  price: Number,
  img: String
});

module.exports = mongoose.model("products", productSchema);
