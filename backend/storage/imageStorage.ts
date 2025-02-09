import multer from "multer"
import { productModel } from "../models/productModels";

export const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: async function (req, file, cb) {
    cb(null, file.originalname)
  }
})
