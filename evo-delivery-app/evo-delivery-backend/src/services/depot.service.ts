import {DEPOTS} from "../models/tmp-data";
import {Depot} from "../types";

export const getById = async (depotId) : Promise<Depot> => {
    return DEPOTS.find(({id}) => id === depotId) as Depot
};