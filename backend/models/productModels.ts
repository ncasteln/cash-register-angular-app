import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  lastModified: String,
  lastModifiedDate: String,
  name: String,
  size: Number,
  type: String,
  webkitRelativePath: String
})

export enum AmountType {
  fixed,
  dynamic
}

const productSchema = new mongoose.Schema({
  name: String,
  price: { type: Number, required: false },
  priceType: Number,
  img: String,
  disabled: Boolean,
  external: Boolean,
  // new
  deleted: Boolean,
  deletedAt: Date,
  tax: { type: Number, required: false },
  weight: { type: Number, required: false },
  weightType: Number
});

/* .model(schemaName, schema, nameOfTheCollection) */
export const productModel = mongoose.model("product", productSchema, "products");
export const imageModel = mongoose.model("image", imageSchema, "images");
