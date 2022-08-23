import DraftModel from "../database/models/draft.model";
import { Draft, DraftData } from "../types/draft.type";
import {
  depotService,
  orderService,
  driverService,
  draftService,
} from "./index";
import { eaHttpClientAdapter, googleMatrixClient } from "../clients";
import {
  Depot,
  DistanceMatrix,
  Driver,
  DriverRoute,
  EaEvaluateResponse,
  EvaluateResult,
  Order,
} from "../types";
import { evaluateResultsService } from "../services";
import { getPolylineRoute } from "./locations.service";

export const getDrafts = async () => {
  return DraftModel.getAll();
};

export const getDraftById = async (draftId: string): Promise<Draft> => {
  return DraftModel.getById(draftId);
};

export const getDraftByIds = async (draftIds: string[]) => {
  return DraftModel.getByIds(draftIds);
};

export const createDraft = async (partialDraft: Partial<Draft>) => {
  const draftData = partialDraft.data as DraftData;

  const driversP = driverService.getByIds(draftData.drivers); // validating drivers exist
  const ordersP = orderService.getOrderByIds(draftData.orders);
  const depotP = depotService.getDepotById(draftData.depot);
  const [orders, depot, _] = await Promise.all([ordersP, depotP, driversP]);

  const ordersAndRoot = [...orders, depot];
  const distanceMatrix = await googleMatrixClient.getDistance(
    ordersAndRoot,
    ordersAndRoot
  );

  const data = { ...draftData, distances: distanceMatrix } as DraftData;
  const draft = { ...partialDraft, data: data } as Draft;

  return DraftModel.create(draft);
};

export const evaluateDraft = async (draftId: string) => {
  const draft = await draftService.getDraftById(draftId);

  const driversP = driverService.getByIds(draft.data.drivers);
  const ordersP = orderService.getOrderByIds(draft.data.orders);
  const depotP = depotService.getDepotById(draft.data.depot);

  const [drivers, orders, depot] = await Promise.all([
    driversP,
    ordersP,
    depotP,
  ]);

  const evalResult = await evaluateResultsService.createResult({
    draftId: draftId,
    depot: depot,
  } as EvaluateResult);

  const eaResponse = await eaHttpClientAdapter.evaluate(
    drivers,
    orders,
    depot,
    draftId,
    evalResult._id,
    draft.data.distances as DistanceMatrix,
    draft.config
  );

  return eaResponse;
};

export const updateDraft = async (draftId: string, draft: Partial<Draft>) => {
  return DraftModel.findOneAndUpdate({ _id: draftId }, draft, {
    returnOriginal: false,
  });
};

export const deleteDraft = async (id: string) => {
  return DraftModel.deleteOne({ _id: id });
};

const prepareEvaluateResult = async (
  draft: Draft,
  drivers: Driver[],
  orders: Order[],
  depot: Depot,
  routes: EaEvaluateResponse
) => {
  const distances = draft.data.distances!;
  const driversMap = new Map<string, Driver>();
  const ordersMap = new Map<string, Order>();
  drivers.forEach((driver) => (driversMap[driver._id] = driver));
  orders.forEach((order) => (ordersMap[order._id] = order));

  const enrichedRoutes = (await Promise.all(
    Object.entries(routes).map(async ([driverId, ordersIds]) => {
      const driver: Driver = driversMap[driverId];
      const routeOrders: Order[] = ordersIds.map(
        (orderId) => ordersMap[orderId]
      );
      return enrichDriverRoute(depot, driver, routeOrders, distances);
    })
  )) as DriverRoute[];

  return {
    draftId: draft._id,
    routes: enrichedRoutes,
    depot: depot,
  } as EvaluateResult;
};

const enrichDriverRoute = async (
  depot: Depot,
  driver: Driver,
  orders: Order[],
  distances: DistanceMatrix
): Promise<DriverRoute> => {
  let weight: number = 0;
  let distance: number = 0;
  let duration: number = 0;

  orders.forEach((order, index) => {
    weight = weight + order.weight;
    if (index == 0) {
      distance += distances[depot._id][order._id].distance.value;
      duration += distances[depot._id][order._id].duration.value;
    } else {
      distance += distances[orders[index - 1]._id][order._id].distance.value;
      duration += distances[orders[index - 1]._id][order._id].duration.value;
    }
  });

  const locations = [depot, ...orders, depot];
  const polyLines = await Promise.all(
    locations.map((order, index) => {
      if (index > 0) {
        return getPolylineRoute(locations[index - 1], order);
      }
      return "";
    })
  );

  const MIN = 60;
  const PERCENTAGE = 100;

  return {
    driver: driver,
    orders: orders,
    totalDistance: distance,
    totalDuration: duration / MIN,
    load: (weight / driver.maxCapacity) * PERCENTAGE,
    polyLines: polyLines,
  } as DriverRoute;
};
