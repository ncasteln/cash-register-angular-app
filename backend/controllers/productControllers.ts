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
    console.log("* Products.GET");
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
    console.log("* Products.GET: ", req.params);
    const id = req.params.id;
    const product = await productModel.findById(id);
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

export const postProducts = async(req: any, res: any) => {
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

export const updateProducts = async(req: any, res: any) => {
  try {
    console.log("* Products.UPDATE: ", req.params);

    const id = req.params.id;
    const isFound = await productModel.findById(id);
    console.log(isFound)
    if (!isFound)
      throw Error("* Product doesn't exists");

    /* Updates */
    const { name: newName, price, img, external, disabled } = req.body;

    const result = await productModel.findOneAndUpdate(
      { _id: id },
      { name: newName, price, img, external, disabled, },
      { new: true }
    )
    res.status(200).json({ msg: "* Product UPDATED successfully" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: "* Internal server error" });
  }
}

export const disableProduct = async (req: any, res: any) => {
  try {
    console.log("* Products.DISABLE: ", req.params);
    const id = req.params.id;
    const product = await productModel.findById(id)
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


export const uploadProductImage = async (req: any, res: any) => {
  try {
    console.log("* Products.UPLOAD params: ", req.params);
    console.log("* Products.UPLOAD body: ", req.body);
    console.log("* Products.UPLOAD files: ", req.files);
    console.log("* Products.UPLOAD up_image: ", req.upload_image);


    // const id = req.params.id;
    // const product = await productModel.findById(id)
    // if (!product)
    //   throw Error("* Product doesn't exists");
    // product.disabled = !product.disabled;
    // await product.save();
    res.status(200).json({
      // msg: `* ${product.name} ${product.disabled ? 'disabled' : 'enabled'} successfully`,
      // newProduct: product
    })
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: e });
  }
}

export const deleteProducts = async(req: any, res: any) => {
  try {
    console.log("* Products.DELETE: ", req.params);

    const id = req.params.id;
    const product = await productModel.findByIdAndDelete(id);
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

export const resetProducts = async (req: any, res: any) => {
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
