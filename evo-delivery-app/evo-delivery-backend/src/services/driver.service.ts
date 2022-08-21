import {Driver} from '../types';
import driverModel from '../database/models/driver.model';

export const getDrivers = async () => {
    return driverModel.getAll();
};

export const getDriver = async (driverId: string): Promise<Driver> => {
    return driverModel.getById(driverId);
};

export const getByIds = async (driverIds: string[]) => {
    return driverModel.getByIds(driverIds);
}

export const createDriver = async (driver: Partial<Driver>) => {
    return driverModel.create(driver)
};

export const updateDriver = async (driverId: string, driver: Partial<Driver>) => {
    return driverModel.findOneAndUpdate({_id: driverId}, driver, {returnOriginal: false})
};

export const deleteDriver = async (id: string) => {
    return driverModel.deleteOne({_id: id})
};
