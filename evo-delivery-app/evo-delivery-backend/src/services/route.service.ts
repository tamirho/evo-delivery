import {
  Depot,
  DistanceMatrix,
  Driver,
  EaEvaluateResponse,
  Order,
} from "../types";

import { Draft } from "../types/draft.type";

export const store = async (
  draft: Draft,
  drivers: Driver[],
  orders: Order[],
  depot: Depot,
  routes: EaEvaluateResponse
) => {
  const distances = draft.data.distances!;
  const depotId = draft.data.depot;
  const driversMap = new Map<string, Driver>();
  const ordersMap = new Map<string, Order>();
  drivers.forEach((driver) => (driversMap[driver._id] = driver));
  orders.forEach((order) => (ordersMap[order._id] = order));

  const enrichedRoutes = Object.entries(routes).map(([driverId, ordersIds]) => {
    const driver: Driver = driversMap[driverId];
    const routeOrders: Order[] = ordersIds.map((orderId) => ordersMap[orderId]);
    return enrichDriverRoute(depotId, driver, routeOrders, distances);
  });

  const enrichedResponse: EnrichedEvaluateResponse = {
    draftId: draft._id,
    enrichedRoutes: enrichedRoutes,
    depot: {
      name: depot.name,
      address: depot.address,
      latitude: depot.latitude,
      longitude: depot.longitude,
    },
  };

  return enrichedResponse;
};

export const get = async () => {
  return {};
};

const enrichDriverRoute = (
  depotId: string,
  driver: Driver,
  orders: Order[],
  distances: DistanceMatrix
): DriverRoute => {
  const ordersRoute: Partial<Order>[] = [];
  var weight: number = 0;
  let distance: number = 0;
  let duration: number = 0;
  const driverName = driver.name;

  orders.forEach(async (order, index) => {
    ordersRoute.push({
      address: order.address,
      latitude: order.latitude,
      longitude: order.longitude,
    });
    weight = weight + order.weight;

    if (index == 0) {
      distance += distances[depotId][order._id].distance.value;
      duration += distances[depotId][order._id].duration.value;
    } else {
      distance += distances[orders[index - 1]._id][order._id].distance.value;
      duration += distances[orders[index - 1]._id][order._id].duration.value;
    }
  });

  const enrichDriverRoute: DriverRoute = {
    driverName: driverName,
    route: ordersRoute,
    totalDistance: distance,
    totalDuration: duration / 60,
    load: (weight / driver.maxCapacity) * 100,
  };
  return enrichDriverRoute;
};

export type DriverRoute = {
  driverName: string;
  route: Partial<Order>[];
  totalDuration: number;
  totalDistance: number;
  load: number;
};

export type EnrichedEvaluateResponse = {
  draftId: string;
  depot: Partial<Depot>;
  enrichedRoutes: DriverRoute[];
};
