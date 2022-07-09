import { Driver } from '../types';
import driverModel from '../database/models/driver.model';

export const getDrivers = async (filter: Object, page:number, limit:number) => {
  return driverModel.find({},null,{limit:limit}).lean();
};

export const getDriver = async (driverId: string): Promise<Driver> => {
  return driverModel.findById({_id:driverId}).lean()
};

export const getByIds = async (driverIds : string[])=> {
  return driverModel.find({_id: { $in: driverIds } })
}

// export const getByIds = async (driversIds: string[]) => {
//   return DRIVERS.filter(({_id}) => driversIds.find(id => id === _id)) as Driver[];
// };

export const createDriver = async (driver: Partial<Driver>) => {
  return (await driverModel.create(driver)).save()
};

export const updateDriver = async (driverId: string, driver: Partial<Driver>) => {
  return await driverModel.findOneAndUpdate({_id:driverId}, driver, {returnOriginal: false})
};

export const deleteDriver = async (id: string) => {
  return await driverModel.deleteOne({_id:id})
};
