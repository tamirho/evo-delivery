import {Depot, Location} from "../types";
import DepotModel from '../database/models/depot.model';
import {googleMatrixClient} from "../clients";

export const getAll = async (): Promise<Depot[]> => {
    return DepotModel.getAll();
};

export const getById = async (id: string): Promise<Depot> => {
    return DepotModel.getById(id);
}

export const getByIds = async (ids: string[]): Promise<Depot[]> => {
    return DepotModel.getByIds(ids);
}

export const create = async (depot: Partial<Depot>) => {
    const fullLocation: Location = await googleMatrixClient.getFullLocation(depot);

    return DepotModel.create({...depot, ...fullLocation});
};

export const update = async (depotId: string, depot: Partial<Depot>) => {
    return DepotModel.findOneAndUpdate({_id: depotId}, depot as Depot, {returnOriginal: false})
};

export const deleteOne = async (depotId: string) => {
    return DepotModel.deleteOne({_id: depotId})
};
