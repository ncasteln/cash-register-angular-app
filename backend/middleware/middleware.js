const Product = require('../models/productsModels');

const errLogger = ( msg ) => {
  console.error(msg);
  return (res.status(400).json({ msg }));
}

exports.nameValidation = async(req, res, next) => {
  let msg = "success";
  const { name, price, img } = req.body;

  /* Valid name and price */
  if (!name || !price)
    return (errLogger('name or price is null'));

  /* Question mark, other chars, numbers */

  /* String only whitespace */


  /* Duplicate name */
  const isDuplicate = await Product.findOne({ name });
  if (isDuplicate)
    return (errLogger('duplicate name'));

  console.log("* Validation success");
  next();
}

exports.priceValidation = async(req, res, next) => {

  next();
}

exports.imgValidation = async(req, res, next) => {
  /* Default img path */
  if (!img)
    req.body.img = '../../public/assets/img-not-found.png';
  else {
    /* Right permissions to open? */
  }

  next();
}
