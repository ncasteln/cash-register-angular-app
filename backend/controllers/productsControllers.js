const Product = require('../models/productsModels');

exports.getProducts = async(req, res) => {
  try {
    const result = await Product.find({});

    if (result)
      res.status(200).json(result);
    else
      res.status(400).json({ msg: "* Product not found" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: "* Internal server error" });
  }
}

exports.postProducts = async(req, res) => {
  try {

    console.log(req.body);

    /* WORKS FINE WITH MOCK!!! */

    // const { id, name, price, img } = req.body;
    // const newProduct = new Product({
    //   id,
    //   name,
    //   price,
    //   img
    // }); /*  Created at ??? */
    // await newProduct.save();
    res.status(201).json({ msg: "* Product added successfully"});
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: "* Internal server error" });
  }
}
