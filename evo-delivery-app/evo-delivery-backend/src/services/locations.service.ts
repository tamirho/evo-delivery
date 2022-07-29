import {Location} from "../types";
import {googleMatrixClient} from "../clients";

export const getFullLocation = async (location: Partial<Location>) => {
    return googleMatrixClient.getFullLocation(location);
}