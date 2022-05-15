import {
  Driver,
  EaHttpRequestDriver,
  Order,
  EaHttpRequestOrder,
  DistanceMatrix,
  EaHttpRequestDistances,
  EaConfigParams,
  EaEvaluateHttpRequestArgs,
  EaConfigParamsArgs,
  EaEvaluateHttpRequestKwargs,
  IdWithAddress,
} from '../../types';
import { convertObjCamelToSnakeCase } from '../../utils';

export interface EaHttpConverter {
  convertRoot(rootAddress: IdWithAddress): string;
  convertDriver(driver: Driver): EaHttpRequestDriver;
  convertOrder(order: Order): EaHttpRequestOrder;
  convertDistances(distanceMatrix: DistanceMatrix): EaHttpRequestDistances;
  convertArgs(args: EaConfigParams): EaEvaluateHttpRequestArgs;
  convertKwargs(kwargs: EaConfigParamsArgs): EaEvaluateHttpRequestKwargs;
}

export class EaHttpConverterImpl implements EaHttpConverter {
  convertRoot(rootAddress: IdWithAddress): string {
    return rootAddress.id;
  }

  convertDriver({ id, maxCapacity, maxDistance }: Driver) {
    return convertObjCamelToSnakeCase({
      id,
      maxCapacity,
      maxDistance,
    }) as EaHttpRequestDriver;
  }

  convertOrder({ id, weight }: Order) {
    return convertObjCamelToSnakeCase({
      id,
      weight,
    }) as EaHttpRequestOrder;
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

  convertArgs(args: EaConfigParams): EaEvaluateHttpRequestArgs {
    return convertObjCamelToSnakeCase(args);
  }

  convertKwargs(kwargs: EaConfigParamsArgs): EaEvaluateHttpRequestKwargs {
    return convertObjCamelToSnakeCase(kwargs);
  }
}
