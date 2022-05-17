import { Location } from "../types";
import { DistanceMatrix } from "../types/distance-matrix.type";

export interface GoogleMatrixClient {
    getDistance: (originArr: Location[], destinationArr: Location[]) => Promise<DistanceMatrix>
}