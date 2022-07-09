import {Request, Response} from 'express';
import {orderService} from '../services';
import {Order} from '../types/order.type';
import {INVALID, OK} from '../utils/response.utils';

export const getOrders = async (req: Request, res: Response) => {

    try {
        const orders = await orderService.getOrders();
        return res.status(200).json(OK(orders));
    } catch (e: any) {
        return res.status(400).json(INVALID(400, e.message));
    }
};

export const getOrder = async (req: Request, res: Response) => {
    const orderId = req.params.id;

    try {
        const order = await orderService.getOrder(orderId);
        return res.status(200).json(OK({order}));
    } catch (e: any) {
        return res.status(400).json(INVALID(400, e.message));
    }
};

export const createOrder = async (req: Request, res: Response) => {
    const orderDetails: Partial<Order> = req.body;

    try {
        const order = await orderService.create(orderDetails);
        return res.status(200).json(OK({order}));
    } catch (e: any) {
        return res.status(400).json(INVALID(400, e.message));
    }
};

export const updateOrder = async (req: Request, res: Response) => {
    const orderId: string = req.params.id;
    const orderDetails: Partial<Order> = req.body;

    try {
        const order = await orderService.updateOrder(orderId, orderDetails);
        return res.status(200).json(OK({order}));
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
