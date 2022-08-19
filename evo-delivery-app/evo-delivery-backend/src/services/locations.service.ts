import {Location} from "../types";
import {googleMatrixClient} from "../clients";

export const getFullLocation = (location: Partial<Location>) => {
    return googleMatrixClient.getFullLocation(location);
}

export const getPolylineRoute = (origin: Partial<Location>, dest: Partial<Location>) => {
    return googleMatrixClient.getPolylineRoute(origin, dest);
}