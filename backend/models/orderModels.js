const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  name: String,
  // price: Number,
  // img: String,
  // alt: String
});

module.exports = mongoose.model("order", orderSchema, "orders");
