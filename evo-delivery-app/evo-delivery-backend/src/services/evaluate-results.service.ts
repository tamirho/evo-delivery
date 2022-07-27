import {EvaluateResult} from "../types";
import EvaluateResultModel from "../database/models/evaluate-results.model";
import driverModel from "../database/models/driver.model";


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
    return EvaluateResultModel.getByDraftId(id);
};

export const createResult = async (evaluateResult: EvaluateResult) => {
    return EvaluateResultModel.create(evaluateResult);
};

export const deleteResult = async (id: string) => {
    return EvaluateResultModel.deleteOne({_id: id})
};
