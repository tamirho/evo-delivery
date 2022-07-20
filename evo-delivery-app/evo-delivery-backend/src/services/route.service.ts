import {Depot, DistanceMatrix, Driver, EaEvaluateConfig, EaEvaluateResponse, Order} from "../types";
import {driverService, draftService, orderService, depotService} from '../services';
import {googleMatrixClient, eaHttpClientAdapter} from "../clients";
import driverModel from "../database/models/driver.model";
import orderModel from "../database/models/order.model";
import { Console } from "console";


export const store = async (draftId: string, routes: EaEvaluateResponse) => {
  const draft = await draftService.getById(draftId)
  const distances = draft.data.distances!;
  const depotId = draft.data.depot;
  const enricheRoutes: DriverRoute[] = []
  const depot = await depotService.getById(draft.data.depot);
  for (const [driverId, ordersIds] of Object.entries(routes)){
    const driversP = driverModel.getById(driverId)
    const ordersP = orderModel.getByIds(ordersIds)
    const [driver,orders] = await Promise.all([driversP, ordersP]);
    enricheRoutes.push(await enrichDriverRoute(depotId, driver, orders, distances));
  }

  const enrichedResponse: EnrichedEvaluateResponse= {draftId: draftId,
                                                    enrichedRoutes:enricheRoutes,
                                                    depot:{name:depot.name,
                                                          address: depot.address,
                                                          latitude: depot.latitude,
                                                          longitude: depot.longitude}
                                                    }

  return enrichedResponse;
};

export const get = async () => {
  return {};
};


const enrichDriverRoute = async (depotId: string, driver: Driver, ordersIds: Order[], distances: DistanceMatrix) : Promise<DriverRoute> => {
  const route: Partial<Order>[]= []
  var weight: number = 0;
  let distance: number = 0;
  let duration: number = 0;
  const driverName = driver.name;
  
  ordersIds.forEach(async (order ,index)=> {
      route.push({address: order.address, latitude: order.latitude, longitude: order.longitude})
      weight= weight + order.weight;

      if(index == 0){
        distance+= distances[depotId][order._id].distance.value
        duration+= distances[depotId][order._id].duration.value
      }else{
        distance+= distances[ordersIds[index-1]._id][order._id].distance.value
        duration+= distances[ordersIds[index-1]._id][order._id].duration.value
      }
    });
  
  const enrichDriverRoute :DriverRoute= {driverName:driverName,
                                        route:route,
                                        totalDistance:distance,
                                        totalDuration:duration,
                                        load: (weight/driver.maxCapacity)
                                        }
  return enrichDriverRoute
};

export type DriverRoute = {
  driverName : string;
  route: Partial<Order>[];
  totalDuration: number;
  totalDistance : number;
  load : number;
}

export type EnrichedEvaluateResponse = {
  draftId: string;
  depot: Partial<Depot>;
  enrichedRoutes : DriverRoute[];
}