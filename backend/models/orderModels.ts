import mongoose from "mongoose";
import { AmountType, Category, MeasureType } from "./productModels";

const orderSchema = new mongoose.Schema({
  units: [{
    name: String,
    price: Number,
    external: Boolean,
    tax: Number,
    weight: Number,
    quantity: Number,
    discount: Number,
    subtotal: Number,
    priceType: { type: String, enum: AmountType },
    weightType: { type: String, enum: AmountType },
    measureType: { type: String, enum: MeasureType },
    category: { type: String, enum: Category },
    marked: Boolean
  }],
  createdAt: Date,
  updatedAt: { type: Date, required: false },
  marked: Boolean
});

/* .model(schemaName, schema, nameOfTheCollection) */
export const orderModel = mongoose.model("order", orderSchema, "orders");
