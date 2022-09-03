import { DriverRoute, EaEvaluateResponse, EvaluateResult } from "../types";
import EvaluateResultModel from "../database/models/evaluate-results.model";
import { eaHttpClientAdapter } from "../clients";
import {
  depotService,
  draftService,
  driverService,
  evaluateResultsService,
  orderService,
} from ".";
import { prepareEvaluateResult } from "./draft.service";

export const getResults = async () => {
  return EvaluateResultModel.getAll();
};

export const getById = async (id: string) => {
  const evaluateResult = await EvaluateResultModel.getById(id);
  const draft = await draftService.getDraftById(evaluateResult.draftId!);

  const driversP = driverService.getByIds(draft.data.drivers);
  const ordersP = orderService.getOrderByIds(draft.data.orders);
  const depotP = depotService.getDepotById(draft.data.depot);

  const [drivers, orders, depot] = await Promise.all([
    driversP,
    ordersP,
    depotP,
  ]);

  const enrichedResult = await prepareEvaluateResult(
    draft,
    drivers,
    orders,
    depot,
    evaluateResult.eaResult!
  );

  if (evaluateResult.isDone) {
    evaluateResultsService.updateResultRoutes(
      id,
      enrichedResult.routes,
      evaluateResult.eaResult!
    );
  }
  return { ...enrichedResult, isDone: evaluateResult.isDone };
};

export const getByIds = async (ids: string[]) => {
  return EvaluateResultModel.getByIds(ids);
};

export const getByDraftId = async (id: string) => {
  return EvaluateResultModel.getByDraftId(id);
};

export const createResult = async (evaluateResult: EvaluateResult) => {
  return EvaluateResultModel.create(evaluateResult);
};

export const updateResultRoutes = async (
  id: string,
  routes: DriverRoute[] | undefined,
  eaResult: EaEvaluateResponse | undefined
) => {
  return EvaluateResultModel.updateOne(
    { _id: id},
    { routes: routes, eaResult: eaResult }
  );
};

export const deleteResult = async (id: string) => {
  return EvaluateResultModel.deleteOne({ _id: id });
};

export const terminateResult = async (id: string) => {
  return eaHttpClientAdapter.terminate(id);
};
