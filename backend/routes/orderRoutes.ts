import { Router } from 'express'
import {
  deleteOrder,
  getOrderById,
  getOrders,
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

/* DELETE */
ordersRouter.delete('/orders/delete/:id', deleteOrder);

/* RESET DB */
ordersRouter.delete('/orders/reset', resetOrders);

export default ordersRouter;
