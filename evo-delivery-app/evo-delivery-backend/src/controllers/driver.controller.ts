import { Request, Response, NextFunction } from 'express';
import { driverService } from '../services';

// Example for controller
export const getDrivers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const page = req.params.page || 1;
  const limit = req.params.limit || 10;

  try {
    const drivers = await driverService.getDrivers({}, page, limit);
    return res.status(200).json({
      status: 200,
      data: drivers,
      message: 'Successfully Drivers Retrieved',
    });
  } catch (e: any) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

export const getDriver = async (req: Request, res: Response) => {
  return res.send('get driver by id');
};

export const createDriver = async (req: Request, res: Response) => {
  return res.send('create new driver');
};

export const updateDriver = async (req: Request, res: Response) => {
  return res.send('update driver by id');
};

export const deleteDriver = async (req: Request, res: Response) => {
  return res.send('delete driver by id');
};
