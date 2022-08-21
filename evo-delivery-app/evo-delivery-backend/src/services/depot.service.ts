import {Depot, Location} from "../types";
import DepotModel from '../database/models/depot.model';
import {googleMatrixClient} from "../clients";

export const getDepots = async (): Promise<Depot[]> => {
    return DepotModel.getAll();
};

export const getDepotById = async (id: string): Promise<Depot> => {
    return DepotModel.getById(id);
}

export const getDepotsByIds = async (ids: string[]): Promise<Depot[]> => {
    return DepotModel.getByIds(ids);
}

export const createDepot = async (depot: Partial<Depot>) => {
    const fullLocation: Location = await googleMatrixClient.getFullLocation(depot);

    return DepotModel.create({...depot, ...fullLocation});
};

export const updateDepot = async (depotId: string, depot: Partial<Depot>) => {
    return DepotModel.findOneAndUpdate({_id: depotId}, depot as Depot, {returnOriginal: false})
};

export const deleteDepot = async (depotId: string) => {
    return DepotModel.deleteOne({_id: depotId})
};
