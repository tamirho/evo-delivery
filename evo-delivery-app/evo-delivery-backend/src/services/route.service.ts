import {DistanceMatrix, Driver, EaEvaluateConfig, EaEvaluateResponse, Order} from "../types";
import {driverService, draftService, orderService, depotService} from '../services';
import {googleMatrixClient, eaHttpClientAdapter} from "../clients";

export const evaluate = async (draftId: string) => {
  const draft = await draftService.getById(draftId);

  const driversP =  driverService.getByIds(draft.data.drivers);
  const ordersP =  orderService.getByIds(draft.data.orders);
  const depotP =  depotService.getById(draft.data.depot)

  const [drivers, orders, depot] = await Promise.all([driversP, ordersP, depotP]);
  const routes = await eaHttpClientAdapter.evaluate(drivers, orders, depot, draft.data.distances as DistanceMatrix, draft.config);

  return await store(routes);
};

export const store = async (routes: EaEvaluateResponse) => {
  return routes;
};

export const get = async () => {
  return {};
};
