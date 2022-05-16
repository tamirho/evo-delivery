import {EaComponentTypes, EaEvaluateConfig} from "../types";
import {driverService, orderService, rootService} from '../services';
import {googleMatrixClient, eaHttpClientAdapter} from "../clients";

export const evaluate = async (driversIds: string[], ordersIds: string[], depotId: string, config: EaEvaluateConfig) => {
    const driversPromise = driverService.getByIds(driversIds);
    const ordersPromise = orderService.getByIds(ordersIds);
    const depotPromise = rootService.getById(depotId);
    const [drivers, orders, depot] = await Promise.all([driversPromise, ordersPromise, depotPromise])

    const ordersAndRoot = [...orders, depot];

    const distanceMatrix = await googleMatrixClient.getDistance(
        ordersAndRoot,
        ordersAndRoot
    );

    return eaHttpClientAdapter.evaluate(drivers, orders, depot, distanceMatrix, config);
};

export const getTypes = async (componentType: EaComponentTypes) => {
    return eaHttpClientAdapter.getComponentTypes(componentType);
}