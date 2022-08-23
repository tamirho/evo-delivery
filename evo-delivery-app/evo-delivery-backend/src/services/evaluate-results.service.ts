import {EvaluateResult} from "../types";
import EvaluateResultModel from "../database/models/evaluate-results.model";
import { eaHttpClientAdapter } from "../clients";


export const getResults = async () => {
    return EvaluateResultModel.getAll();
};

export const getById = async (id: string) => {
    return EvaluateResultModel.getById(id);
};

export const getByIds = async (ids: string[]) => {
    return EvaluateResultModel.getByIds(ids);
};

export const getByDraftId = async (id: string) => {
    console.log(id);
    return EvaluateResultModel.getByDraftId(id);
};

export const createResult = async (evaluateResult: EvaluateResult) => {
    console.log(evaluateResult)
    return EvaluateResultModel.create(evaluateResult);
};

export const deleteResult = async (id: string) => {
    return EvaluateResultModel.deleteOne({_id: id})
};

export const terminateResult = async (id: string) => {
  return eaHttpClientAdapter.terminate(id)
};