import { Depot } from "./depot.type"
import { DistanceMatrix } from "./distance-matrix.type";
import { EaEvaluateConfig } from "./ea-engine.type";


export type Draft = {
    _id?: string;
    depot : string;
    orders: string[];
    drivers: string[];
    eaConfig : EaEvaluateConfig;
    distances : DistanceMatrix;
    createdAt: Date;
    updatedAt: Date;
};