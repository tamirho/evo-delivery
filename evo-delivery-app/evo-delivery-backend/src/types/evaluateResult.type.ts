import { Order } from "./order.type";
import { Depot } from "./depot.type";
import { Driver } from "./driver.type";

export type DriverRoute = {
  driver: Driver;
  orders: Order[];
  totalDuration: number;
  totalDistance: number;
  load: number;
  polyLines?: string[];
};

export type EvaluateResult = {
  _id?: string;
  draftId?: string;
  isDone?: boolean;
  eaResult?: number[];
  depot?: Depot;
  routes?: DriverRoute[];
  createdAt?: string;
  updatedAt?: string;
};

export type EaResult = {
  _id?: string;
  result: {
    type:Map<string,number[]>
  }
  createdAt?: string;
  updatedAt?: string;
};

