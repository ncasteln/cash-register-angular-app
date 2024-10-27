const Product = require('../models/productModels');
// const fs = require('fs');

const errLogger = ( res, msg ) => {
  console.error("* Error: validation:", msg);
  return (res.status(400).json({ msg }));
}

exports.nameValidation = async(req, res, next) => {
  console.log("[ VALIDATION ]");

  let { name } = req.body;

  /* Trim whitespaces */
  name = name.trim();

  /* Valid name and price */
  if (!name)
    return (errLogger(res,'name is null'));

  /* Question mark, other chars, numbers */
  if (/[^\w\s]/.test(name))
    return (errLogger(res,'only alpha char allowed'));

  /* String only whitespace */
  if (name.trim().length === 0)
    return (errLogger(res,'no empty string allowed'));

  /* Duplicate name */
  const lowerName = name.toLowerCase();
  const isDuplicate = await Product.findOne({ name: lowerName });
  if (isDuplicate)
    return (errLogger(res,'duplicate name'));

  next();
}

exports.priceValidation = async(req, res, next) => {
  const { price } = req.body;

  /* Only numbers and dot */

  /* No negative */

  if (!price)
    return (errLogger(res,'price is null'));
  next();
}

exports.imgValidation = async(req, res, next) => {
  console.log("----[ IMG and ALT ]----");
  /* Default img path */
  if (!req.body.img)
    req.body.img = 'assets/img-not-found.png';

  /* Check file exist/permission */
  console.log("* FILE: ");
  // fs.open(`../../public/${req.body.img}`, 'r', (err, fd) => {
  //   console.log(fd)
  // });


  // /* Alt creation */
  // if (!img)
  //   req.body.alt = 'Image not found';
  // else
  //   req.body.alt = 'Vegetable image'; // need to customize

  next();
}
