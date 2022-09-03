import {driverService, evaluateResultsService} from '../services';
import {Driver, EvaluateResult} from "../types";
import {Request, Response} from "express";
import {INVALID, OK} from "../utils";


export const createEvaluateResult = async (req: Request, res: Response) => {
    const evaluateResult: EvaluateResult = req.body;
    try {
        const response = await evaluateResultsService.createResult(evaluateResult);
        return res.status(200).json(OK(response));
    } catch (e: any) {
        return res.status(400).json(INVALID(400, e.message));
    }
};

export const getResults = async (req: Request, res: Response) => {
    try {
        const response = await evaluateResultsService.getResults();
        return res.status(200).json(OK(response));
    } catch (e: any) {
        return res.status(400).json(INVALID(400, e.message));
    }
};

export const getById = async (req: Request, res: Response) => {
    const id: string = req.params.id;

    try {
        const response = await evaluateResultsService.getById(id);
        return res.status(200).json(OK(response));
    } catch (e: any) {
        return res.status(400).json(INVALID(400, e.message));
    }
};


export const getByDraftId = async (req: Request, res: Response) => {
    const id: string = req.params.id;

    try {
        const response = await evaluateResultsService.getByDraftId(id);
        return res.status(200).json(OK(response));
    } catch (e: any) {
        return res.status(400).json(INVALID(400, e.message));
    }
};

export const deleteById = async (req: Request, res: Response) => {
    const id: string = req.params.id;

    try {
        const response = await evaluateResultsService.deleteResult(id);
        return res.status(200).json(OK({}));
    } catch (e: any) {
        return res.status(400).json(INVALID(400, e.message));
    }
};

export const terminateById = async (req: Request, res: Response) => {
  const id: string = req.params.id;

  try {
    const response = await evaluateResultsService.terminateResult(id);
    return res.status(200).json(OK({}));
  } catch (e: any) {
    return res.status(400).json(INVALID(400, e.message));
  }
};
