import {Request, Response, NextFunction} from 'express';
import {driverService} from '../services';
import {Driver, EaEvaluateConfig} from '../types';
import {INVALID, OK} from '../utils/response.utils';
import {DraftDataApiRequest} from "./draft.controller";

export type DriverApiRequest = {
    name: string;
    maxCapacity: number;
    maxDistance: number;
}

export const getDrivers = async (req: Request, res: Response) => {
    try {
        const drivers = await driverService.getDrivers();
        return res.status(200).json(OK(drivers));
    } catch (e: any) {
        return res.status(400).json(INVALID(400, e.message));
    }
};

export const getDriver = async (req: Request, res: Response) => {
    const driverId = req.params.id;

    try {
        const driver = await driverService.getDriver(driverId);
        return res.status(200).json(OK({driver}));
    } catch (e: any) {
        return res.status(400).json(INVALID(400, e.message));
    }
};

export const createDriver = async (req: Request, res: Response) => {
    const driverDetails: DriverApiRequest = req.body;

    try {
        const driver = await driverService.createDriver(driverDetails);
        return res.status(200).json(OK(driver));
    } catch (e: any) {
        return res.status(400).json(INVALID(400, e.message));
    }
};

export const updateDriver = async (req: Request, res: Response) => {
    const driverId: string = req.params.id;
    const driverDetails: Partial<DriverApiRequest> = req.body;

    try {
        const driver = await driverService.updateDriver(driverId, driverDetails);
        return res.status(200).json(OK({driver}));
    } catch (e: any) {
        return res.status(400).json(INVALID(400, e.message));
    }
};

export const deleteDriver = async (req: Request, res: Response) => {
    const driverId = req.params.id;

    try {
        await driverService.deleteDriver(driverId);
        return res.status(200).json(OK());
    } catch (e: any) {
        return res.status(400).json(INVALID(400, e.message));
    }
};
