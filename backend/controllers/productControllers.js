const { nameValidation } = require('../middleware/productMiddleware');
const Product = require('../models/productModels');
const fs = require('fs').promises;
const resetFile = require('../reset.json');

/* SANITIZE
  - No question marks
  - No empty strings
  - No duplicates
*/

exports.getProducts = async(req, res) => {
  try {
    console.log("* productControllers: GET ALL");
    const result = await Product.find({});
    if (result) {
      console.log(result[0])
      res.status(200).json(result);
    }
    else
      res.status(400).json({ msg: "* Products not found" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: "* Internal server error" });
  }
}

exports.postProducts = async(req, res) => {
  try {
    const { name, price, img, alt, external } = req.body;
    const newProduct = new Product({ name: name.toLowerCase(), price, img, alt, external });
    await newProduct.save();
    console.log(newProduct)
    res.status(201).json({ msg: "* Product CREATED successfully"});
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: "* Internal server error" });
  }
}

exports.updateProducts = async(req, res) => {
  try {
    console.log("* UPDATE params: ", req.params);
    const oldName = req.params.name;
    const isFound = await Product.findOne({ name: oldName });
    if (!isFound)
      throw Error("* Product doesn't exists");

    /* Updates */
    const { name: newName, price, img, alt } = req.body;

    const result = await Product.findOneAndUpdate(
      { name: oldName },
      { name: newName, price, img, alt },
      { new: true }
    )
    res.status(200).json({ msg: "* Product UPDATED successfully" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: "* Internal server error" });
  }
}

exports.disableProduct = async (req, res) => {
  try {
    console.log("* productControllers: DISABLE ");
    const product = await Product.findOne({ name: req.params.name })
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

exports.deleteProducts = async(req, res) => {
  try {
    console.log("* DELETE params: ", req.params);
    const isFound = await Product.findOneAndDelete({ name: req.params.name });
    if (!isFound)
      throw Error("* Product doesn't exists");
    res.status(200).json({ msg: "* Product DELETED successfully" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: "* Internal server error" });
  }
}

// exports.getProductById = async(req, res) => {

// }

exports.resetProducts = async (req, res) => {
  try {
    console.log("* RESET");
    await Product.deleteMany();
    await Product.insertMany(resetFile);
    res.status(200).json({ msg: "* Database reset success" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: "* Internal server error" });
  }
}
