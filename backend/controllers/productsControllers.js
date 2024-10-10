const Products = require('../modals/products');

exports.getProducts = async(req, res) => {
  try {
    const result = await Products.find({});

    if (result)
      res.status(200).json(result);
    else
      res.status(400).json({ msg: "* Product not found" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: "* Internal server error" });
  }
}
