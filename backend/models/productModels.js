const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  img: String,
  alt: String,
  disabled: Boolean,
  external: Boolean
});

/* .model(schemaName, schema, nameOfTheCollection) */
module.exports = mongoose.model("product", productSchema, "products");
