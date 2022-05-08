import { Order } from "../types";
import { DistanceMatrix } from "../types/distance-matrix.type";

export interface GoogleMatrixClient {
    getDistance: (originArr: Order[], destinationArr: Order[]) => Promise<DistanceMatrix>
}