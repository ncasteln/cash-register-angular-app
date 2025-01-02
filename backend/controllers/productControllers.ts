const { nameValidation } = require('../middleware/productMiddleware');

// const Product = require('../models/productModels');
// const fs = require('fs').promises;
// const resetFile = require('../reset.json');

// import { fstat } from 'fs';
import { productModel } from '../models/productModels'
// import resetFile from '../reset.json'

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
    const { name, price, img, description, external } = req.body;
    const newProduct = new productModel({ name: name.toLowerCase(), price, img, description, external });
    await newProduct.save();
    console.log(newProduct)
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
    const { name: newName, price, img, description } = req.body;

    const result = await productModel.findOneAndUpdate(
      { name: oldName },
      { name: newName, price, img, description },
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
    console.log("* productControllers: DISABLE ");
    const product = await productModel.findOne({ name: req.params.name })
    if (!product)
      throw Error("* Product doesn't exists");
    product.disabled = !product.disabled;
    await product.save();
    /*
    Make reflecting the json returned with the interface of response in the frontend
    otherwise they could be different results!npm run
    */
    res.status(200).json({
      newProduct: product,
      msg: `* Product ${product.disabled ? 'DISABLED' : 'ENABLED'} successfully`
    })
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: "* Internal server error" });
  }
}

export const deleteProducts = async(req : any, res: any) => {
  try {
    console.log("* DELETE params: ", req.params);
    const isFound = await productModel.findOneAndDelete({ name: req.params.name });
    if (!isFound)
      throw Error("* Product doesn't exists");
    res.status(200).json({ msg: "* Product DELETED successfully" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: "* Internal server error" });
  }
}

export const resetProducts = async (req : any, res: any) => {
  // try {
  //   console.log("* RESET");
  //   await productModel.deleteMany();
  //   await productModel.insertMany(resetFile);
  //   res.status(200).json({ msg: "* Database reset success" });
  // } catch (e) {
  //   console.error(e);
  //   res.status(500).json({ msg: "* Internal server error" });
  // }
}
