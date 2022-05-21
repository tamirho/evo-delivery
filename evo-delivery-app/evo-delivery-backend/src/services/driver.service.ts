import { Driver } from '../types';
import driverModel, { IDriver } from '../database/models/driver.model';

export const getDrivers = async (filter: Object, page:number, limit:number) => {
  return driverModel.find({},null,{limit:limit});
};

export const getDriver = async (driverId: string) => {
  return driverModel.findById({_id:driverId})
};

export const getByIds = (driverIds : string[]) => {
  return driverIds.map(id => getDriver(id)) as unknown as Driver[]
}

export const createDriver = async (driver: Partial<Driver>) => {
  return (await driverModel.create(driver as IDriver)).save()
};

export const updateDriver = async (driverId: string, driver: Partial<Driver>) => {
  return await driverModel.findOneAndUpdate({_id:driverId}, driver as IDriver, {returnOriginal: false})
};

export const deleteDriver = async (id: string) => {
  return await driverModel.deleteOne({_id:id})
};
