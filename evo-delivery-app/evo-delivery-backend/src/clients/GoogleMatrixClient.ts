import { IdWithAddress } from "../types";
import { DistanceMatrix } from "../types/distance-matrix.type";

export interface GoogleMatrixClient {
    getDistance: (originArr: IdWithAddress[], destinationArr: IdWithAddress[]) => Promise<DistanceMatrix>
}