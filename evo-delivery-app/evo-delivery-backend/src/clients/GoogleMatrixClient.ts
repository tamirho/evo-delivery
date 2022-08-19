import {Location as EaLocation, Location} from "../types";
import { DistanceMatrix } from "../types/distance-matrix.type";

export interface GoogleMatrixClient {
    getDistance: (originArr: Location[], destinationArr: Location[]) => Promise<DistanceMatrix>
    getFullLocation: (location: Partial<EaLocation>) => Promise<EaLocation>
    getPolylineRoute: (origin: Partial<EaLocation>, dest: Partial<EaLocation>) => Promise<string>;
}