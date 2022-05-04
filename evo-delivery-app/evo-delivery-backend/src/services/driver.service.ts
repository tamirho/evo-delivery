import { Driver } from '../types';
import { DRIVERS } from './tmp-data';
import driverModel, { IDriver } from '../database/models/driver.model';
import mongoose from 'mongoose';

export const getDrivers = async (query, page, limit) => {
  return driverModel.find();
};

export const getDriver = async (id: string) => {
  return driverModel.findById({_id:id})
};

export const createDriver = async (driver: Partial<Driver>) => {
  const res = (await driverModel.create(driver as IDriver)).save()
  return res;
};

export const updateDriver = async (id: string, driver: Partial<Driver>) => {
  const prevDriver = DRIVERS[parseInt(id) % 2];
  DRIVERS[parseInt(id) % 2] = { ...prevDriver, ...driver };
  return {};
};

export const deleteDriver = async (id: string) => {
  return {};
};
