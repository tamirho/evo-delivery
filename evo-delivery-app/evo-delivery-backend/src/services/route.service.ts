import {DistanceMatrix, Driver, EaEvaluateConfig, EaEvaluateResponse, Order} from "../types";
import {driverService, draftService, orderService, depotService} from '../services';
import {googleMatrixClient, eaHttpClientAdapter} from "../clients";


export const store = async (draftId: string, routes: EaEvaluateResponse) => {
  return routes;
};

export const get = async () => {
  return {};
};
