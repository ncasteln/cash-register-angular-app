import multer from "multer"
import { productModel } from "../models/productModels";

export const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: async function (req, file, cb) {
    const product = await productModel.findOne({ _id: req.params.id })
    if (!product)
      throw Error("Product not found")
    const ext = file.originalname.slice(file.originalname.lastIndexOf('.'));
    cb(null, product.name + ext)
  }
})
