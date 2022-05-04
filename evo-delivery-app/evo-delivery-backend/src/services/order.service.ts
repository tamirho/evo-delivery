import { Order } from '../types';

export const getOrders = async (query, page: number, limit: number) => {
  return [] as Order[];
};

export const getOrder = async (id: string) => {
  return {} as Order;
};

export const createOrder = async (order: Partial<Order>) => {
  return {} as Order;
};

export const updateOrder = async (id: string, order: Partial<Order>) => {
  return {} as Order;
};

export const deleteOrder = async (id: string) => {
  return {};
};
