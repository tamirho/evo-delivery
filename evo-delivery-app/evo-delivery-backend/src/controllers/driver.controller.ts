import { Request, Response, NextFunction } from 'express';
import { IDriver } from '../database/models/driver.model';
import { driverService } from '../services';
import { Driver } from '../types';
import { INVALID, OK } from '../utils/response.utils';

export const getDrivers = async (req: Request, res: Response) => {
  const page = req.params.page || 1;
  const limit = req.params.limit || 10;

  try {
    const drivers = await driverService.getDrivers({}, page, limit);
    console.log("gert");
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
  const driverDetails :IDriver = req.body;
  console.log(driverDetails)

  try {
    const driver = await driverService.createDriver(driverDetails);
    return res.status(200).json(OK({ driver }));
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
