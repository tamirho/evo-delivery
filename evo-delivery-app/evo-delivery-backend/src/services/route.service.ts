import {EaEvaluateConfig, EaEvaluateResponse} from "../types";
import {driverService, orderService, depotService} from '../services';
import {googleMatrixClient, eaHttpClientAdapter} from "../clients";

export const evaluate = async (driversIds: string[], ordersIds: string[], depotId: string, config: EaEvaluateConfig) => {
  const driversPromise = driverService.getByIds(driversIds);
  const ordersPromise = orderService.getByIds(ordersIds);
  const depotPromise = depotService.getById(depotId);
  const [drivers, orders, depot] = await Promise.all([driversPromise, ordersPromise, depotPromise])

  const ordersAndRoot = [...orders, depot];

  const distanceMatrix = await googleMatrixClient.getDistance(
      ordersAndRoot,
      ordersAndRoot
  );
  const routes = await eaHttpClientAdapter.evaluate(drivers, orders, depot, distanceMatrix, config);

  return await store(routes);
};

export const store = async (routes: EaEvaluateResponse) => {
  return routes;
};

export const get = async () => {
  return {};
};
