import DraftModel from '../database/models/draft.model';
import {Draft, DraftData} from '../types/draft.type';
import {depotService, orderService, driverService, draftService} from "./index";
import {eaHttpClientAdapter, googleMatrixClient} from "../clients";
import {DistanceMatrix} from "../types";
import {store} from "./route.service";

export const getAll = async () => {
    return DraftModel.getAll();
};

export const getById = async (draftId: string): Promise<Draft> => {
    return DraftModel.getById(draftId);
};

export const getByIds = async (draftIds: string[]) => {
    return DraftModel.getByIds(draftIds);
};

/**
 * This function creates a draft with the ids of the orders, drivers and depots, along with the distance matrix
 * @param partialDraft The ids of the orders, drivers and depots
 */
export const create = async (partialDraft: Partial<Draft>) => {
    const draftData = partialDraft.data as DraftData;

    const driversPromise = driverService.getByIds(draftData.drivers);  // validating drivers exist
    const ordersPromise = orderService.getByIds(draftData.orders);
    const depotPromise = depotService.getById(draftData.depot);
    const [orders, depot, drivers] = await Promise.all([ordersPromise, depotPromise, driversPromise]);

    const ordersAndRoot = [...orders, depot];
    const distanceMatrix = await googleMatrixClient.getDistance(
        ordersAndRoot,
        ordersAndRoot
    );

    const data = {...draftData, distances: distanceMatrix} as DraftData;
    const draft = {...partialDraft, data: data} as Draft;

    return DraftModel.create(draft);
};

export const evaluate = async (draftId: string) => {
    const draft = await draftService.getById(draftId);

    const driversP =  driverService.getByIds(draft.data.drivers);
    const ordersP =  orderService.getByIds(draft.data.orders);
    const depotP =  depotService.getById(draft.data.depot)

    const [drivers, orders, depot] = await Promise.all([driversP, ordersP, depotP]);
    const routes = await eaHttpClientAdapter.evaluate(drivers, orders, depot, draft.data.distances as DistanceMatrix, draft.config);

    return store(draftId, routes);
};

export const update = async (draftId: string, draft: Partial<Draft>) => {
    return DraftModel.findOneAndUpdate({_id: draftId}, draft, {returnOriginal: false})
};

export const deleteOne = async (id: string) => {
    return DraftModel.deleteOne({_id: id})
};