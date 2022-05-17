import {ORDERS} from "../models/tmp-data";
import {Order} from "../types";

export const getByIds = async (orderIds: string[]) : Promise<Order[]> => {
    return ORDERS.filter(({id}) => orderIds.find(_id => id === _id)) as Order[];
};

export const getOrders = async () => {
    return {};
};

export const getOrder = async () => {
    return {};
};

