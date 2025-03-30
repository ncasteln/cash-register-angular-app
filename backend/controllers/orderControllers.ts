import resetOrdersJson from '../resetOrders.json'
import { orderModel } from '../models/orderModels'
import { Response } from 'express';

export const getOrders = async(req: any, res: any) => {
  try {
    console.log("* Orders.GET");
    const result = await orderModel.find({});
    if (result)
      res.status(200).json(result);
    else
      res.status(400).json({ msg: "* orders not found" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: "* Internal server error" });
  }
}

export const getOrderById = async(req: any, res: any) => {
  try {
    // console.log("* Orders.GET ONE: ", req.params);
    // const id = req.params.id;
    // const order = await orderModel.findById(id);
    // console.log(order);
    // if (!order)
    //   throw Error("* order doesn't exists");
    // res.status(200).json({
    //   neworder: order,
    //   oldorder: null,
    //   msg: "* order GET BY ID successfully" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: "* Internal server error" });
  }
}

export const postOrder = async(req: any, res: any) => {
  try {
    console.log("* Orders.POST: "/* , req.params, req.body */);
    const units = req.body;

    if (!units || !Array.isArray(units)) {
      return res.status(400).json({
        msg: "* Invalid request: Units array is required"
      });
    }
    const newOrder = new orderModel({
      units,
      createdAt: new Date()
    });

    await newOrder.save();
    res.status(201).json({
      msg: "* Order created successfully",
      orderId: newOrder._id
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: "* Internal server error" });
  }
}

export const updateOrder = async(req: any, res: any) => {
  try {
    console.log("* Orders.UPDATE: ", req.params, req.body)
    // let { name, price, img, external, disabled, tax, weight, weightType, priceType } = req.body;

    // if (req.file)
    //   img = req.file.filename;

    // const neworder = await orderModel.findOneAndUpdate(
    //   { _id: req.params.id },
    //   { name,
    //     price: price === "null" ? null : price,
    //     img,
    //     external,
    //     disabled,
    //     tax: tax === "null" ? null : tax,
    //     weight: weight === "null" ? null : weight,
    //     weightType,
    //     priceType
    //   },
    //   { new: true }
    // )

    // res.status(200).json({
    //   neworder,
    //   msg: "* order UPDATED successfully"
    // });
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: "* Internal server error" });
  }
}

export const deleteOrder = async(req: any, res: any) => {
  try {
    console.log("* Orders.DELETE: ", req.params);

    const id = req.params.id;
    const order = await orderModel.findByIdAndDelete(id);
    if (!order)
      throw Error("* order doesn't exists");
    res.status(200).json({
      msg: `* ${order._id} deleted successfully`,
      oldorder: order
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: e });
  }
}

export const resetOrders = async (req: any, res: any) => {
  try {
    console.log("* RESET");
    await orderModel.deleteMany();
    await orderModel.insertMany(resetOrdersJson);
    res.status(200).json({ msg: "* Database reset success" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: "* Internal server error" });
  }
}
