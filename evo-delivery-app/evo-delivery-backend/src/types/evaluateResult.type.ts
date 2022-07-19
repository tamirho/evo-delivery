import {Order} from "./order.type";
import {Depot} from "./depot.type";

export type DriverRoute = {
    driverName : string;
    route: Partial<Order>[];
    totalDuration: number;
    totalDistance : number;
    load : number;
}

export type EvaluateResult = {
    _id: string;
    draftId: string;
    depot: Partial<Depot>
    routes : DriverRoute[];
}