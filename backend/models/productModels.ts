import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  lastModified: String,
  lastModifiedDate: String,
  name: String,
  size: Number,
  type: String,
  webkitRelativePath: String
})

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  img: String,
  disabled: Boolean,
  external: Boolean
});

/* .model(schemaName, schema, nameOfTheCollection) */
export const productModel = mongoose.model("product", productSchema, "products");
export const imageModel = mongoose.model("image", imageSchema, "images");
