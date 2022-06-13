import { Depot } from "./depot.type"
import { DistanceMatrix } from "./distance-matrix.type";
import { EaEvaluateConfig } from "./ea-engine.type";


export type Draft = {
    _id?: string;
    depot : Depot;
    eaConfig : EaEvaluateConfig;
    distances : DistanceMatrix;
    createdAt: Date;
    updatedAt: Date;
};