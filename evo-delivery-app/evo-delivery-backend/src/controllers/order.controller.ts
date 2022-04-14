import { Request, Response } from 'express';

export const getOrders = async (req: Request, res: Response) => {
  return res.send('get all orders');
};

export const getOrder = async (req: Request, res: Response) => {
  return res.send('get order by id');
};

export const createOrder = async (req: Request, res: Response) => {
  return res.send('create new order');
};

export const updateOrder = async (req: Request, res: Response) => {
  return res.send('update order by id');
};

export const deleteOrder = async (req: Request, res: Response) => {
  return res.send('delete order by id');
};
