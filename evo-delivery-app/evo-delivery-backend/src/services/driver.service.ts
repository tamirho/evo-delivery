import { Driver } from '../types';
import { DRIVERS } from '../models/tmp-data';


export const getByIds = async (driversIds: string[]) => {
  return DRIVERS.filter(({id}) => driversIds.find(_id => id === _id)) as Driver[];
};

export const getById = async (driverId: string) => {
  return DRIVERS.find(id => id === driverId) as Driver;
};

export const get = async (query, page, limit) => {
  return DRIVERS.map(query) as Driver[];
};

// export const createDriver = async (driver: Partial<Driver>) => {
//   return DRIVERS.push(driver);
// };
//
// export const updateDriver = async (id: string, driver: Partial<Driver>) => {
//   const prevDriver = DRIVERS[parseInt(id) % 2];
//   DRIVERS[parseInt(id) % 2] = { ...prevDriver, ...driver };
//   return {};
// };
//
// export const deleteDriver = async (id: string) => {
//   return {};
// };
