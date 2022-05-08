import { DistanceMatrix, EaComponentDetails, EaComponentTypes } from '../types';


export type EaEvaluateResponse = {

};

export interface EaClient {
    evaluate: (distanceMatrix: DistanceMatrix) => Promise<EaEvaluateResponse>
    getComponentTypes: (componentType: EaComponentTypes) => Promise<EaComponentDetails[]>
}
