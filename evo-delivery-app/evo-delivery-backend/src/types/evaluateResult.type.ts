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
  eaInfo?: EaResultInfo;
  eaError: boolean;
  depot?: Depot;
  routes?: DriverRoute[];
  createdAt?: string;
  updatedAt?: string;
};

export type EaResultInfo = {
  generation: number;
  fitness: number;
  time: number;
  createdAt?: string;
  updatedAt?: string;
};
