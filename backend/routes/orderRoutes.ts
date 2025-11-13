import { Router } from 'express'
import {
  deleteOrder,
  getOrderById,
  getOrders,
  markOrder,
  markUnit,
  postOrder,
  resetOrders,
  updateOrder } from '../controllers/orderControllers';

const ordersRouter = Router();

/* GET */
ordersRouter.get('/orders', getOrders);
ordersRouter.get('/orders/:id', getOrderById);

/* POST */
ordersRouter.post('/orders/create', postOrder);

/* UPDATE */
ordersRouter.put('/orders/update/:id', updateOrder);
ordersRouter.put('/orders/update/markOrder/:id', markOrder);
ordersRouter.put('/orders/update/markUnit/:id/:unitIndex', markUnit);

/* DELETE */
// http:localhost:5000/api/orders/delete/
ordersRouter.delete('/orders/delete/:id', deleteOrder);

/* RESET DB */
ordersRouter.delete('/orders/reset', resetOrders);

export default ordersRouter;
