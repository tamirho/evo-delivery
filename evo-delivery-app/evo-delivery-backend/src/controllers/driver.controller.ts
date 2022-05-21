import { Request, Response, NextFunction } from 'express';
import { driverService } from '../services';
import { Driver } from '../types';
import { INVALID, OK } from '../utils/response.utils';

export const getDrivers = async (req: Request, res: Response) => {
  const page : number= Number(req.query.page as string) || 1;
  const limit : number= Number(req.query.limit as string) || 100;
  const filter: Object = req.query.filter as Object|| {}
  try {
    const drivers = await driverService.getDrivers(filter, page, limit);
    return res.status(200).json(OK(drivers));
  } catch (e: any) {
    return res.status(400).json(INVALID(400, e.message));
  }
};

export const getDriver = async (req: Request, res: Response) => {
  const driverId = req.params.id;

  try {
    const driver = await driverService.getDriver(driverId);
    return res.status(200).json(OK({ driver }));
  } catch (e: any) {
    return res.status(400).json(INVALID(400, e.message));
  }
};

export const createDriver = async (req: Request, res: Response) => {
  const driverDetails :Partial<Driver> = req.body.driver;

  try {
    const driverId = req.params.id;
    const driver = await driverService.createDriver(driverDetails);
    return res.status(200).json(OK(driver ));
  } catch (e: any) {
    return res.status(400).json(INVALID(400, e.message));
  }
};

export const updateDriver = async (req: Request, res: Response) => {
  const driverId: string = req.params.id;
  const driverDetails: Partial<Driver> = req.body.driver;

  try {
    const driver = await driverService.updateDriver(driverId, driverDetails);
    return res.status(200).json(OK({ driver }));
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
