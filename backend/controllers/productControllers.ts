// const { nameValidation } = require('../middleware/productMiddleware');

// const Product = require('../models/productModels');
// const fs = require('fs').promises;
import resetJson from '../reset.json'
import { promises as fs } from 'fs';
import path, { dirname } from 'path';
import { productModel } from '../models/productModels'

/* SANITIZE
  - No question marks
  - No empty strings
  - No duplicates
*/

export const getProducts = async(req: any, res: any) => {
  try {
    console.log("* productControllers: GET ALL");
    const result = await productModel.find({});
    if (result) {
      res.status(200).json(result);
    }
    else
      res.status(400).json({ msg: "* Products not found" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: "* Internal server error" });
  }
}

export const getProductById = async(req: any, res: any) => {
  try {
    console.log("* productControllers: GET BY ID");
    const id = req.params.id;
    const product = await productModel.findOne({ _id: id });
    console.log(product);
    if (!product)
      throw Error("* Product doesn't exists");
    res.status(200).json({
      newProduct: product,
      oldProduct: null,
      msg: "* Product GET BY ID successfully" });
    }
  catch (e) {
    console.error(e);
    res.status(500).json({ msg: "* Internal server error" });
  }
}

export const postProducts = async(req : any, res: any) => {
  try {
    console.log("* Products.POST: ", req.params);
    const { name, price, external, disabled } = req.body;
    const newProduct = new productModel({
      name,
      price,
      img: '',
      external,
      disabled
    });
    await newProduct.save();
    res.status(201).json({ msg: "* Product CREATED successfully"});
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: "* Internal server error" });
  }
}

export const updateProducts = async(req : any, res: any) => {
  try {
    console.log("* UPDATE params: ", req.params);
    const oldName = req.params.name;
    const isFound = await productModel.findOne({ name: oldName });
    if (!isFound)
      throw Error("* Product doesn't exists");

    /* Updates */
    const { name: newName, price, img } = req.body;

    const result = await productModel.findOneAndUpdate(
      { name: oldName },
      { name: newName, price, img },
      { new: true }
    )
    res.status(200).json({ msg: "* Product UPDATED successfully" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: "* Internal server error" });
  }
}

export const disableProduct = async (req : any, res: any) => {
  try {
    console.log("* DISABLE: ", req.params.name);
    const product = await productModel.findOne({ name: req.params.name })
    if (!product)
      throw Error("* Product doesn't exists");
    product.disabled = !product.disabled;
    await product.save();
    res.status(200).json({
      msg: `* ${product.name} ${product.disabled ? 'disabled' : 'enabled'} successfully`,
      newProduct: product
    })
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: e });
  }
}

export const deleteProducts = async(req : any, res: any) => {
  try {
    console.log("* DELETE: ", req.params.name);
    const product = await productModel.findOneAndDelete({ name: req.params.name });
    if (!product)
      throw Error("* Product doesn't exists");
    res.status(200).json({
      msg: `* ${product.name} deleted successfully`,
      oldProduct: product
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: e });
  }
}

export const resetProducts = async (req : any, res: any) => {
  try {
    console.log("* RESET");
    await productModel.deleteMany();
    await productModel.insertMany(resetJson);
    res.status(200).json({ msg: "* Database reset success" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: "* Internal server error" });
  }
}
