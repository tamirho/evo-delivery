import { Order } from "./order.type";
import { Depot } from "./depot.type";
import { Driver } from "./driver.type";
import { EaEvaluateResponse } from "./ea-engine.type";

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
  eaResult?: EaEvaluateResponse;
  depot?: Depot;
  routes?: DriverRoute[];
  createdAt?: string;
  updatedAt?: string;
};

export type EaResult = {
  _id?: string;
  EaResult: {}
  createdAt?: string;
  updatedAt?: string;
};

