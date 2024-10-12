const Product = require('../models/productsModels');

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
    const { id, name, price, img } = req.body;
    const newProduct = new Product({
      id,
      name,
      price,
      img
    });
    /*
      Where is the place in which put the logic
      to deny duplicates?
    */

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
    console.log("* UPDATE: ", req.body);
    // const { id, name, price, img } = req.body;
    // const productToUpdate = await Product.findByIdAndUpdate(
    //   {_id: id},
    //   { $set: { name: name }},
    //   { new: true } );
    // res.status(200).json({ msg: "* Product UPDATED successfully", productToUpdate});
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: "* Internal server error" });
  }
}

exports.deleteProducts = async(req, res) => {
  try {
    console.log("* DELETE: ", req.params, "ID: ", req.params.id);
    // const { id } = req.params; // id ?
    // const result = await Product.findByIdAndDelete({ _id: id });
    // res.status(200).json({ msg: "* Product DELETED successfully", result});
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: "* Internal server error" });
  }
}
