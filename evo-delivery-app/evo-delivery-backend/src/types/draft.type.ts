import { DistanceMatrix } from "./distance-matrix.type";
import { EaEvaluateConfig } from "./ea-engine.type";

export type DraftData = {
    depot : string;
    orders: string[];
    drivers: string[];
    distances? : DistanceMatrix;
}

export type Draft = {
    _id: string;
    data: DraftData,
    config : EaEvaluateConfig;
    createdAt: string;
    updatedAt: string;
};