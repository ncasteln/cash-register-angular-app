const Product = require('../models/productsModels');

/* SANITIZE
  - No question marks
  - No empty strings
  - No duplicates
*/

exports.getProducts = async(req, res) => {
  try {
    console.log("* GET ALL");
    const result = await Product.find({});
    if (result)
      res.status(200).json(result);
    else
      res.status(400).json({ msg: "* Products not found" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: "* Internal server error" });
  }
}

exports.postProducts = async(req, res) => {
  try {
    console.log("* POST:", res.body);
    const { name, price, img } = req.body;
    const newProduct = new Product({ name, price, img });

    /* Ensure no duplicates */
    const isDuplicate = await Product.findOne({ name });
    console.log(isDuplicate)
    if (isDuplicate)
      throw Error("* No duplicates allowed");

    const result = await newProduct.save();
    /*
      How check if the post
      operation was succesful?
    */
    res.status(201).json({ msg: "* Product ADDED successfully"});
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
    const { name: newName, price, img } = req.body;

    /* Ensure no duplicates */
    const isDuplicate = await Product.findOne({ name: newName });
    if (isDuplicate)
      throw Error("* No duplicates allowed");

    /* Ensure no white fields: maybe do it in the frontend??? */

    const result = await Product.findOneAndUpdate(
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

exports.getProductById = async(req, res) => {

}
