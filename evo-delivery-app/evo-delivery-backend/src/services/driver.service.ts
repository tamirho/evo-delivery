import { Driver } from '../types';
import { DRIVERS } from './tmp-data';

export const getDrivers = async (query, page, limit) => {
  return DRIVERS as Driver[];
};

export const getDriver = async (id: string) => {
  return DRIVERS[parseInt(id) % 2] as Driver;
};

export const createDriver = async (driver: Driver) => {
  return DRIVERS.push(driver);
};

export const updateDriver = async (id: string, driver: Partial<Driver>) => {
  const prevDriver = DRIVERS[parseInt(id) % 2];
  DRIVERS[parseInt(id) % 2] = { ...prevDriver, ...driver };
  return {};
};

export const deleteDriver = async (id: string) => {
  return {};
};
