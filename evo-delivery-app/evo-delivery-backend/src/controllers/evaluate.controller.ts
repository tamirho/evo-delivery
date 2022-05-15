import {Request, Response} from "express";
import {evaluateService} from "../services";
import {INVALID, OK} from "../utils";
import {EaConfigParams, EaEvaluateData} from "../types";

export const evaluate = async (req: Request, res: Response) => {
    const {drivers, orders, rootId, configParamsArgs}: EaEvaluateData = req.body
    const configParams: EaConfigParams = req.query

    try {
        const routes = await evaluateService.evaluate(drivers, orders, rootId, configParams, configParamsArgs);
        return res.status(200).json(OK(routes));
    } catch (e: any) {
        return res.status(400).json(INVALID(400, e.message));
    }
};