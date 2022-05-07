import { Order } from "../types";
import orderModel, { IOrder } from '../database/models/order.model'


export const getOrders = async (filter: Object, page: number, limit: number) => {
  return await orderModel.find({},null,{limit:limit})
};

export const getOrder = async (orderId : string) => {
  return await orderModel.findById({_id:orderId})
};

export const createOrder = async (order: Partial<Order>) => {
  return await orderModel.create(order);
};

export const updateOrder = async (orderId: string, orderDetails: Partial<Order>) => {
  return await orderModel.findOneAndUpdate({_id:orderId}, orderDetails as IOrder, {returnOriginal: false})
};

export const deleteOrder = async (orderId: string) => {
  return await orderModel.deleteOne({_id:orderId})
};
