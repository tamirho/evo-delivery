import {Request, Response} from 'express';
import {routeService} from "../services";
import {EaEvaluateConfig} from "../types";
import {INVALID, OK} from "../utils";

export type RouteEvaluateRequestData = {
    drivers: string[],
    orders: string[],
    depot: string
}

export type RouteEvaluateRequest = {
    data: RouteEvaluateRequestData,
    config: EaEvaluateConfig
}

export const evaluateRoute = async (req: Request, res: Response) => {
  try {
    const {data: {drivers, orders, depot}, config}: RouteEvaluateRequest = req.body
    const routes = await routeService.evaluate(drivers, orders, depot, config);

    return res.status(200).json(OK(routes));
  } catch (e: any) {
    return res.status(400).json(INVALID(400, e.message));
  }
};

export const getRoutes = async (req: Request, res: Response) => {
    return res.send('get all routes');
};

export const getRoute = async (req: Request, res: Response) => {
    return res.send('get route by id');
};

export const deleteRoute = async (req: Request, res: Response) => {
    return res.send('delete route by id');
};

