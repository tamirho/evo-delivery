import {evaluateResultsService} from '../services';
import {EvaluateResult} from "../types";


export const createEvaluateResult = async (evaluateResult: EvaluateResult) => {
    return evaluateResultsService.createResult(evaluateResult);
};

export const getResults = async () => {
    return evaluateResultsService.getResults();
};

export const getById = async (id: string) => {
    return evaluateResultsService.getById(id);
};

export const getByIds = async (ids: string[]) => {
    return evaluateResultsService.getByIds(ids);
};

export const getByDraftId = async (id: string) => {
    return evaluateResultsService.getByDraftId(id);
};

