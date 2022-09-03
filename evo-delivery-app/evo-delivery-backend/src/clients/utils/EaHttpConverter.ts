import {
  Driver,
  EaHttpRequestDriver,
  Order,
  EaHttpRequestOrder,
  DistanceMatrix,
  EaHttpRequestDistances,
  EaEvaluateConfig,
  Depot,
  EaEvaluateHttpRequestBody,
} from "../../types";
import { convertObjCamelToSnakeCase } from "../../utils";

export interface EaHttpConverter {
  toEaHttpRequestBody(
    drivers,
    orders,
    depot,
    distanceMatrix,
    config,
    runId?
  ): EaEvaluateHttpRequestBody;

  convertDepot(depot: Depot): string;

  convertDriver(driver: Driver): EaHttpRequestDriver;

  convertOrder(order: Order): EaHttpRequestOrder;

  convertDistances(distanceMatrix: DistanceMatrix): EaHttpRequestDistances;

  convertConfig(config: EaEvaluateConfig);
}

export class EaHttpConverterImpl implements EaHttpConverter {
  toEaHttpRequestBody(
    _drivers,
    _orders,
    _depot,
    _distanceMatrix,
    _config,
    _runId?
  ): EaEvaluateHttpRequestBody {
    const drivers: EaHttpRequestDriver[] = _drivers.map(this.convertDriver);
    const orders: EaHttpRequestOrder[] = _orders.map(this.convertOrder);
    const distances: EaHttpRequestDistances =
      this.convertDistances(_distanceMatrix);
    const depotId = this.convertDepot(_depot);
    const config = this.convertConfig(_config);

    return {
      runId: _runId,
      data: { drivers, orders, distances, root_id: depotId },
      config,
    } as EaEvaluateHttpRequestBody;
  }

  convertDepot(depot: Depot): string {
    return depot._id;
  }

  convertDriver({ _id, maxCapacity, maxDistance }: Driver) {
    const afterCovert = convertObjCamelToSnakeCase({
      maxCapacity,
      maxDistance,
    });
    return { ...afterCovert, id: _id } as EaHttpRequestDriver;
  }

  convertOrder({ _id, weight }: Order) {
    const afterCovert = convertObjCamelToSnakeCase({
      weight,
    });
    return { ...afterCovert, id: _id } as EaHttpRequestOrder;
  }

  convertDistances(distanceMatrix: DistanceMatrix) {
    return Object.entries(distanceMatrix).reduce(
      (distancesAccumulator, [from, rowData]) => {
        distancesAccumulator[from] = Object.entries(rowData).reduce(
          (rowDataAccumulator, [to, colData]) => {
            rowDataAccumulator[to] = colData.distance.value;
            return rowDataAccumulator;
          },
          {}
        );
        return distancesAccumulator;
      },
      {}
    ) as EaHttpRequestDistances;
  }

  convertConfig(config: EaEvaluateConfig) {
    return convertObjCamelToSnakeCase(config);
  }
}
