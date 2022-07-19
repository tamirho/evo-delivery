import {Location, Order} from "../types";
import OrderModel from '../database/models/order.model'
import {googleMatrixClient} from "../clients";

export const getOrders = async () => {
    return OrderModel.getAll();
};

export const getOrder = async (orderId: string) => {
    return OrderModel.getById(orderId);
};

export const getByIds = async (orderIds: string[]) => {
    return OrderModel.getByIds(orderIds);
}

export const create = async (order: Partial<Order>) => {
    const fullLocation: Location = await googleMatrixClient.getFullLocation(order);
    console.dir(fullLocation);
    return OrderModel.create({...order, ...fullLocation});
};

export const updateOrder = async (orderId: string, orderDetails: Partial<Order>) => {
    return OrderModel.findOneAndUpdate({_id: orderId}, orderDetails as Order, {returnOriginal: false})
};

export const deleteOrder = async (orderId: string) => {
    return OrderModel.deleteOne({_id: orderId})
};
