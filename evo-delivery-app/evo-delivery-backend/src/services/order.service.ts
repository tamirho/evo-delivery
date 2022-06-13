import { Order } from "../types";
import orderModel from '../database/models/order.model'
import { ORDERS } from "../models/tmp-data";

export const getOrders = async (filter: Object, page: number, limit: number) => {
  return await orderModel.find({},null,{limit:limit})
};

export const getOrder = async (orderId : string) => {
  return orderModel.findById({_id:orderId}).lean()
};

export const getByIds = async (orderIds : string[]) => {
  return orderModel.find({_id:{$in:orderIds}})
}

// export const getByIds = async (orderIds: string[]) : Promise<Order[]> => {
//   return ORDERS.filter(({id}) => orderIds.find(_id => id === _id)) as Order[];
// };

export const createOrder = async (order: Partial<Order>) => {
  return await orderModel.create(order);
};

export const updateOrder = async (orderId: string, orderDetails: Partial<Order>) => {
  return await orderModel.findOneAndUpdate({_id:orderId}, orderDetails as Order, {returnOriginal: false})
};

export const deleteOrder = async (orderId: string) => {
  return await orderModel.deleteOne({_id:orderId})
};
