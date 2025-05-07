import resetJson from '../resetProducts.json'
import { Category, productModel } from '../models/productModels'
import { Response } from 'express';

export const getProducts = async(req: any, res: any) => {
  try {
    console.log("* Products.GET");
    const products = await productModel.find({});
    if (products)
      res.status(200).json(products);
    else
      res.status(400).json({ msg: "* Products not found" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: "* Internal server error" });
  }
}

export const getImage = async(req: any, res: Response) => {
  try {
    console.log("* Products.GET");
    const result = await productModel.findOne({ img: req.params.id });
    if (!result)
      throw Error("not found")
    const options = { root: './' }
    res.sendFile('uploads/' + result.img, options)
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
    console.log("* Products.POST: ", req.params, req.body);
    let { name, price, img, external, disabled, tax, weight, priceType, weightType, measureType, category } = req.body;

    if (req.file)
      img = req.file.filename;

    const newProduct = new productModel({
      name,
      price: price === "null" ? null : price,
      img,
      external,
      disabled,
      tax: tax === "null" ? null : tax,
      weight: weight === "null" ? null : weight,
      weightType,
      measureType,
      priceType,
      category
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
    console.log("* Products.UPDATE: ", req.params, req.body)
    let { name, price, img, external, disabled, tax, weight, weightType, priceType, measureType, category } = req.body;

    if (req.file)
      img = req.file.filename;

    const newProduct = await productModel.findOneAndUpdate(
      { _id: req.params.id },
      { name,
        price: price === "null" ? null : price,
        img,
        external,
        disabled,
        tax: tax === "null" ? null : tax,
        weight: weight === "null" ? null : weight,
        weightType,
        priceType,
        measureType,
        category
      },
      { new: true }
    )

    res.status(200).json({
      newProduct,
      msg: "* Product UPDATED successfully"
    });
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

export const deleteProducts = async(req: any, res: any) => {
  try {
    console.log("* Products.DELETE: ", req.params);

    const id = req.params.id;
    const product = await productModel.findById(id);
    if (!product)
      throw Error("* Product doesn't exists");
    product.deleted = true;
    product.deletedAt = new Date();
    await product.save();
    res.status(200).json({
      msg: `* ${product.name} deleted successfully`,
      oldProduct: product
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: e });
  }
}

export const restoreProducts = async(req: any, res: any) => {
  try {
    console.log("* Products.RESTORE: ", req.params);

    const id = req.params.id;
    const deletedProduct = await productModel.findOne({
      _id: id,
      deleted: true,
      deletedAt: { $ne: null }
    });
    if (!deletedProduct)
      throw Error("* Product doesn't exists");
    deletedProduct.deleted = false;
    await deletedProduct.save();
    res.status(200).json({
      msg: `* ${deletedProduct.name} restored successfully`,
      oldProduct: deletedProduct
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
