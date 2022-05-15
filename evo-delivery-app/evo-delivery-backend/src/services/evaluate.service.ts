import {EaConfigParams, EaConfigParamsArgs, IdWithAddress} from "../types";
import {driverService, orderService, rootService} from '../services';
import {googleMatrixClient, eaClient} from "../clients";

export const evaluate = async (driversIds: string[], ordersIds: string[], rootId: string, args: EaConfigParams, kwargs: EaConfigParamsArgs) => {
    const drivers = await driverService.getByIds(driversIds);
    const orders = await orderService.getByIds(ordersIds);
    const rootAddress = await rootService.getById(rootId);
    const ordersAndRoot = [...orders, rootAddress];

    const distanceMatrix = await googleMatrixClient.getDistance(
        ordersAndRoot as IdWithAddress[],
        ordersAndRoot as IdWithAddress[]
    );

   return await eaClient.evaluate(drivers, orders, rootAddress, distanceMatrix, args, kwargs)
};