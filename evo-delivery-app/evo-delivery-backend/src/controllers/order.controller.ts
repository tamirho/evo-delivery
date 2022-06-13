import { Request, Response } from 'express';
import { orderService } from '../services';
import { Order } from '../types/order.type';
import { INVALID, OK } from '../utils/response.utils';

export const getOrders = async (req: Request, res: Response) => {
  const page : number= Number(req.query.page as string) || 1;
  const limit : number= Number(req.query.limit as string) || 100;
  const filter: Object = req.query.filter as Object || {}

  try {
    const orders = await orderService.getOrders(filter, page, limit);
    return res.status(200).json(OK(orders));
  } catch (e: any) {
    return res.status(400).json(INVALID(400, e.message));
  }
};

export const getOrder = async (req: Request, res: Response) => {
  const orderId = req.params.id;

  try {
    const order = await orderService.getOrder(orderId);
    return res.status(200).json(OK({ order }));
  } catch (e: any) {
    return res.status(400).json(INVALID(400, e.message));
  }
};

export const createOrder = async (req: Request, res: Response) => {
  const orderDetails : Partial<Order> = req.body.order;

  try {
    const order = await orderService.createOrder(orderDetails);
    return res.status(200).json(OK({ order }));
  } catch (e: any) {
    return res.status(400).json(INVALID(400, e.message));
  }
};

export const updateOrder = async (req: Request, res: Response) => {
  const orderId: string = req.params.id;
  const orderDetails: Partial<Order> = req.body.order;

  try {
    const order = await orderService.updateOrder(orderId, orderDetails);
    return res.status(200).json(OK({ order }));
  } catch (e: any) {
    return res.status(400).json(INVALID(400, e.message));
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  const orderId = req.params.id;

  try {
    await orderService.deleteOrder(orderId);
    return res.status(200).json(OK());
  } catch (e: any) {
    return res.status(400).json(INVALID(400, e.message));
  }
};
