import {Order} from "./order.type";
import {Depot} from "./depot.type";
import {Driver} from "./driver.type";

export type DriverRoute = {
    driver: Partial<Driver>
    orders: Partial<Order>[];
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