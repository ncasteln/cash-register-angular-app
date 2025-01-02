import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  img: String,
  description: String,
  disabled: Boolean,
  external: Boolean
});

/* .model(schemaName, schema, nameOfTheCollection) */
export const productModel = mongoose.model("product", productSchema, "products");
