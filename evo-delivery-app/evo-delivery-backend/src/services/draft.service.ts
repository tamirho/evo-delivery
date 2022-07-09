import DraftModel from '../database/models/draft.model';
import {Draft, DraftData} from '../types/draft.type';
import {depotService, driverService, orderService} from "./index";
import {googleMatrixClient} from "../clients";

export const getAll = async () => {
    return DraftModel.getAll();
};

export const getById = async (draftId: string): Promise<Draft> => {
    return DraftModel.getById(draftId);
};

export const getByIds = async (draftIds: string[]) => {
    return DraftModel.getByIds(draftIds);
};

export const create = async (draft: Partial<Draft>) => {
    const draftData = draft.data as DraftData;

    const ordersPromise = orderService.getByIds(draftData.orders);
    const depotPromise = depotService.getById(draftData.depot);
    const [orders, depot] = await Promise.all([ordersPromise, depotPromise]);

    console.dir(orders);
    console.dir(depot);

    const ordersAndRoot = [...orders, depot];
    const distanceMatrix = await googleMatrixClient.getDistance(
        ordersAndRoot,
        ordersAndRoot
    );

    const data = {...draftData, distances: distanceMatrix} as DraftData;
    const draftWithDistances = {...draft, data: data} as Partial<Draft>;

    return draftWithDistances;
};

export const update = async (draftId: string, draft: Partial<Draft>) => {
    return DraftModel.findOneAndUpdate({_id:draftId}, draft, {returnOriginal: false})
};
  
export const deleteOne = async (id: string) => {
    return DraftModel.deleteOne({_id:id})
 };