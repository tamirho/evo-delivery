import { Depot } from './depot.type';
import { DistanceMatrix } from './distance-matrix.type';
import { Driver } from './driver.type';
import { EaEvaluateConfig } from './ea-engine.type';
import { Order } from './order.type';

export type DraftData = {
  depot: string;
  orders: string[];
  drivers: string[];
  distances?: DistanceMatrix;
};

export type EnrichedDraftData = {
  depot: Depot;
  orders: Order[];
  drivers: Driver[];
  distances?: DistanceMatrix;
};

export type Draft = {
  _id: string;
  data: DraftData;
  config: EaEvaluateConfig;
  createdAt: string;
  updatedAt: string;
};

export type EnrichedDraft = {
  _id: string;
  data: EnrichedDraftData;
  config: EaEvaluateConfig;
  createdAt: string;
  updatedAt: string;
};
