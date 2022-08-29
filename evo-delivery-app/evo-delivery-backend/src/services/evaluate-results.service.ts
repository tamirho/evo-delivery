import { EvaluateResult } from "../types";
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
  const res = await EvaluateResultModel.getById(id);
  const draft = await draftService.getDraftById(res.draftId!);

  const driversP = driverService.getByIds(draft.data.drivers);
  const ordersP = orderService.getOrderByIds(draft.data.orders);
  const depotP = depotService.getDepotById(draft.data.depot);

  const [drivers, orders, depot] = await Promise.all([
    driversP,
    ordersP,
    depotP,
  ]);
  
  const evalResult = await prepareEvaluateResult(
      draft,
      drivers,
      orders,
      depot,
      res.eaResult!
      );
      
  if (evalResult.isDone) {
    evaluateResultsService.createResult(evalResult);
  }
  return {...evalResult,isDone: res.isDone};
};

export const getByIds = async (ids: string[]) => {
  return EvaluateResultModel.getByIds(ids);
};

export const getByDraftId = async (id: string) => {
  console.log(id);
  return EvaluateResultModel.getByDraftId(id);
};

export const createResult = async (evaluateResult: EvaluateResult) => {
  return EvaluateResultModel.create(evaluateResult);
};

export const deleteResult = async (id: string) => {
  return EvaluateResultModel.deleteOne({ _id: id });
};

export const terminateResult = async (id: string) => {
  return eaHttpClientAdapter.terminate(id);
};
