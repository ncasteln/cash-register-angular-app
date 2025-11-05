import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

/* .model(schemaName, schema, nameOfTheCollection) */
export const userModel = mongoose.model("user", userSchema, "users");
