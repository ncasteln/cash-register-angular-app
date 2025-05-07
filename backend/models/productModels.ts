import mongoose from "mongoose";

export enum Category {
  'vegetable',
  'animal',
  'baked',
  'other'
}

export enum AmountType {
  fixed = 'fixed',
  dynamic = 'dynamic'
}
export enum MeasureType {
  kg = 'kg',
  unit = 'unit'
}


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
  price: { type: Number, required: false },
  img: String,
  disabled: Boolean,
  external: Boolean,
  // new
  deleted: Boolean,
  deletedAt: Date,
  tax: { type: Number, required: false },
  weight: { type: Number, required: false },
  priceType: { type: String, enum: AmountType },
  weightType: { type: String, enum: AmountType },
  measureType: { type: String, enum: MeasureType },
  category: { type: String, enum: Category }
});

/* .model(schemaName, schema, nameOfTheCollection) */
export const productModel = mongoose.model("product", productSchema, "products");
export const imageModel = mongoose.model("image", imageSchema, "images");
