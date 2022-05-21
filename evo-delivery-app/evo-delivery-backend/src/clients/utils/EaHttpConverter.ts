import {
    Driver,
    EaHttpRequestDriver,
    Order,
    EaHttpRequestOrder,
    DistanceMatrix,
    EaHttpRequestDistances,
    EaEvaluateConfig,
    Depot,
} from '../../types';
import {convertObjCamelToSnakeCase} from '../../utils';

export interface EaHttpConverter {
    convertDepot(depot: Depot): string;

    convertDriver(driver: Driver): EaHttpRequestDriver;

    convertOrder(order: Order): EaHttpRequestOrder;

    convertDistances(distanceMatrix: DistanceMatrix): EaHttpRequestDistances;

    convertConfig(config: EaEvaluateConfig)
}

export class EaHttpConverterImpl implements EaHttpConverter {
    convertDepot(depot: Depot): string {
        return depot.id;
    }

    convertDriver({id, maxCapacity, maxDistance}: Driver) {
        return convertObjCamelToSnakeCase({
            id,
            maxCapacity,
            maxDistance,
        }) as EaHttpRequestDriver;
    }

    convertOrder({id, weight}: Order) {
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

    convertConfig(config: EaEvaluateConfig) {
        return convertObjCamelToSnakeCase(config);
    }
}
