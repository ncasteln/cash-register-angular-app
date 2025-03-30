import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  units: [{
    name: String,
    price: Number,
    priceType: Number,
    external: Boolean,
    tax: Number,
    weight: Number,
    weightType: Number,
    quantity: Number,
    discount: Number,
    subtotal: Number
  }],
  createdAt: Date,
  updatedAt: { type: Date, required: false }
});

/* .model(schemaName, schema, nameOfTheCollection) */
export const orderModel = mongoose.model("order", orderSchema, "orders");
